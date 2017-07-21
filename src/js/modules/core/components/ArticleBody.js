import React, { Component } from 'react';

class ArticleBody extends Component {
	render() {
		return (
			<div dangerouslySetInnerHTML={{ __html: this.props.content }}>
			</div>
		)
	}
}

export default ArticleBody;