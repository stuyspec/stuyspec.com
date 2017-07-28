import React, { Component } from 'react';
import injectSheet from 'react-jss';
import SectionHeader from './SectionHeader';
import SectionPage from './SectionPage';

const styles = {
	SectionBody: {
		color: '#000',
		fontFamily: 'Minion Pro',
		fontSize: '18px',		
		lineHeight: 1.44,
		width: '700px',
		'& p:first-child::first-letter': {
			float: 'left',
			fontSize: '58px',
			lineHeight: '43px',
			padding: '7px 6px 0px 3px',
		},
	},
	Figure: {
		margin: '0px 0px 13px 0px',
		width: '100%',
	},
	Figure__image: {
		width: '100%',
	},
}

const SectionBody = ({ classes, children, content, featured }) => {
	return(
		<div className={ classes.SectionBody }>
			<figure className={ classes.Figure }>
				<img className={ classes.Figure__image} src={ featured.url }/>
				<figcaption className={ classes.Figure__caption}>
				</figcaption>
			</figure>
			<div dangerouslySetInnerHTML={{ __html: content }}>
			</div>
		</div>
	)
}

export default injectSheet(styles)(SectionBody);