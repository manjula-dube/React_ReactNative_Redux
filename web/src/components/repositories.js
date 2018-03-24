import React, { Component } from 'react'
import { connect } from 'react-redux'

const Repo = props => (
  <div className='repo-row'>
    <div className='repo-cell'>
      <a className='name' href={props.url}>
        {props.id}
      </a>
    </div>
    <div className='stars repo-cell'>{props.name}</div>
    <div className='stars repo-cell'>{props.owner}</div>
    <div className='stars repo-cell'>{props.stargazers_count}</div>
    <div className='stars repo-cell'>{new Date(props.created_at).toDateString()}</div>
    <div className='clear' />
  </div>
)

class Repositories extends Component {
  constructor () {
    super()

    this.pageSizeOptions = [5, 10, 15, 20, 25, 50, 100]

    this.state = {
      currentPage: 1,
      pageSize: 5
    }

    this.onPageClick = this.onPageClick.bind(this)
    this.onPageSizeChange = this.onPageSizeChange.bind(this)
  }

  onPageSizeChange (event) {
    this.setState({
      pageSize: +event.target.value
    })
  }

  onPageClick (event) {
    event.persist()
    const currentPage = event.currentTarget.getAttribute('data-index')
    this.setState({
      currentPage: +currentPage
    })
  }

  calculateMinMax () {
    const { currentPage } = this.state
    const { pageSize } = this.state

    const minIndex = (currentPage - 1) * pageSize, maxIndex = minIndex + pageSize

    return { minIndex, maxIndex }
  }

  renderTable () {
    const { repoDetail } = this.props

    const { minIndex, maxIndex } = this.calculateMinMax()

    if (repoDetail.repos) {
      return repoDetail.repos
                .slice(minIndex, maxIndex)
                .map((repo, index) => (
                  <Repo
                    key={repo.id}
                    id={repo.id}
                    name={repo.name}
                    stargazers_count={repo.stargazers_count}
                    url={repo.url}
                    created_at={repo.created_at}
                    stars={repo.stars}
                    owner={repo.owner.login}
                    />
                ))
    } else {
      return null
    }
  }

  renderControlBar () {
    const maxPage = this.getMaxPages(), { currentPage } = this.state

    return (
      <div className='pagination'>
        {Array(maxPage).join('|').split('|').map((item, index) => {
          const selectedPageClass = index + 1 === currentPage ? 'selected' : ''
          return (
            <span
              className={`page-index ${selectedPageClass}`}
              data-index={index + 1}
              onClick={this.onPageClick}
                        >
              {index + 1}
            </span>
          )
        })}
      </div>
    )
  }

  getMaxPages () {
    const { repos } = this.props.repoDetail, { pageSize } = this.state
    if (repos && repos.length) {
            // repos.length % pageSize && 1
            // If repo count is exactly divisble by page size , no need to add page
      return parseInt(repos.length / pageSize) + (repos.length % pageSize && 1)
    } else {
      return 0
    }
  }

  renderPageSizeDropDown () {
    return (
      <div>
        <span>Number Of Entries per Page : </span>
        <select className='select-option' onChange={this.onPageSizeChange}>
          {this.pageSizeOptions.map(option => {
            return <option value={option}>{option}</option>
          })}
        </select>
      </div>
    )
  }

  render () {
    return (
      <div className='section repositories repo-table'>
        {this.renderPageSizeDropDown()}
        <RepoHeader />
        {this.renderTable()}
        {this.renderControlBar()}
      </div>
    )
  }
}

const RepoHeader = props => (
  <div className='repo-row'>
    <div className='repo-cell'>ID</div>

    <div className='repo-cell'>Repo Title</div>

    <div className='repo-cell'>Owner</div>

    <div className='repo-cell'>Stars</div>
    <div className='repo-cell'>Created At</div>
  </div>
)

function mapStateToProps (state) {
  return {
    repoDetail: state.home.repoDetails || {}
  }
}

export default connect(mapStateToProps)(Repositories)
