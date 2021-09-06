import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsStarFill, BsGeoAlt, BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

class JobItem extends Component {
  render() {
    const {jobItem} = this.props
    const ele = (
      <Link to={`jobs/${jobItem.id}`} className="linkStyle">
        <div className="jobItem-outer">
          <div className="jobItemHeader">
            <img
              src={jobItem.company_logo_url}
              className="imgLogo"
              alt="website logo"
            />
            <div className="roleRatingCont">
              <h1 className="jobTitle">{jobItem.title}</h1>
              <div className="ratingCont">
                <BsStarFill className="star" />
                <p className="rating">{jobItem.rating}</p>
              </div>
            </div>
          </div>

          <div className="middleSection">
            <div className="leftSec">
              <div className="locCont">
                <BsGeoAlt className="icon" />
                <p className="rating">{jobItem.location}</p>
              </div>
              <div className="locCont">
                <BsFillBriefcaseFill className="icon" />
                <p className="rating">{jobItem.employment_type}</p>
              </div>
            </div>
            <div className="rightSec">
              <p className="salary">{jobItem.package_per_annum}</p>
            </div>
          </div>

          <hr className="horLine" />

          <div className="descriptionCont">
            <h1 className="descHead">Description</h1>
            <p className="desc-para">{jobItem.job_description}</p>
          </div>
        </div>
      </Link>
    )
    return ele
  }
}

export default JobItem
