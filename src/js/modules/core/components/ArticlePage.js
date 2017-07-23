import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

import { fetch } from '../actions';
import { makeGetArticle, makeGetSection } from '../selectors';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';

const styles = {
	ArticlePage: {
		margin: '0 auto',
		width: '1060px',		
	}
}

class ArticlePage extends Component {
	render()
	{
		const { classes } = this.props;

		return (
		    <div className={ classes.ArticlePage }>
		        <ArticleHeader headline={ this.props.article.title } 
			        section={ this.props.section }
			        byline="By Jason Kao"
			        dateline="July 20, 2017"
			    />
			    <ArticleBody content={ this.props.article.content } featured={ this.props.featured }/>
		    </div>
    	);
	}
}

const makeMapStateToProps = () => {
	const getArticle = makeGetArticle();
	const getSection = makeGetSection();
	const mapStateToProps = (state, props) => {
	    return {
	        article: getArticle(state, props),
	        section: getSection(state, props),
	        featured: {
	        	url: 'http://planesandpleasures.com/wp-content/uploads/2016/09/NewYork-Chinatown-7.jpg',
	        	caption: 'New York City street after rain is covered in water, dirt, and snow. Pedestrians walk back and forth as post-flood confusion amasses.',
	        	type: 'Photograph',
	        	credits: 'Mika Simoncelli',
	        }
		}
	}
	return mapStateToProps
}

// Get actions and pass them as props
function matchDispatchToProps (dispatch) {
    return bindActionCreators({fetch: fetch}, dispatch)
} 

// We don't want to return the plain Article (component) anymore, we want to return the smart Container
//      > Article is now aware of state and actions
const VisibleArticlePage = connect(
	makeMapStateToProps, 
	matchDispatchToProps
)( injectSheet(styles)(ArticlePage) );

export default VisibleArticlePage;