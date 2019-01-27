import React, { Component } from 'react';

import GraphItem from '../components/GraphItem'
import graphSettings from '../services/graph-settings'

class Graphs extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    let keys = Object.keys(this.props.data);
    let data = {};
    keys.map(k => {
      data[k] = graphSettings.get(this.props.data[k])
      data[k].xAxis.plotBands = []
      data[k].chart.height = 200
    });
    this.setState({ data })
  }

  render() {
    if(!this.state.data) return null;

    return (
      <>
        <GraphItem title="Temperature (°C)" options={this.state.data.temp} />
        <GraphItem title="Electrodermal activity (EDA)" options={this.state.data.eda} />
        <GraphItem title="Heart Rate (HR)" options={this.state.data.hr} />
        <GraphItem title="Blood Volume Pulse (BVP)" options={this.state.data.bvp} />
        <GraphItem title="Acceleration (g)" options={this.state.data.acc} />
      </>
    );
  }
}

export default Graphs;
