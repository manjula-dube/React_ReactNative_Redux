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

    this.PAGE_SIZE = 5

    this.state = {
      currentPage: 1
    }

    this.onPageClick = this.onPageClick.bind(this)
  }

  onPageClick (event) {
    event.persist()
    const currentPage = event.currentTarget.getAttribute('data-index')
    this.setState({
      currentPage
    })
  }

  calculateMinMax () {
    const { currentPage } = this.state
    const { PAGE_SIZE } = this

    const minIndex = (currentPage - 1) * PAGE_SIZE, maxIndex = minIndex + PAGE_SIZE

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
    const maxPage = this.getMaxPages()

    return (
      <div>
        {Array(maxPage).join('|').split('|').map((item, index) => {
          return (
            <span data-index={index + 1} onClick={this.onPageClick}>
              {index + 1}{' '}
            </span>
          )
        })}
      </div>
    )
  }

  getMaxPages () {
    if (this.props.repoDetail.repos && this.props.repoDetail.repos.length) {
      return parseInt(this.props.repoDetail.repos.length / this.PAGE_SIZE) + 1
    } else {
      return 0
    }
  }

  render () {
    return (
      <div className='section repositories repo-table'>
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
