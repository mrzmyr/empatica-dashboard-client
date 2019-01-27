import React, { Component } from 'react';

import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

class LineChart extends Component {
  render() {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={this.props.options}
      />
    );
  }
}

export default LineChart;
