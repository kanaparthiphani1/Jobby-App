import {Component} from 'react'
import './index.css'

class Jobsfailure extends Component {
  render() {
    const {onRetry} = this.props
    return (
      <div className="jobsFailedCont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          className="jobsFailedImg"
          alt="img"
        />
        <h1 className="jobsFailedText">Oops! Something Went Wrong</h1>
        <p className="jobsFailedPara">
          We can't seem to find the page you are looking for
        </p>
        <button onClick={onRetry} className="custRetry" type="button">
          Retry
        </button>
      </div>
    )
  }
}

export default Jobsfailure
