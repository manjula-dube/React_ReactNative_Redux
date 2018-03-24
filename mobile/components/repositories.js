import React from 'react'
import { connect } from 'react-redux'

const Repo = props => (
  <div style={styles.repoRow}>
    <div style={styles.repoColumn}>
      <a className='name' href={props.url}>
        {props.id}
      </a>
    </div>
    <div style={styles.repoColumn}>
      {props.title}
    </div>
    <div style={styles.repoColumn}>
      {props.name}
    </div>
    <div style={styles.repoColumn}>
      {props.star}
    </div>
    <div style={styles.repoColumn}>
      {props.created}
    </div>
    <div className='clear' />
  </div>
)

const styles = StyleSheet.create({
  repoColumn: {
    borderTopWidth: 1.0,
    borderColor: '#AAAAAA',
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 20
  },
  repoRow: {
    borderTopWidth: 1.0,
    borderColor: '#AAAAAA',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 20
  }
})

const Repositories = ({ repoDetail }) => (
  <View style={styles.container}>
    <RepoHeader />
    {repoDetail.repos &&
            repoDetail.map((repo, index) => (
              <Repo
                key={index}
                id={repo.id}
                star={repo.stargazers_count}
                name={repo.owner.login}
                created={repo.created_at}
                title={repo.name}
                />
            ))}
  </View>
)

function mapStateToProps (state) {
  console.log(state.home.repoDetails)
  return {
    repoDetail: state.home.repoDetails || {}
  }
}

export default connect(mapStateToProps)(Repositories)
