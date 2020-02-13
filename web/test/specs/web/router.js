/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import Router from '../../../src/core/Router'

savor

  .add('should not create a router without sections', (context, done) => {
    const routes = Router.createSectionRoutes()
    context.expect(routes).to.not.exist

    // And, we're looking good
    done()
  })

  .add('should create a route with a simple element', (context, done) => {
    const routes = Router.createSectionRoutes(
      {
        stack: ['test']
      },
      () => mockSimpleRouter
    )
    context.expect(routes).to.exist

    context.expect(routes.routes[0]).to.eq(mockSimpleRouter)

    // And, we're looking good
    done()
  })

  .add('should create a route with a complex element', (context, done) => {
    const routes = Router.createSectionRoutes(
      {
        stack: [['test']]
      },
      () => mockComplexRouter
    )
    context.expect(routes).to.exist

    context.expect(routes.routes[0]).to.eq(mockComplexRouter)

    // And, we're looking good
    done()
  })

  .run('[Web] Router Rendering')

const mockSimpleRouter = {
  main: {
    title: 'Title',
    icon: 'home',
    path: '/',
    navigationLogo: true,
    extendedMenu: [
      {
        id: 'about',
        title: 'About',
        path: '/about'
      }
    ]
  }
}

const mockComplexRouter = {
  main: {
    title: 'Title',
    icon: 'home',
    path: '/',
    navigationLogo: true,
    extendedMenu: [
      {
        id: 'about',
        title: 'About',
        path: '/about'
      }
    ]
  },
  main2: {
    title: 'Title2',
    icon: 'home',
    path: '/home2',
    navigationLogo: true,
    extendedMenu: [
      {
        id: 'about2',
        title: 'About2',
        path: '/about2'
      }
    ]
  }
}
