import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ArticleHeader extends Component {
	render() {
		return (
			<div>
				<Link to={ this.props.section.slug }>
					{ this.props.section.name }
				</Link>
				<h1>{ this.props.headline }</h1>
				<p>
					<span>{ this.props.byline }</span>
					<span>{ this.props.dateline }</span>
				</p>
			</div>
		)
	}
}

export default ArticleHeader;