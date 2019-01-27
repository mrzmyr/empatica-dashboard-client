import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid';

import Spinner from '../components/Spinner'

class LoadingContainer extends Component {
  render () {
    return (
      <Row style={{ minHeight: '100vh', color: '#999' }} middle="xs" center="xs">
        <Col xs={12}>
          <Spinner />
          <br />
          {this.props.message}
        </Col>
      </Row>
    )
  }
}

export default LoadingContainer
