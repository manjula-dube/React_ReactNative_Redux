import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import UserForm from './components/usersearch'
import { Provider } from 'react-redux'
import configureStore from 'redux-store/store'

// configureStore , which encapsulates all reducers
const store = configureStore({})

export default class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <UserForm />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
