import React from 'react'
import { Alert, View, Text, TextInput, StyleSheet } from 'react-native'

export default class Header extends React.Component {
  render () {
    return (
      <View style={styles.PinContainer}>
        <Text style={styles.PinText}>Search Github Username's</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  PinContainer: {
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 20
  }
})
