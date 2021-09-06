import {Component} from 'react'
import './index.css'
import Header from '../Header'

class Home extends Component {
  onFindJobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    const ele = (
      <>
        <div className="header">
          <Header />
        </div>
        <div className="home-cont">
          <div className="content-cont">
            <h1 className="heading">Find The Job That Fits Your Life</h1>
            <p className="para">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential
            </p>
            <button onClick={this.onFindJobs} type="button" className="jobsBtn">
              Find Jobs
            </button>
          </div>
        </div>
      </>
    )
    return ele
  }
}

export default Home
