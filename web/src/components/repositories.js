import React, { Component } from "react"
import { connect } from "react-redux"

const Repo = props => (
	<div className="repo-row">
		<div className="repo-cell">
			<a className="name" href={props.url}>
				{props.id}
			</a>
		</div>
		<div className="stars repo-cell">{props.name}</div>
		<div className="stars repo-cell">{props.owner}</div>
		<div className="stars repo-cell">{props.stargazers_count}</div>
		<div className="stars repo-cell">{new Date(props.created_at).toDateString()}</div>
		<div className="clear" />
	</div>
)

class Repositories extends Component {
	constructor() {
		super()

		this.pageSizeOptions = [5, 10, 15, 20, 25, 50, 100]

		this.state = {
			currentPage: 1,
			pageSize: 5,
			columnKey: "stargazers_count",
		}

		this.onPageClick = this.onPageClick.bind(this)
		this.onPageSizeChange = this.onPageSizeChange.bind(this)
		this.sortByID = this.columnHander.bind(this, "id")
		this.sortByRepoTitle = this.columnHander.bind(this, "name")
		this.sortByOwner = this.columnHander.bind(this, "owner")
		this.sortByStars = this.columnHander.bind(this, "stargazers_count")
		this.sortByCreatedAt = this.columnHander.bind(this, "created_at")
		this.setAsec = this.setAsec.bind(this)
		this.setDesc = this.setDesc.bind(this)

		this.columns = [
			{
				name: "ID",
				key: "id",
				handler: this.sortByID,
			},
			{
				name: "Repo Title",
				key: "name",
				handler: this.sortByRepoTitle,
			},
			{
				name: "Owner",
				key: "owner",
				handler: this.sortByOwner,
			},
			{
				name: "Stars",
				key: "stargazers_count",
				handler: this.sortByStars,
			},
			{
				name: "Created At",
				key: "created_at",
				handler: this.sortByCreatedAt,
			},
		]
	}

	setAsec() {
		const { columnKey } = this.state

		this.setState({
			[columnKey]: true,
		})
	}

	setDesc() {
		const { columnKey } = this.state

		this.setState({
			[columnKey]: false,
		})
	}

	columnHander(columnKey) {
		this.setState({
			columnKey,
		})
	}

	onPageSizeChange(event) {
		this.setState({
			pageSize: +event.target.value,
		})
	}

	onPageClick(event) {
		event.persist()
		const currentPage = event.currentTarget.getAttribute("data-index")
		this.setState({
			currentPage: +currentPage,
		})
	}

	calculateMinMax() {
		const { currentPage } = this.state
		const { pageSize } = this.state

		const minIndex = (currentPage - 1) * pageSize,
			maxIndex = minIndex + pageSize

		return { minIndex, maxIndex }
	}

	sortResult(repos, key) {
		const asec = this.state[key]

		switch (key) {
		case "id":
		case "stargazers_count":
			return repos.sort((a, b) => (asec ? b[key] - a[key] : a[key] - b[key]))
		case "name":
			return repos.sort((a, b) => {
				let x = a[key].toLowerCase()
				let y = b[key].toLowerCase()

				if (!asec) {
					const temp = x
					x = y
					y = temp
				}

				const result = x < y ? -1 : 1

				return x === y ? 0 : result
			})
		case "created_at":
			return repos.sort((a, b) => {
				let x = new Date(a[key]).getTime()
				let y = new Date(b[key]).getTime()

				if (!asec) {
					const temp = x
					x = y
					y = temp
				}

				const result = x < y ? -1 : 1

				return x === y ? 0 : result
			})
		default:
			return repos
		}
	}

	renderTable() {
		const { repoDetail } = this.props
		const { columnKey } = this.state
		const { minIndex, maxIndex } = this.calculateMinMax()

		if (repoDetail.repos) {
			const sortedResult = this.sortResult(repoDetail.repos, columnKey)
			return sortedResult
				.slice(minIndex, maxIndex)
				.map((repo, index) => (
					<Repo
						key={repo.id}
						id={repo.id}
						name={repo.name}
						stargazers_count={repo.stargazers_count}
						url={repo.url}
						created_at={repo.created_at}
						owner={repo.owner.login}
					/>
				))
		} else {
			return null
		}
	}

	renderControlBar() {
		const maxPage = this.getMaxPages(),
			{ currentPage } = this.state

		return (
			<div className="pagination">
				{Array(maxPage)
					.join("|")
					.split("|")
					.map((item, index) => {
						const selectedPageClass = index + 1 === currentPage ? "selected" : ""
						return (
							<span
								className={`page-index ${selectedPageClass}`}
								data-index={index + 1}
								onClick={this.onPageClick}
							>
								{index + 1}
							</span>
						)
					})}
			</div>
		)
	}

	getMaxPages() {
		const { repos } = this.props.repoDetail,
			{ pageSize } = this.state
		if (repos && repos.length) {
			// repos.length % pageSize && 1
			// If repo count is exactly divisble by page size , no need to add page
			return parseInt(repos.length / pageSize) + (repos.length % pageSize && 1)
		} else {
			return 0
		}
	}

	renderPageSizeDropDown() {
		return (
			<div>
				<span>Number Of Entries per Page : </span>
				<select className="select-option" onChange={this.onPageSizeChange}>
					{this.pageSizeOptions.map(option => {
						return <option value={option}>{option}</option>
					})}
				</select>
			</div>
		)
	}

	renderHeader() {
		return (
			<div className="repo-row">
				{this.columns.map(column => {
					return (
						<div className="repo-cell" onClick={column.handler}>
							{column.name}
							<div className="arrow-container">
								<div className="asec" onClick={this.setDesc} />
								<div className="desc" onClick={this.setAsec} />
							</div>
						</div>
					)
				})}
			</div>
		)
	}

	render() {
		return (
			<div className="section repositories repo-table">
				{this.renderPageSizeDropDown()}
				{this.renderHeader()}
				{this.renderTable()}
				{this.renderControlBar()}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		repoDetail: state.home.repoDetails || {},
	}
}

export default connect(mapStateToProps)(Repositories)
