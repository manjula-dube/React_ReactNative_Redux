import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList } from 'react-native'

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

    this.state = {
      currentPage: 1,
      pageSize: 5
    }
  }

  renderItem ({ item, index }) {
    return (
      <Repo
        key={item.id}
        id={item.id}
        name={item.name}
        stargazers_count={item.stargazers_count}
        url={item.url}
        created_at={item.created_at}
        stars={item.stars}
        owner={item.owner.login}
            />
    )
  }

  render () {
    return <FlatList data={this.state.repoDetail} renderItem={this.renderItem} />
  }
}

function mapStateToProps (state) {
  return {
    repoDetail: state.home.repoDetails || {}
  }
}

export default connect(mapStateToProps)(Repositories)
