import {Component} from 'react'
import Cookies from 'js-cookie'
import {MultiSelect} from 'react-multi-select-component'
import Loader from 'react-loader-spinner'
import './index.css'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobList from '../JobList'
import Jobsfailure from '../JobsFailure'

const employmentTypesList = [
  {
    label: 'Full Time',
    value: 'FULLTIME',
  },
  {
    label: 'Part Time',
    value: 'PARTTIME',
  },
  {
    label: 'Freelance',
    value: 'FREELANCE',
  },
  {
    label: 'Internship',
    value: 'INTERNSHIP',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileInfo: {},
    employmentTypeSelected: [],
    salarySelected: '',
    jobList: [],
    searchText: '',
    profileProgress: apiStatusConstants.initial,
    jobsProgress: apiStatusConstants.initial,
    employmentTypeSmallSelected: [],
  }

  componentDidMount() {
    this.getProfileInfo()
    this.getJobsData()
  }

  searchChange = event => {
    console.log(event)

    if (event.target.value === '') {
      this.setState({searchText: ''}, this.getJobsData)
    } else {
      this.setState({searchText: event.target.value})
    }
  }

  onSearchCLicked = () => {
    this.getJobsData()
  }

  enterClicked = event => {
    if (event.keyCode === 13) {
      this.getJobsData()
    }
  }

  onRetry = () => {
    this.getJobsData()
  }

  onEmployeetypeChange = event => {
    console.log('Closed Event', event)

    if (event.length !== 0) {
      const val = event[0].value
      console.log(event)

      const {employmentTypeSelected, employmentTypeSmallSelected} = this.state
      console.log(employmentTypeSmallSelected)

      const filterCheck = employmentTypeSmallSelected.filter(
        eachItem => eachItem.value === val,
      )

      console.log('FilterCheck', filterCheck)

      if (employmentTypeSelected.includes(val)) {
        this.setState(
          prevState => ({
            employmentTypeSelected: prevState.employmentTypeSelected.filter(
              eachItem => eachItem !== val,
            ),
          }),
          this.getJobsData,
        )
      } else {
        this.setState(
          {employmentTypeSelected: [...employmentTypeSelected, val]},
          this.getJobsData,
        )
      }

      const {label, value} = event[0]

      this.setState({
        employmentTypeSmallSelected: [...event],
      })

      console.log(employmentTypeSmallSelected)
    } else {
      this.setState(
        {
          employmentTypeSmallSelected: [],
          employmentTypeSelected: [],
        },
        this.getJobsData,
      )
    }
  }

  getJobsData = async () => {
    this.setState({jobsProgress: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('JobbY_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    let url = 'https://apis.ccbp.in/jobs'

    // const apiUrl = 'https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=

    const params = []
    const {employmentTypeSelected, salarySelected, searchText} = this.state
    if (
      employmentTypeSelected !== undefined &&
      employmentTypeSelected.length !== 0
    ) {
      const emplymentType = employmentTypeSelected.join(',')
      params.push(`employment_type=${emplymentType}`)
    }
    if (salarySelected !== '') {
      params.push(`minimum_package=${salarySelected}`)
    }
    if (searchText !== '') {
      params.push(`search=${searchText}`)
    }
    const paramStr = params.join('&')

    if (paramStr !== '') {
      url = url.concat('?'.concat(paramStr))
    }

    console.log(url)

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        jobList: data.jobs,
        jobsProgress: apiStatusConstants.success,
      })
    } else {
      this.setState({
        jobFailure: true,
        jobsProgress: apiStatusConstants.failure,
      })
    }
  }

  onCheckBoxChange = event => {
    console.log(event.target.value)
    const val = event.target.value
    const {employmentTypeSelected} = this.state
    if (employmentTypeSelected.includes(val)) {
      this.setState(
        prevState => ({
          employmentTypeSelected: prevState.employmentTypeSelected.filter(
            eachItem => eachItem !== val,
          ),
        }),
        this.getJobsData,
      )
    } else {
      this.setState(
        {employmentTypeSelected: [...employmentTypeSelected, val]},
        this.getJobsData,
      )
    }
  }

  onRadioChange = event => {
    console.log(event.target.value)
    this.setState({salarySelected: event.target.value}, this.getJobsData)
  }

  getProfileInfo = async () => {
    this.setState({profileProgress: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('JobbY_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/profile'

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        profileInfo: data.profile_details,
        profileProgress: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileFailure: true,
        profileProgress: apiStatusConstants.failure,
      })
    }
  }

  profileView = () => {
    const {profileInfo, profileProgress} = this.state

    switch (profileProgress) {
      case apiStatusConstants.success:
        return (
          <div className="profile-cont">
            <img
              src={profileInfo.profile_image_url}
              alt="avatar"
              className="avatar"
            />
            <h1 className="profName">{profileInfo.name}</h1>
            <p className="profDesc">{profileInfo.short_bio}</p>
          </div>
        )

      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container" testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )

      case apiStatusConstants.failure:
        return (
          <div className="profile-cont1">
            <button type="button" className="custRetry">
              Retry
            </button>
          </div>
        )

      default:
        return null
    }
  }

  jobsView = () => {
    const {jobList, jobsProgress} = this.state
    console.log('jobsList : ', jobList)

    switch (jobsProgress) {
      case apiStatusConstants.success:
        if (jobList.length !== 0) {
          return (
            <div className="jobsSuccessCont">
              <JobList jobList={jobList} />
            </div>
          )
        }
        return (
          <div className="noJobsFoundCont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="img"
              className="nojobsFoundImg"
            />
            <h1 className="noJobsFound">No Jobs Found</h1>
            <p className="noJobsPara">
              We couldn't find any jobs with this filter
            </p>
          </div>
        )

      case apiStatusConstants.inProgress:
        return (
          <div className="loader-container1" testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case apiStatusConstants.failure:
        return (
          <div className="jobsFailureCont">
            <Jobsfailure onRetry={this.onRetry} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {employmentTypeSelected, employmentTypeSmallSelected} = this.state
    console.log('employmentTypeSmallSelected', employmentTypeSmallSelected)

    const ele = (
      <>
        <div className="header">
          <Header />
        </div>
        <div className="job-cont">
          <div className="searchFlexCont">
            <div className="searchCont showMob">
              <input
                onChange={this.searchChange}
                onKeyUp={this.enterClicked}
                type="search"
                className="searchInp"
              />
              <BsSearch onClick={this.onSearchCLicked} className="searchIcon" />
            </div>
          </div>
          <div className="left-pane">
            {this.profileView()}

            <hr className="horLine" />

            <div className="employmentFilterCont">
              <h1 className="employmentHeader">Types of Employment</h1>
              {employmentTypesList.map(eachItem => (
                <div key={eachItem.value} className="employmentFilter">
                  <input
                    id={eachItem.value}
                    type="checkbox"
                    className="checkboxSel"
                    onChange={this.onCheckBoxChange}
                    value={eachItem.value}
                  />
                  <label htmlFor={eachItem.value} className="emplymentTypeText">
                    {eachItem.label}
                  </label>
                </div>
              ))}
            </div>

            <div className="filterSmallCont sticky-div">
              <div className="employeetTypeSmallCont">
                <h1 className="typeOfEmployee">Type of Employment</h1>
                <MultiSelect
                  className="multiSelect"
                  options={employmentTypesList}
                  onChange={this.onEmployeetypeChange}
                  value={employmentTypeSmallSelected}
                  labelledBy="Select"
                />
              </div>
              <div className="salarySmallCont">
                <h1 className="typeOfEmployee">Salary Range</h1>
                <select onChange={this.onRadioChange} className="salarySelect">
                  <option value="">None</option>
                  {salaryRangesList.map(eachItem => (
                    <option
                      key={eachItem.salaryRangeId}
                      value={eachItem.salaryRangeId}
                    >
                      {eachItem.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <hr className="horLine" />

            <div className="employmentFilterCont">
              <h1 className="employmentHeader">Salary Range</h1>
              {salaryRangesList.map(eachItem => (
                <div key={eachItem.salaryRangeId} className="employmentFilter">
                  <input
                    id={eachItem.salaryRangeId}
                    type="radio"
                    className="checkboxSel"
                    name="salary"
                    onChange={this.onRadioChange}
                    value={eachItem.salaryRangeId}
                  />
                  <label
                    htmlFor={eachItem.salaryRangeId}
                    className="emplymentTypeText"
                  >
                    {eachItem.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="right-pane">
            <div className="searchCont">
              <input
                onChange={this.searchChange}
                onKeyUp={this.enterClicked}
                type="search"
                className="searchInp"
              />
              <BsSearch onClick={this.onSearchCLicked} className="searchIcon" />
            </div>

            {this.jobsView()}
          </div>
        </div>
      </>
    )

    return ele
  }
}

export default Jobs
