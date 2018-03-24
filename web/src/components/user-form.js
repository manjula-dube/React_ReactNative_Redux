import React from "react"
import { connect } from "react-redux"

import { get } from "../data-fetcher"
import { setBusy, storeResult, renderResult } from "../action"

class UserForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = { userName: "" }
		this.onSearchUserClick = this.onSearchUserClick.bind(this)
		this.debounce = this.debounce.bind(this)
		this.bouncer = this.debounce(this.autoTrigger, 300).bind(this)
	}

	onInputChange(userName) {
		this.setState({ userName })

		this.bouncer()
	}

	debounce(execFn, wait) {
		let timer

		return function(args) {
			if (timer) {
				clearTimeout(timer)
			}

			timer = setTimeout(() => {
				execFn.apply(this, args)
			}, wait)
		}
	}

	autoTrigger() {
		this.props.dispatch(setBusy(false))
		this.onSearchUserClick()
	}

	onSearchUserClick() {
		if (this.props.busy) {
			return
		}
		if (!this.loadFromStore()) {
			this.fetchData()
		}
	}

	loadFromStore() {
		const { history } = this.props
		const result = history.find(user => user.username === this.state.userName)
		if (result) {
			this.props.dispatch(
				renderResult({
					...result,
				})
			)
			return true
		}

		return false
	}

	fetchData() {
		this.props.dispatch(setBusy(true))
		const userDetailPromise = get(`https://github-user.now.sh?username=${this.state.userName}`)
		const repoDetailPromise = get(`
		https://api.github.com/users/${this.state.userName}/repos`)

		Promise.all([userDetailPromise, repoDetailPromise]).then(response => {
			this.props.dispatch(setBusy(false))
			this.props.dispatch(
				storeResult({
					...response[0].data,
					repos: response[1].data,
				})
			)
		})
	}

	render() {
		return (
			<div className="user-form">
				<input
					onChange={event => this.onInputChange(event.target.value)}
					type="text"
					placeholder="github username"
					value={this.state.userName}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		busy: state.home.busy,
		history: state.home.history,
	}
}

export default connect(mapStateToProps)(UserForm)
