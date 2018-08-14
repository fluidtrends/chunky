(function ($) {
  'use strict'

  const electron = require('electron')
  const app = require('../../../../desktop/start.json')

  const featureDelay = app.settings.featureDelay || 8000
  const transitionDuration = app.settings.transitionDuration || 2000
  const textTransitionDuration = app.settings.textTransitionDuration || 1000

  var forceStop
  var featureIndex = 1

  const featureTimer = setInterval(() => {
    if (forceStop) {
      clearInterval(featureTimer)
      return
    }

    if (featureIndex >= app.features.length) {
      featureIndex = 0
    }
    const feature = app.features[featureIndex]

    $('.main').animate({'opacity': 0}, textTransitionDuration, function () {
      if (forceStop) {
        return
      }
      $('#title').text(feature.title).fadeIn()
      $('#subtitle').text(feature.subtitle).fadeIn()
    }).animate({'opacity': 1}, textTransitionDuration)

    featureIndex = featureIndex + 1
  }, featureDelay)

  $('#loader').fadeOut('slow', function () { $('#preloader').delay(300).fadeOut('slow') })

  $('.logo').css('background-image', `url('${app.settings.logo}')`)
  $('#progress').text(app.settings.progress)
  $('#title').text(app.features[0].title)
  $('#subtitle').text(app.features[0].subtitle)

  $('.close').hide()
  $('#action').click(function () {
    electron.ipcRenderer.send('startEvent', { close: true })
  })

  $('#slider').vegas({
    transition: 'fade',
    transitionDuration,
    delay: featureDelay,
  	slides: app.features.map(f => ({ src: f.image }))
  })

  electron.ipcRenderer.on('event', (event, e) => {
    if (e.error) {
      forceStop = true
      $('#title').text(app.error.title)
      $('#subtitle').text(app.error.subtitle)
      $('#progress').text(e.error)
      $('.close').fadeIn('slow')
      $('.error').css('background-image', `url('${app.error.image}')`).fadeIn('slow')
      $('.error').fadeIn('slow')
    }
  })
})(jQuery)
