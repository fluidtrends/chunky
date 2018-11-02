import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import Media from './Media'
import { renderResponsive } from '../utils/responsive'
import { Typography } from '@rmwc/typography'
import { Carousel } from 'antd'
import { CircularProgress } from '@rmwc/circular-progress'


export default class ChunkyCarousel extends Component {
  constructor (props) {
    super(props)
		this.state = { ...this.state, testimonialsData: null}
  }

  componentDidMount () {
		super.componentDidMount()		
		fetch(this.props.data)
		.then(response => response.json())
		.then(testimonialsData => {
			this.setState({ testimonialsData })
		})
		.catch(() => '')
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
		const { testimonialsData } = this.state
		return <Carousel effect="fade" autoplay>
			{ testimonialsData && testimonialsData.map(item => this.renderCarouselItem(item)) }
  	</Carousel>
	}

	renderCarouselItem(item) {
		const style = {
      alignSelf: 'center',
      marginTop: '20px',
      objectFit: 'cover',
      height: 150,
      width: 150,
      borderRadius: '50%',
      objectPosition: 'center center'
    }
		return <div>
				<div style={{
						display: 'flex',
						flex: 2, 
						justifyContent: 'space-evenly', 
						alignItems: 'center', 
						padding: 20,
						flexDirection: 'row',
						height: '280px'
					}}
				>
					<div style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
						<Media cache={this.props.cache} roundImg image={item.imageUrl} style={style} />
					</div>
					<div style={{display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
						<Typography use='subtitle1' tag='h2' style={{
							color: this.props.textColor,
						}}>
							"{item.text}"
						</Typography>
						<Typography use='subtitle1' tag='h3' style={{
							color: this.props.personNameColor,
							fontWeight: 'bold'
						}}>
							{item.person}
						</Typography>
						<Typography use='subtitle1' tag='h4' style={{
							color: this.props.descriptionColor
						}}>
							{item.description}
						</Typography>
					</div>
				</div>
			</div>
	}

  renderComponent () {
		if (!this.state.testimonialsData) {
			return <div>
				<CircularProgress size="large" />
			</div>
		}

		return (<div 
			style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', margin: '100px 15px' }} 
			>
			{ this.renderText() }
			{ this.renderSlider() }
    </div>)
  }
}
