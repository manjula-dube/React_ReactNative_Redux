import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Text, StyleSheet } from 'react-native'

const Repo = props => (
  <View style={styles.reporow}>
    <Text style={styles.repocolumn}>
      {props.id}
    </Text>
    <Text style={styles.repocolumn}>{props.name}</Text>
    <Text style={styles.repocolumn}>{props.owner}</Text>
    <Text style={styles.repocolumn}>{props.stargazers_count}</Text>
    <Text style={styles.repocolumn}>{new Date(props.created_at).toDateString()}</Text>
    <Text className='clear' />
  </View>
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
    return (
      <View>
        <FlatList keyExtractor={item => item.id} data={this.props.repoDetail} renderItem={this.renderItem} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  reporow: {
    flexDirection: 'row',
    padding: 10
  },
  repocolumn: {
    flexDirection: 'column',
    padding: 10
  }
})

function mapStateToProps (state) {
  return {
    repoDetail: state.home.repoDetails || {}
  }
}

export default connect(mapStateToProps)(Repositories)
