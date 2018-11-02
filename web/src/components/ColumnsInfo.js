import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import { Typography } from '@rmwc/typography'
import { Row, Col } from 'antd'
import { Icon } from '@rmwc/icon'
import { CircularProgress } from '@rmwc/circular-progress'

export default class ColumnsInfo extends Component {
  constructor (props) {
    super(props)
		this.state = { ...this.state, tokenData: null}
  }

  componentDidMount () {
		super.componentDidMount()		
		fetch(this.props.data)
		.then(response => response.json())
		.then(tokenData => {
			this.setState({ tokenData })
		})
		.catch(error => console.error(error))
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

	renderRowsAndColumns() {
		const { tokenData } = this.state
		return tokenData && tokenData.rows.map(row => this.renderRow(row))
	}

	renderRow(row) {
		return <Row gutter={96}>
			{row && row.columns.map( column => this.renderColumn(column))}
		</Row>
	}

	renderColumn(column) {
		return <Col md={8} sm={24} xs={24}>
			<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginBottom: '20px', textAlign: 'center'}}>
				<Icon icon={column.icon} style={{fontSize: '60px'}} />
				<div>
					<Typography use="headline3" style={{padding: '15px', display: 'block'}}>{column.title}</Typography>
				</div>
				<div>
					<Typography use="headline5" style={{padding: '15px', display: 'block'}}>{column.subtitle}</Typography>
				</div>
			</div>
		</Col>
	}

  renderComponent () {
		if (!this.state.tokenData) {
			return <div>
				<CircularProgress size="large" />
			</div>
		}
		return (<div 
			style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', margin: '100px 15px' }} 
			>
      { this.renderText() }	
			{ this.renderRowsAndColumns() }
    </div>)
  }
}
