import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss';
import SectionPage from './SectionPage';

//look into jss plugins

const styles = {
	SectionHeader: {
		borderTop: '1px solid #000',
		borderBottom: '1px solid #dedede',
		marginBottom: '20px',
		padding: '12px 0px',	
	},
	SectionHeader__rubric: {
		color: '#000',
		display: 'block',
		fontFamily: 'Minion Pro',
		fontSize: '40px',
		fontWeight: 500,
		marginBottom: '18px',
		textDecoration: 'none',
		textTransform: 'uppercase',
	},
	SectionHeader__description: {
		color: 'gray',
		fontFamily: 'Minion Pro',
		fontSize: '20px',
		fontWeight: 'normal',
		marginTop: '0px',	
		marginBottom: '15px',	
	},
}

const SectionHeader = ({ classes, section, description}) => {
	return (
		<div className={ classes.SectionHeader }>
			<Link to={ section.slug } className={ classes.SectionHeader__rubric }>
				{ section.name }
			</Link>
			<h1 className={ classes.SectionHeader__description }>{ section.description }</h1>
		</div>
		
	)
}

export default injectSheet(styles)(SectionHeader);