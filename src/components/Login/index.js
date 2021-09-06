import {Component} from 'react'
import Cookie from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showerrorMsg: false,
    errorMsg: '',
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onLoginSuccess = jwt => {
    this.setState({showerrorMsg: false, errorMsg: ''})
    Cookie.set('JobbY_token', jwt)

    const {history} = this.props

    history.replace('/')
  }

  onLoginfailure = errorMsg => {
    this.setState({showerrorMsg: true, errorMsg})
  }

  login = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginfailure(data.error_msg)
    }
  }

  onFormSubmit = event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username === '' || password === '') {
      console.log('no username')
    } else {
      this.login()
    }
  }

  render() {
    const {username, password, showerrorMsg, errorMsg} = this.state

    const ele = (
      <div className="outer-cont">
        <div className="login-cont">
          <img
            className="logoImg"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="logo"
          />
          <div className="login-form-cont">
            <form onSubmit={this.onFormSubmit} className="formCont">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                value={username}
                id="username"
                className="input userName"
                onChange={this.onUsernameChange}
              />
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                value={password}
                type="password"
                id="password"
                className="input password"
                onChange={this.onPasswordChange}
              />
              <button className="custLogin" type="submit">
                Login
              </button>
              {showerrorMsg && <p className="errorMsg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
    return ele
  }
}

export default Login
