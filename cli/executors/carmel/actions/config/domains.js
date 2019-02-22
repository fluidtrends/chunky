const coreutils = require('coreutils')
const operation = require('../../operation')
const input = require('../../input')
const inquirer = require('inquirer')
const utils = require('../../utils')
const opn = require('opn')
const chalk = require('chalk')
const awsome = require('awsome')
const validator = require('validator')
const path = require('path')
const moment = require('moment')

const CHOICES = ['list', 'buy']

function list({ cache }) {
  coreutils.logger.info(`Looking for all your domains ...`)
  return awsome.aws.route53Domains('listDomains').then((data) => {
    if (!data || !data.Domains || data.Domains.length === 0) {
      coreutils.logger.skip(`Looks like you don't have any domains yet`)
      return
    }
    data.Domains.map(d => {
      coreutils.logger.info(`Found ${chalk.green.bold(d.DomainName)}`)
      coreutils.logger.ok(`Valid until ${chalk.green.bold(moment(d.Expiry).format('MMM DD, YYYY'))}`)
    })
  })
}

function createContactInfo() {
  // const ExtraParams: [
  //     {
  //       Name: DUNS_NUMBER | BRAND_NUMBER | BIRTH_DEPARTMENT | BIRTH_DATE_IN_YYYY_MM_DD | BIRTH_COUNTRY | BIRTH_CITY | DOCUMENT_NUMBER | AU_ID_NUMBER | AU_ID_TYPE | CA_LEGAL_TYPE | CA_BUSINESS_ENTITY_TYPE | ES_IDENTIFICATION | ES_IDENTIFICATION_TYPE | ES_LEGAL_FORM | FI_BUSINESS_NUMBER | FI_ID_NUMBER | FI_NATIONALITY | FI_ORGANIZATION_TYPE | IT_PIN | IT_REGISTRANT_ENTITY_TYPE | RU_PASSPORT_DATA | SE_ID_NUMBER | SG_ID_NUMBER | VAT_NUMBER | UK_CONTACT_TYPE | UK_COMPANY_NUMBER, /* required */
  //       Value: 'STRING_VALUE' /* required */
  //     }
  //   ]
  return {
    AddressLine1: 'Cluj-Napoca',
    City: 'Cluj-Napoca',
    ContactType: 'RESELLER',
    CountryCode: 'RO',
    Email: 'team@carmel.io',
    FirstName: 'Carmel',
    PhoneNumber: '+1.4165749761',
    LastName: 'Platform',
    OrganizationName: 'Carmel Platform',
    ZipCode: '400000'
  }
}

function getDomain() {
  return inquirer.prompt([{
    type: 'input',
    name: 'domain',
    validate: (s) => validator.isURL(s) ? true : "C'mon, enter a valid domain please :)",
    message: "Enter a domain name: "
  }])
  .then(({ domain }) => new awsome.Domain({ name: domain }))
}

function buy({ account }) {
  return getDomain().then((domain) => {
    coreutils.logger.info(`Checking domain ${chalk.green.bold(domain.name)} ...`)
    return domain.check().then((data) => Object.assign({ data, domain }))
  })
  .then(({ data, domain }) => {
    if (data.availability.errorCode && data.availability.errorCode === 'UnsupportedTLD') {
      coreutils.logger.skip(`Sorry this is not a supported domain: ${chalk.blue.bold(data.availability.errorMessage)}. Try another domain.`)
      return
    }

    if (!data.availability.available) {
      coreutils.logger.skip(`Sorry this domain is already taken. Try another domain.`)
      return
    }

    var info = createContactInfo()
    info = {
      AdminContact: info,
      RegistrantContact: info,
      TechContact: info,
      AutoRenew: true,
      DurationInYears: 1,
      DomainName: domain.name,
      PrivacyProtectAdminContact: true,
      PrivacyProtectRegistrantContact: true,
      PrivacyProtectTechContact: true
    }

    return awsome.aws.route53Domains('registerDomain', info).then((result) => {
      coreutils.logger.ok(`Excellent, now hang tight! The domain registration process can take up to a couple of hours or more`)
    })
  })
  .catch((e) => coreutils.logger.fail(e.message))
}

function doConfig({ account, cache, awsConfig, env, type }) {
  if (!awsConfig || !awsConfig[env]) {
    coreutils.logger.fail(`Your AWS ${env} environment is not configured yet`)
    return Promise.reject(`Please configure it first :)`)
  }

  const config = awsConfig[env]
  const dir = path.resolve(process.cwd(), '.chunky', 'web')

  process.env.AWS_ACCESS_KEY_ID = config.accessKey
  process.env.AWS_SECRET_ACCESS_KEY = config.secretKey

  if (type && CHOICES.includes(type)) {
    switch (type) {
      case 'list':
        return list({ account })
      case 'buy':
        return buy({ account })
      default:
    }
    return
  }

  return inquirer.prompt([{
    type: 'list',
    choices: CHOICES,
    default: "list",
    name: 'choice',
    message: "What do you want to do?"
  }])
  .then(({ choice }) => {
    switch (choice) {
      case 'list':
        return list({ account })
      case 'buy':
        return buy({ account })
      default:
    }
  })
}

module.exports = (account, cache, env, type) => {
  return utils.ensureVaultIsUnlocked(cache)
          .then(() => utils.ensureAwsIsConfigured(cache, env))
          .then((awsConfig) => doConfig({ account, cache, awsConfig, env, type }))
          .catch((e) => coreutils.logger.fail(e))
}
