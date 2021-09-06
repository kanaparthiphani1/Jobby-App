import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import {BsHouseDoorFill, BsBriefcaseFill, BsBoxArrowRight} from 'react-icons/bs'
import './index.css'

class Header extends Component {
  onLogout = () => {
    const {history} = this.props
    Cookies.remove('JobbY_token')
    history.replace('/login')
  }

  render() {
    const ele = (
      <nav className="navbar">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="logo1"
            className="logoImg"
          />
        </Link>

        <ul className="navLinks">
          <Link className="links" to="/">
            <li>Home</li>
          </Link>
          <Link className="links" to="/jobs">
            <li>Jobs</li>
          </Link>
        </ul>

        <button onClick={this.onLogout} className="logoutBtn" type="button">
          Logout
        </button>

        <div className="iconCont">
          <Link to="/">
            <BsHouseDoorFill className="icons" />
          </Link>
          <Link to="/jobs">
            <BsBriefcaseFill className="icons" />
          </Link>
          <BsBoxArrowRight onClick={this.onLogout} className="icons" />
        </div>
      </nav>
    )
    return ele
  }
}

export default withRouter(Header)
