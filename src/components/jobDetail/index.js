import {Component} from 'react'
import {
  BsStarFill,
  BsBoxArrowUpRight,
  BsGeoAlt,
  BsFillBriefcaseFill,
} from 'react-icons/bs'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class JobDetail extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    const {match} = this.props
    console.log(match)
    const jwtToken = Cookies.get('JobbY_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs/${match.params.id}`

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs
      this.setState({
        jobDetails,
        similarJobs,
      })
    }
  }

  render() {
    const {jobDetails, similarJobs} = this.state
    console.log(jobDetails)

    const ele = (
      <div className="detailCont">
        <div className="header">
          <Header />
        </div>
        <div className="jobItemOuter">
          <div className="jobItem-outer1">
            <div className="jobItemHeader">
              <img
                src={jobDetails.company_logo_url}
                className="imgLogo"
                alt="img"
              />
              <div className="roleRatingCont">
                <h1 className="jobTitle">{jobDetails.title}</h1>
                <div className="ratingCont">
                  <BsStarFill className="star" />
                  <p className="rating">{jobDetails.rating}</p>
                </div>
              </div>
            </div>

            <div className="middleSection">
              <div className="leftSec">
                <div className="locCont">
                  <BsGeoAlt className="icon" />
                  <p className="rating">{jobDetails.location}</p>
                </div>
                <div className="locCont">
                  <BsFillBriefcaseFill className="icon" />
                  <p className="rating">{jobDetails.employment_type}</p>
                </div>
              </div>
              <div className="rightSec">
                <p className="salary">{jobDetails.package_per_annum}</p>
              </div>
            </div>

            <hr className="horLine" />

            <div className="descriptionCont">
              <div className="descCont">
                <h1 className="descHead">Description</h1>
                <div className="anchorCont">
                  <a
                    href={jobDetails.company_website_url}
                    target="_blank"
                    rel="noreferrer"
                    className="anchorStyle"
                  >
                    Visit <BsBoxArrowUpRight />
                  </a>
                </div>
              </div>
              <p className="desc-para">{jobDetails.job_description}</p>
            </div>

            <div className="descriptionCont">
              <h1 className="descHead">Skills</h1>
              <div className="skillsCont">
                {jobDetails.skills !== undefined &&
                  jobDetails.skills.map(eachItem => (
                    <div className="skillOuter">
                      <img
                        src={eachItem.image_url}
                        alt="img"
                        className="skillImg"
                      />
                      <h1 className="skillText">{eachItem.name}</h1>
                    </div>
                  ))}
              </div>
            </div>

            <div className="lifeAtCompanyCont">
              <div className="contentCont">
                <h1 className="descHead">Life at Company</h1>
                <p className="desc-para1">
                  {jobDetails.life_at_company !== undefined &&
                    jobDetails.life_at_company.description}
                </p>
              </div>
              <img
                src={
                  jobDetails.life_at_company !== undefined &&
                  jobDetails.life_at_company.image_url
                }
                alt="img"
                className="companyImg"
              />
            </div>
          </div>
          <div className="similarJobsCont">
            <h1 className="jobTitle1">Similar Jobs</h1>
            <div className="similarJobsOuter">
              {similarJobs.map(eachItem => (
                <Link className="styledLinks" to={`/jobs/${jobDetails.id}`}>
                  <div className="jobItemOut">
                    <div className="jobItem-outer2">
                      <div className="jobItemHeader">
                        <img
                          src={eachItem.company_logo_url}
                          className="imgLogo"
                          alt="img"
                        />
                        <div className="roleRatingCont">
                          <h1 className="jobTitle">{eachItem.title}</h1>
                          <div className="ratingCont">
                            <BsStarFill className="star" />
                            <p className="rating">{eachItem.rating}</p>
                          </div>
                        </div>
                      </div>

                      <div className="middleSection">
                        <div className="leftSec">
                          <div className="locCont">
                            <BsGeoAlt className="icon" />
                            <p className="rating">{eachItem.location}</p>
                          </div>
                          <div className="locCont">
                            <BsFillBriefcaseFill className="icon" />
                            <p className="rating">{eachItem.employment_type}</p>
                          </div>
                        </div>
                        <div className="rightSec">
                          <p className="salary">{eachItem.package_per_annum}</p>
                        </div>
                      </div>

                      <hr className="horLine" />

                      <div className="descriptionCont">
                        <h1 className="descHead">Description</h1>
                        <p className="desc-para">{eachItem.job_description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
    return ele
  }
}

export default JobDetail
