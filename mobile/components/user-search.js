import React from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { connect } from 'react-redux'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { inputValue: '' }
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
    this.onSearchUserClick()
  }

  onSearchUserClick () {
    get(`https://github-user.now.sh?username=${this.state.userName}`).then(data => {
      this.props.dispatch(storeResult(data.data))
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Search Gihub</Text>
        <TextInput
          onChangeText={event => this.onInputChange(event.target.value)}
          style={styles.input}
          value={this.state.inputValue}
          placeholder='Search github Users'
                />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20
  },
  title: {
    fontSize: 22,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#e4e4e4',
    height: 55,
    borderRadius: 3,
    padding: 5,
    marginTop: 12
  }
})
