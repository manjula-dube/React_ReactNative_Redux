import React from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'
import { connect } from 'react-redux'

export default class App extends React.Component {
  state = {
    inputValue: ''
  }

  updateInput = inputValue => {
    this.setState({ inputValue })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Search Gihub</Text>
        <TextInput
          onChangeText={text => this.updateInput(text)}
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
