import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import UserSearch from './components/user-search'
import Repositories from './components/repositories'

import configureStore from 'redux-store/store'

// configureStore , which encapsulates all reducers
const store = configureStore({})

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: {} }
  }
  render () {
    return (
      <div>
        <UserSearch />
        <div>
          <Repositories repos={this.props.data.repos} />
        </div>
      </div>
    )
  }
}
export default Main
