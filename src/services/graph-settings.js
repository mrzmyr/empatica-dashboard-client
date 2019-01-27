
const chartSettings = {
  title: null,
  subtitle: null,
  exporting: {
   contextButton: {
          enabled: true,
      }
  },
  plotOptions: {
    size: '100%',
    spline: {
      turboThreshold: 1000
    },
    areaspline: {
      opacity: 0.2,
      fillOpacity: 0.15,
      threshold: -2
    },
    scatter: {
      lineWidth: 0
    },
    series: {
      animation: {
        duration: 0
      }
    }
  },
  legend: { enabled: false },
  chart: {
    zoomType: 'x',
    animation: false,
    height: 200
  },
  tooltip: {
    valueDecimals: 2,
    crosshairs: {
        color: '#EEE',
        dashStyle: 'dashed'
    },
  },
  scrollbar: { enabled: false },
  credits:{ enabled: false },
  xAxis: {
    type: 'datetime'
  },
  series: []
}

const seriesSetting = {
  pointStart: null,
  data: null,
  name: null,
  dataGrouping: {
    enabled: true,
    smoothed: false,
    forced: true,
    approximation: 'average',
    groupPixelWidth: 2
  },
  lineWidth: 1,
  states: { hover: { enabled: false } }
}

const settings = {
  temp: { unit: 'Temperature (°C)', pointInterval: 1000/1, type: 'areaspline', color: '#f79f24', yAxisMin: 15 },
  eda: { unit: 'EDA (μS)', pointInterval: 1000/4, type: 'areaspline', color: '#6bafc1', yAxisMin: 0 },
  hr: { unit: 'HR (BPM)', pointInterval: 1000/1, type: 'spline', color: '#bb0029' },
  bvp: { unit: 'BVP', pointInterval: 1000/16, color: '#c7004c' },
  acc: { unit: 'Accelerometers (g)', pointInterval: 1000/1, type: 'areaspline', color: '#7f7f7f' }
}

class GraphSettings {
  get(res) {
    let t = res.type;
    return {
      ...chartSettings,
      yAxis: [{
        allowDecimals: true,
        align: 'left',
        title: { text: settings[t].unit },
        min: settings[t].yAxisMin
      },{
        allowDecimals: true,
        min: settings[t].yAxisMin
      }],
      series: [{
        ...seriesSetting,
        ...settings[t],
        color: settings[t].color,
        data: res.data,
        pointStart: parseInt(res.start_time) * 1000,
        name: t.toUpperCase()
      }]
    }
  }
}

export default new GraphSettings();
