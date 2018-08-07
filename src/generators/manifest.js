export function generateManifest ({ name }) {
  return {
    name,
    env: 'dev',
    id: 'io.chunky',
    androidSdkDir: '~/Library/Android/sdk',
    sections: {
      start: {
        stack: [ 'intro', 'posts', 'docs' ]
      }
    },
    transitions: ['replace://start'],
    provisioning: {},
    theme: {
      logoImage: 'logo.png',
      logoLightImage: 'logo.png',
      headerColor: '#FF5722',
      textColor: '#546E7A',
      linkColor: '#0288D1',
      linkHoverColor: '#64B5F6',
      linkHoverBackgroundColor: '#F5F5F5',
      progressColor: 'rgba(50,50,50,0.9)',
      primaryColor: '#0097A7',
      statusBarLight: false,
      navigationColor: '#FFFFFF',
      navigationTintColor: '#37474F',
      backgroundColor: '#999999',
      footerTintColor: '#CFD8DC',
      footerHeaderColor: '#90A4AE',
      footerColor: '#546E7A',
      footerBottomColor: '#37474F'
    },
    info: {
      copyright: '© 2018',
      watermark: 'Created with Chunky.'
    }
  }
}
