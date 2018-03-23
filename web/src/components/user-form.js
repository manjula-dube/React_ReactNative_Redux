import React from 'react'
import { connect } from 'react-redux'

import { get } from '../data-fetcher'
import { setBusy, storeResult } from '../action'

class UserForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { userName: '' }
    this.onSearchUserClick = this.onSearchUserClick.bind(this)
    this.debounce = this.debounce.bind(this)
    this.bouncer = this.debounce(this.autoTrigger, 300).bind(this)
  }

  onInputChange (userName) {
    this.setState({ userName })

    this.bouncer()
  }

  debounce (execFn, wait) {
    let timer

    return function (args) {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        execFn.apply(this, args)
      }, wait)
    }
  }

  autoTrigger () {
    if (this.cancelTokenFn) {
      this.cancelTokenFn()
      this.cancelTokenFn = null
    }
    this.props.dispatch(setBusy(false))
    this.onSearchUserClick()
  }

  onSearchUserClick () {
    if (this.props.busy) {
      return
    }

    this.props.dispatch(setBusy(true))
    get(`https://github-user.now.sh?username=${this.state.userName}`).then(data => {
      this.props.dispatch(setBusy(false))
      this.props.dispatch(storeResult(data.data))
    })
  }

  render () {
    return (
      <div className='user-form'>
        <input
          onChange={event => this.onInputChange(event.target.value)}
          type='text'
          placeholder='github username'
          value={this.state.userName}
                />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    busy: state.home.busy
  }
}

export default connect(mapStateToProps)(UserForm)
