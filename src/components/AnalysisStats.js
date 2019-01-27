import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';

import moment from 'moment';

import LineChart from '../components/LineChart'

const InfoBox = styled.div`
  text-align: center;
`;

const InfoBoxTitle = styled.div`
  font-size: 11px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const InfoBoxContent = styled.div`
  font-weight: 300;
  font-size: 36px;
`;

const InfoBoxMeta = styled.div`
  font-weight: 300;
  font-size: 14px;
  margin-top: 5px;
  color: #999;
`;

export default class AnalysisStats extends Component {
  state = {}

  render() {
    if(!this.props.data) return null

    return (
      <Row middle="xs" className="analysis-stats">
        <Col xs={12} sm={12} md={12} lg={3}>
          <LineChart options={this.props.data.graph} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={3}>
          <InfoBox>
            <InfoBoxTitle>Minimum</InfoBoxTitle>
            <InfoBoxContent className="dot-min">{this.props.data.stats.min}</InfoBoxContent>
            <InfoBoxMeta>{moment(this.props.data.stats.minTs).format('DD.MMM, HH:mm')}</InfoBoxMeta>
          </InfoBox>
        </Col>
        <Col xs={12} sm={12} md={12} lg={3}>
          <InfoBox>
            <InfoBoxTitle>Maximum</InfoBoxTitle>
            <InfoBoxContent className="dot-max">{this.props.data.stats.max}</InfoBoxContent>
            <InfoBoxMeta>{moment(this.props.data.stats.maxTs).format('DD.MMM, HH:mm')}</InfoBoxMeta>
          </InfoBox>
        </Col>
        <Col xs={12} sm={12} md={12} lg={3}>
          <InfoBox>
            <InfoBoxTitle>Durchschnitt</InfoBoxTitle>
            <InfoBoxContent className="dot-avg">{this.props.data.stats.avg}</InfoBoxContent>
            <InfoBoxMeta>&nbsp;</InfoBoxMeta>
          </InfoBox>
        </Col>
      </Row>
    )
  }
}
