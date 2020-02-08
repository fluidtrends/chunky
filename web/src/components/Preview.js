import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import { isAnyPartOfElementInViewport } from '../utils/isElementVisible'
import AnimatedSection from './AnimatedSection'
import { Button, Icon } from 'antd'


export default class Preview extends Component {

  constructor (props) {
    super(props)
		this.state = { ...this.state, startAnimation: false }
    this.handleScrollToElement = this.handleScrollToElement.bind(this)	
  }

  componentDidMount () {
		super.componentDidMount()
    window.addEventListener('scroll', this.handleScrollToElement, true);		
	}
	
// 	componentWillUnmount() {
//     window.removeEventListener('scroll', this.handleScrollToElement, true);
//   }

  handleScrollToElement() {
    if (isAnyPartOfElementInViewport(this.previewRef) && !this.state.startAnimation) {
      this.setState({startAnimation: true})
      window.removeEventListener('scroll', this.handleScrollToElement, true)
    }
  }

	renderText () {
    return renderResponsive('text',
      <Text source={this.props.text} style={{
        width: `90vw`,
        padding: '10px',
        paddingBottom: '60px'
      }} />,
      <Text source={this.props.text} style={{
        width: `70vw`,
        paddingBottom: '60px'
      }} />)
	}

	renderImage() {
		return renderResponsive('image',
		<img src={`/assets/${this.props.image}`} style={{
			width: '80vw',
			opacity: 0.8, 
			zIndex: 0,
			boxShadow:' 0 5px 20px 0 rgba(0,0,0,.15)'
		}} />,
		<img src={`/assets/${this.props.image}`} style={{
			width: '700px',
			opacity: 0.8, 
			zIndex: 0,
			boxShadow:' 0 5px 20px 0 rgba(0,0,0,.15)'
		}}/>)
	}
	
	renderImgPreview () {
    const fontSize = this.props.isSmallScreen? 40 : 70

		return <AnimatedSection animationType={'opacity'} startAnimation={this.state.startAnimation} config={{ tension: 20, friction: 60 }}>
			<div 
				style={{width: '90vw', display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
			>
				{ this.renderImage() }			
				<Button type="primary" className='icon' theme="filled" size="large" style={{fontSize, position: 'absolute', background: 'transparent', color: '#00BCD4', border: 0, cursor: 'initial'}}>
				Coming Soon
				<Icon type="laptop" theme="outlined" spin={true} />
				</Button>
			</div>
		</AnimatedSection>
	}

  renderComponent () {
		return (<div 
			style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }} 
			ref={ref => this.previewRef = ref}
			>
      { this.renderText() }	
			{ this.renderImgPreview() }		
    </div>)
  }
}
