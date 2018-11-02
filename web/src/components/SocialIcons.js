import React, { PureComponent } from 'react'
import { Icon } from "antd"

export default class SocialIcons extends PureComponent {
	constructor (props) {
    super(props)
  }

	goto (url) {
    window.open(this.props.socialMediaLinks[url], '_blank')
  }
	
	render() {
		const socialNetworks = [
      'twitter',
      'youtube',
      'github',
      'linkedin',
      'facebook',
      'medium',
      'instagram'
		]
		
		const align = this.props.isSmallScreen ? 'center' : 'center'
    const overflow = this.props.isSmallScreen ? 'auto' : 'unset'
    const fontSize = this.props.isSmallScreen? 20: 36
		const padding = this.props.isSmallScreen? 6: 10
		
		return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: align, overflow }}>
      {socialNetworks.map(key => {
        return <div>
          <Icon
            key={key}
            theme='twoTone'
            type={key}
            twoToneColor='#00bcd4'
            className='icon'
            onClick={this.goto.bind(this, key)}
            style={{
              cursor: 'pointer',
              fontSize,
              padding
            }} />
          <style jsx>{`
              div :global(.icon) {
                color: ${this.props.iconColor}
              }
              div :global(.icon):hover {  
                color: ${this.props.iconColorHover}
              }
            `}</style>
        </div>
      })}
    </ div> 
	}
}
