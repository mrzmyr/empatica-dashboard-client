class Auth {
  constructor() {
    this._apiHost = process.env.REACT_APP_AUTH_HOST;
  }

  getToken() {
    if(process.browser) return localStorage.getItem('token');
  }

  setToken(token) {
    if(process.browser) localStorage.setItem('token', token)
  }

  removeToken() {
    if(process.browser) localStorage.removeItem('token')
  }

  getUserId(token) {
    if(process.browser) return localStorage.getItem('userId')
  }

  setUserId(token) {
    if(process.browser) localStorage.setItem('userId', token)
  }

  removeUserId() {
    if(process.browser) localStorage.removeItem('userId')
  }

  async loggedIn() {
    if([null, undefined].includes(this.getToken())) {
      return Promise.reject('token not set')
    }
    return this.validateToken(this.getToken())
  }

  validateToken(token) {
    return fetch(`${this._apiHost}/auth`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res)
        if(!res.ok) {
          this.removeToken()
          return Promise.reject('token validation failed')
        }
      })
  }

  login({ username, password }) {
    let body = { username, password };
    body = Object.keys(body).map(k => `${k}=${body[k]}`).join('&')

    return fetch(`${this._apiHost}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })
    .then(resp => {
      if(!resp.ok) {
        throw new Error(resp.statusText)
      }
      return resp.json()
    })
    .then(data => {
      console.log('auth service: successful auth, setToken')
      this.setUserId(data.userId)
      this.setToken(data.token)
    })
  }

  logout() {
    this.removeToken()
    this.removeUserId()
  }
}

export default new Auth()
