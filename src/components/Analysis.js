import React, { Component } from 'react';
import styled from 'styled-components';

import GraphItem from '../components/GraphItem'
import LoadingContainer from '../components/LoadingContainer'
import AnalysisStats from '../components/AnalysisStats'

import graphSettings from '../services/graph-settings'

function round(num) {
  return Math.round(num * 100) / 100
}

function getStats(arr) {
  let min = arr[0]
  let max = arr[0]
  let sum = arr[0]
  let i = arr.length

  let minIndex = 0;
  let maxIndex = 0;

  while (i--) {
    sum += arr[i]
    if(arr[i] < min) {
      min = arr[i]
      minIndex = i
    }
    if(arr[i] > max) {
      max = arr[i]
      maxIndex = i
    }
  }

  return {
    min: round(min),
    minIndex,
    max: round(max),
    maxIndex,
    avg: round(sum / arr.length)
  }
}

class Analysis extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    let data = {};

    ['temp', 'eda', 'hr', 'bvp', 'acc'].map(k => {
      let graph = graphSettings.get(this.props.data[k])

      graph.yAxis = { labels: { enabled: false }, title: { enabled: false }, lineWidth: 0 }
      graph.xAxis = { labels: { enabled: false }, title: { enabled: false }, lineWidth: 0  }
      graph.chart.height = 100

      let stats = getStats(this.props.data[k].data);

      stats.minTs = graph.series[0].pointStart + (graph.series[0].pointInterval * stats.minIndex)
      stats.maxTs = graph.series[0].pointStart + (graph.series[0].pointInterval * stats.maxIndex)

      console.log(stats)

      graph.yAxis.plotLines = [{
        dashStyle: 'shortdash',
        color: 'rgba(0,0,0,0.4)',
        width: 1,
        value: stats.avg
      }]

      graph.xAxis.plotLines = [{
        color: 'red',
        width: 1,
        value: stats.minTs
      }, {
        color: 'green',
        width: 1,
        value: stats.maxTs
      }]

      // graph.tooltip = { enabled: false }

      data[k] = {
        stats,
        graph
      }
    })

    this.setState({
      data,
      loading: false
    })
  }

  render() {
    if(this.state.loading) {
      return <LoadingContainer message={'Loading analysis…'} />
    }

    return (
      <>
        <h3 className="chart-title">Temperature (°C)</h3>
        <AnalysisStats data={this.state.data.temp} />
        <h3 className="chart-title">Electrodermal activity (EDA)</h3>
        <AnalysisStats data={this.state.data.eda} />
        <h3 className="chart-title">Heart Rate (HR)</h3>
        <AnalysisStats data={this.state.data.hr} />
        <h3 className="chart-title">Blood Volume Pulse (BVP)</h3>
        <AnalysisStats data={this.state.data.bvp} />
        <h3 className="chart-title">Acceleration (g)</h3>
        <AnalysisStats data={this.state.data.acc} />
        <br />
        <br />
        <br />
      </>
    );
  }
}

export default Analysis;
