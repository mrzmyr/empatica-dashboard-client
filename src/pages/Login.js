import styled from 'styled-components';
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';

import Spinner from '../components/Spinner'

import auth from '../services/auth'

const InputItem = styled.div`
  padding: 10px 0;

  & > input {
    box-sizing:border-box;
    width: 100%;
    border: 1px solid #EEE;
    border-radius: 3px;
    padding: 10px 15px;
  }

  & > input[type="submit"] {
    cursor: pointer;
    background: #009167;
    color: #FFF;
    border: 0;
  }
`

const Background = styled.div`
  background: url(/bg.jpg);
  background-size: cover;
  background-position: 50% center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`

class Login extends Component {
  state = {
    loading: false,
    error: null
  }

  componentDidMount () {
    auth
      .loggedIn()
      .then(res => {
        this.props.history.push('/dashboard')
      })
      .catch(err => {
      })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.setState({ loading: true, error: null })

    auth
      .login({
        username: this.refs.username.value,
        password: this.refs.password.value
      }).then(() => {
        console.log('login successful, redirect to dashboard')
        this.props.history.push('/dashboard')
      })
      .catch(e => {
        this.setState({
          error: e.message,
          loading: false
        })
      })
      .then(() => {
        // this.setState({ loading: false })
      })
  }


  render() {
    return (
      <Grid fluid>
        { this.state.loading &&
          <Row style={{ minHeight: '100vh', color: '#999' }} middle="xs" center="xs"><Col xs={12}>
            <Spinner />
            <br />
            Logging you in…
          </Col></Row>
        }
        { !this.state.loading &&
          <Row middle="xs">
            <Col xs={12} md={4}>
              <div style={{
                padding: 40
              }}>
              <h2 style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 15 }}>Login</h2>
              <div className="subtitle">Login here with your empatica credentials.</div>
              { this.state.error &&
                <div style={{
                  color: 'rgba(0,0,0,0.5)',
                  padding: '10px 15px',
                  backgroundColor: '#ff00004d',
                  borderRadius: 3
                }}>{this.state.error}</div>
              }
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <InputItem><input
                  placeholder="E-Mail"
                  type="text"
                  ref="username"
                  autoComplete="current-username"
                /></InputItem>
                <InputItem><input
                  placeholder="Password"
                  type="password"
                  ref="password"
                  autoComplete="current-password"
                /></InputItem>
                <InputItem><input type="submit" value="Login"/></InputItem>
              </form>
              </div>
            </Col>
            <Col xs={12} md={8}>
              <Background />
            </Col>
          </Row>
        }
      </Grid>
    )
  }
}

export default withRouter(Login)
