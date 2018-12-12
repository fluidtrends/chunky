import React, { PureComponent } from 'react'
import { Icon } from 'antd'

export default class SocialIcons extends PureComponent {
  constructor(props) {
    super(props)
  }

  goto(url) {
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
    const fontSize = this.props.isSmallScreen ? 20 : this.props.size || 36
    const padding = this.props.isSmallScreen ? 6 : 10

    const direction = this.props.vertical ? 'column' : 'row'
    console.log(this.props)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection:
            window.outerWidth < 840 &&
            this.props.socialMediaLinks.customItems &&
            this.props.children
              ? 'column'
              : direction,
          alignItems: 'center',
          alignSelf: align,
          overflow
        }}
      >
        {this.props &&
          this.props.socialMediaLinks &&
          socialNetworks.map(key => {
            if (!this.props && !this.props.socialMediaLinks[key]) return null
            return (
              <div>
                <Icon
                  key={key}
                  theme="twoTone"
                  type={key}
                  twoToneColor="#00bcd4"
                  className="icon"
                  onClick={this.goto.bind(this, key)}
                  style={{
                    cursor: 'pointer',
                    fontSize,
                    padding
                  }}
                />
                <style jsx>{`
                  div :global(.icon) {
                    color: ${this.props.iconColor};
                  }
                  div :global(.icon):hover {
                    color: ${this.props.iconColorHover};
                  }
                `}</style>
              </div>
            )
          })}
        {this.props &&
          this.props.socialMediaLinks &&
          this.props.socialMediaLinks.customItems &&
          this.props.socialMediaLinks.customItems.map(item => (
            <div>
              <a
                href={item.link}
                target={'_blank'}
                className="social-anchor"
                style={{
                  cursor: 'pointer',
                  padding: 10,
                  fontSize: 24,
                  textDecoration: 'none'
                }}
              >
                {item.title}
              </a>
              <style jsx>{`
                div :global(.social-anchor) {
                  color: ${this.props.iconColor};
                }
                div :global(.social-anchor):hover {
                  color: ${this.props.iconColorHover};
                }
              `}</style>
            </div>
          ))}
        {this.props.children}
      </div>
    )
  }
}
