import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss';

//look into jss plugins

const styles = {
	ArticleHeader: {
		'border-top': '1px solid #000',
		'border-bottom': '1px solid #dedede',
		'padding': '10px 0px',		
	},
	ArticleHeader__rubric: {
		'color': '#000',
		'font-size': '12px',
		'font-weight': '500',
		'text-transform': 'uppercase',
		'margin-bottom': '20px',
	},
	ArticleHeader__headline: {
		'color': '#000',
		'font-size': '36px',
		'margin-bottom': '20px',		
	},
	ArticleHeader__metaInfo: {
		'font-size': '14px',
		'color': '#000000',
	}
}

const ArticleHeader = ({ classes, children, section, headline, byline, dateline }) => {
	return (
		
		<div className={ classes.ArticleHeader }>
			<Link to={ section.slug } className={ classes.ArticleHeader__rubric }>
				{ section.name }
			</Link>
			<h1 className={ classes.ArticleHeader__headline }>{ headline }</h1>
			<p className={ classes.ArticleHeader__metaInfo }>
				<span>{ byline }</span>
				<span>{ dateline }</span>
			</p>
		</div>
		
	)
}

export default injectSheet(styles)(ArticleHeader);