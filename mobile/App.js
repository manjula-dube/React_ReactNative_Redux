import React from 'react'
import Main from './index'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { data: {} }
  }
  render () {
    return (
      <div>
        <Main />
      </div>
    )
  }
}
export default App
