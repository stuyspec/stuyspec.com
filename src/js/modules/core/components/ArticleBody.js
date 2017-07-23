import React, { Component } from 'react';
import injectSheet from 'react-jss';

const styles = {
	ArticleBody: {
		'color': '#000',
		'font-size': '18px',
		lineHeight: 1.44,
		'width': '700px',
	}
}

const ArticleBody = ({ classes, children, content }) => {
	return(
		<div className={ classes.ArticleBody }
			dangerouslySetInnerHTML={{ __html: content }}>
		</div>
	)
}

export default injectSheet(styles)(ArticleBody);