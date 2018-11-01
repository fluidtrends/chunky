import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import Slider from 'react-slick'
import { Typography } from '@rmwc/typography'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

const data = [
	{
		itemText: 'aaa'
	},
	{
		itemText: 'aaa2'
	},
	{
		itemText: 'aaa3'
	}
]

export default class Summary extends Component {
  constructor (props) {
    super(props)
		this.state = { ...this.state}
  }

  componentDidMount () {
		super.componentDidMount()		
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

	renderSlider() {
		return <Slider
			ref={ref => this.carousel = ref}
			dots={false}
			infinite
			speed={500}
			arrows={false}
			slidesToShow={1}
			slidesToScroll={1}
			style={{
				width: '600px',
				height: '300px',
			}}>
			{ data.map(item => this.renderCarouselItem(item)) }
		</Slider>
	}

	renderCarouselItem(item) {
		return <div>
				<Typography use='subtitle1' tag='h2' style={{
					color: '#00bcd4',
					flex: 1
				}}>
					{item.itemText}
				</Typography>
			</div>
	}

  renderComponent () {
		return (<div 
			style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', margin: '100px 15px' }} 
			>
			{ this.renderText() }
			{ this.renderSlider() }
    </div>)
  }
}
