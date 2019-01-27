import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import moment from 'moment';
import Sticky from 'react-stickynode';
import { withRouter } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import Sidebar from '../components/Sidebar'
import Graphs from '../components/Graphs'
import Analysis from '../components/Analysis'
import LoadingContainer from '../components/LoadingContainer'

import api from '../services/api'
import auth from '../services/auth'

class ErrorContainer extends Component {

  logout(e) {
    e.preventDefault()
    auth.logout()
    this.props.history.push('/login')
  }

  render() {
    return (
      <Row style={{ minHeight: '100vh', color: '#999' }} middle="xs" center="xs">
        <Col xs={12}>
          <span>{this.props.message}</span>
          <br />
          <br />
          <button onClick={(e) => this.logout(e)}>Logout</button>
        </Col>
      </Row>
    )
  }
}

class Dashboard extends Component {

  state = {
    loading: true,
    error: null,
    sessions: []
  }

  componentDidMount () {
    auth
      .loggedIn()
      .then(res => {
        console.log('dashboard: auth successful, loading data')
        this.getData()
      })
      .catch(err => {
        this.setState({
          error: err
        })
        this.props.history.push('/login')
      })
  }

  getData() {
    api
      .getSessions()
      .then(res => {
        this.setState({
          loading: false,
          sessions: res
        })

        let lastDate = moment.unix(res[res.length - 1].start_time).toDate();
        this.onDateSelect(lastDate)
      })
      .catch(err => {
        this.setState({
          loading: false,
          error: err
        })
      })
  }

  onDateSelect(date) {
    this.setState({ selectedDate: date })

    let selectedSessions = this.state.sessions.filter(s => {
      return moment.unix(s.start_time).isSame(moment(date), 'day')
    })

    this.setState({ selectedSessions })

    if(selectedSessions.length) {
      this.onSessionSelect({ preventDefault: () => {}}, selectedSessions[0])
    }
  }

  async onSessionSelect(e, session) {
    e.preventDefault();

    this.setState({
      currentSessionId: session.id,
      sessionData: null,
      loadingSessionData: true
    })

    let data = {};
    let types = ['temp', 'eda', 'hr', 'bvp', 'acc']

    for (var i = 0; i < types.length; i++) {
      try {
        this.setState({ loadingMessage: `Loading ${types[i]} data…` })
        data[types[i]] = await api.getSessionData(session.id, types[i]);
      } catch(e) {
        return this.setState({
          loadingSessionData: false,
          error: `Error while loading ${types[i]} data!`
        })
      }
    }

    this.setState({
      sessionData: data,
      loadingSessionData: false
    })
  }

  render() {
    return (
      <Grid fluid>
      { this.state.loading &&
        <LoadingContainer message={'Loading sessions…'} />
      }
      { this.state.error &&
        <ErrorContainer history={this.props.history} message={`Sorry an error occured: ${this.state.error}`} />
      }
      { !this.state.error && !this.state.loading &&
          <Row style={{ height: '100%' }}>
            <Col className="sidebar-col" xs={12} sm={12} md={12} lg={3}>
              <Sticky enabled={true}>
                <Sidebar
                  sessions={this.state.sessions}
                  selectedDate={this.state.selectedDate}
                  selectedSessions={this.state.selectedSessions}
                  onDateSelect={this.onDateSelect.bind(this)}
                  onSessionSelect={this.onSessionSelect.bind(this)}
                  currentSessionId={this.state.currentSessionId}
                />
              </Sticky>
            </Col>
            <Col xs={12} sm={12} md={12} lg={9}>
              { this.state.loadingSessionData &&
                <LoadingContainer message={ this.state.loadingMessage ? this.state.loadingMessage : 'Loading sessions graphs…' } />
              }
              { this.state.sessionData &&
                <div style={{ padding: '0 20px' }}>
                <Tabs>
                  <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Metadata</Tab>
                  </TabList>

                  <TabPanel>
                    <Graphs data={this.state.sessionData} />
                  </TabPanel>
                  <TabPanel>
                    <Analysis data={this.state.sessionData} />
                  </TabPanel>
                </Tabs>
                </div>
              }
            </Col>
          </Row>
      }
      </Grid>
    )
  }
}

export default withRouter(Dashboard)
