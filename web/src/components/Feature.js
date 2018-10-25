import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import AnimatedSection from './AnimatedSection'
import { renderResponsive } from '../utils/responsive'
import { Button } from '@rmwc/button'

export default class Feature extends Component {
  constructor (props) {
    super(props)
    this.state = { ...this.state, startAnimation: false }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  renderContent (compact) {
    const animationType = this.props.reversed ? 'slideFromLeft' : 'slideFromRight'

    return <AnimatedSection 
      animationType={animationType}
      startAnimation={window.innerWidth > 1224 ? this.state.startAnimation : true}
    >
      <div 
          style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: `${compact ? 100 : 0}px`
        }}>
        
          { this.text()}
          { this.button()}
      </div>
    </AnimatedSection>
  }

  text () {
    return renderResponsive('text',
      <Text source={this.props.text} style={{
        width: `90vw`,
        marginBottom: '20px',
        color: this.props.textColor
      }} />,
      <Text source={this.props.text} style={{
        width: `40vw`,
        color: this.props.textColor
      }} />)
  }

  button () {
    return <Button style={{
      marginBottom: '30px'
    }}
      onClick={this.triggerEvent()}
      raised
      theme='secondary-bg text-primary-on-secondary'>
      {this.props.actionTitle}
    </Button>
  }

  image () {
    const animationType = this.props.reversed ? 'slideFromRight' : 'slideFromLeft'

    return <AnimatedSection 
      animationType={animationType}
      startAnimation={window.innerWidth > 1224 ? this.state.startAnimation : true}
    >
      {renderResponsive('image', <img src={`/assets/${this.props.image}`} style={{
        width: '90vw',
        marginTop: '60px',
        marginBottom: '-30px'
      }} />,
      <img src={`/assets/${this.props.image}`} style={{
        width: '40vw',
        marginTop: '60px',
        marginBottom: '60px'
      }} />)}
    </AnimatedSection>
    
  }

  renderBlock (block, index) {
    return <div
      onMouseOver={() => {this.setState({startAnimation: true})}}
      key={`block${index}`}
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      { block }
    </div>
  }

  renderBlocks (blocks, compact) {
    var index = 0
    return <div style={{
      color: '#607D8B',
      position: 'relative',
      display: 'flex',
      flex: 1,
      flexDirection: (compact ? 'column' : 'row'),
      alignItems: 'center',
      backgroundColor: this.props.backgroundColor,
      justifyContent: 'center' }}>
      { blocks.map(b => this.renderBlock(b, index++)) }
    </div>
  }

  renderDefault (compact) {
    return this.renderBlocks([
      this.image(),
      this.renderContentComponent(compact)
    ], compact)
  }

  renderReversed (compact) {
    return this.renderBlocks([
      this.renderContentComponent(compact),
      this.image()
    ], compact)
  }

  renderContentComponent () {
    return (this.props.renderContent ? this.props.renderContent() : this.renderContent())
  }

  renderComponentCompact () {
    return this.renderDefault(true)
  }

  renderComponent () {
    return (this.props.reversed ? this.renderReversed() : this.renderDefault())
  }
}
