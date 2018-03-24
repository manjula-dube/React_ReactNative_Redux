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

  render () {
    return (
      <div className='section repositories repo-table'>
        <RepoHeader />
        {this.renderTable()}
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
