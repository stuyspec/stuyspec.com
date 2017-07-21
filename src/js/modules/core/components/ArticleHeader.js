import React, { Component } from 'react';

class ArticleHeader extends Component {
	render() {
		return (
			<div>
				<p>{ this.props.section.name }</p>
				<h1>{ this.props.headline }</h1>
				<p>{ this.props.byline }</p>
				<p>{ this.props.dateline }</p>
			</div>
		)
	}
}

export default ArticleHeader;