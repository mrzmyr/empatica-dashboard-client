import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import SessionDayPicker from '../components/SessionDayPicker'

import auth from '../services/auth'

class Sidebar extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  logout(e) {
    console.log(e)
    e.preventDefault()
    auth.logout()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <button className="sidebar-logout" onClick={this.logout.bind(this)}>
            <img alt="Logout" src="/logout.svg" width="16px" height="16px" />
          </button>
        </div>
        <h3 style={{ marginBottom: 5 }}>Navigation</h3>
        <div className="subtitle">Select a date with sessions</div>
        <SessionDayPicker
          sessions={this.props.sessions}
          selectedDate={this.props.selectedDate}
          onDateSelect={this.props.onDateSelect}
        />
        <div className="subtitle" style={{ marginBottom: 10 }}>Select a session</div>
        { this.props.selectedSessions &&
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}>
            { !this.props.selectedSessions.length &&
              <i>No Sessions found</i>
            }
            { this.props.selectedSessions.map(s => {
              return <li key={s.id}><button
                className={'radio-button ' + (this.props.currentSessionId === s.id ? 'active' : '') }
                onClick={(e) => this.props.onSessionSelect(e, s)}
                >
                  {moment.unix(s.start_time).format('ddd, DD. MMM - HH:mm')}&nbsp;
                  <span style={{
                    opacity: 0.3
                  }}>
                    ({parseInt(moment.duration(parseInt(s.duration), 'seconds').asHours())}h {moment.duration(parseInt(s.duration), 'seconds').minutes()}m)
                  </span>
                </button></li>
            })}
          </ul>
        }
      </div>
    )
  }
}

export default withRouter(Sidebar)
