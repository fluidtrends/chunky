import savor from 'react-savor'
import Styles from '../../../src/core/Styles'

savor

  .add('should create the default styles', (context, done) => {
    const defaultStyles = Styles()

    context.expect(defaultStyles).to.exist
    context.expect(defaultStyles).to.deep.equal(defaultAppStyling)
    // And, we're looking good
    done()
  })

  .run('[Web] Styles Rendering')


const defaultAppStyling = {
  main: {
    container: {
      backgroundColor: '#FFFFFF'
    },
    component: {
      backgroundColor: '#FFFFFF',
      padding: 0,
      margin: 0,
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      color: '#455A64'
    }
  }
}