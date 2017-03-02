import React, {
    View,
    Text,
    StyleSheet
} from 'react-native'
import savor from 'savor'

import AppContainer from '../../src/core/AppContainer'

savor.add("should not mount an empty AppContainer", (context, done) => {
    context.expect(() => {
      const wrapper = context.shallow(<AppContainer/>)
    }).to.throw(Error)
    done()
}).

add("should mount an AppContainer with a single child", (context, done) => {
    const App = () => (<Text>test</Text>)
    const wrapper = context.shallow(<AppContainer><App/></AppContainer>)
    context.expect(wrapper.length).to.equal(1)
    context.expect(wrapper).to.contain(<App/>)
    done()
}).

run("Chunky Renderer")
