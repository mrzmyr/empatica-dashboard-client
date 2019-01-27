import React, { Component } from 'react'
import styled from 'styled-components';
import LineChart from '../components/LineChart'

const DataPointLenth = styled.span`
  font-size: 11px;
  color: #999;

  &:before {
    content: 'Datapoints: '
  }
`

const GraphContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`

export default class GraphItem extends Component {
  render() {
    if(!this.props.options) return null;
    // <DataPointLenth>{this.props.options.series[0].data.length}</DataPointLenth>
    return (
      <div>
        <h3 className="chart-title">{this.props.title}</h3>
        <GraphContainer>
          <LineChart options={this.props.options} colors={this.props.colors} />
        </GraphContainer>
      </div>
    )
  }
}
