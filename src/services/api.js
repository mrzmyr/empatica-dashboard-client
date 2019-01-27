import auth from '../services/auth'

class Api {
  constructor() {
    this._apiHost = process.env.REACT_APP_API_HOST;
  }

  getSessions() {
    return fetch(`${this._apiHost}/sessions?userId=${auth.getUserId()}`, {
      headers: {
        'Authorization': `Bearer ${auth.getToken()}`
      }
    })
    .then(res => {
      if(!res.ok) {
        return Promise.reject(res.statusText)
      }
      return res.json()
    })
  }

  getSessionData(id, type) {
    return fetch(`${this._apiHost}/sessions/${id}/data?type=${type}`, {
      headers: {
        'Authorization': `Bearer ${auth.getToken()}`,
      }
    })
    .then(res => {
      if(!res.ok) {
        return Promise.reject(res.statusText)
      }
      return res.json()
    })
  }

}

export default new Api()
