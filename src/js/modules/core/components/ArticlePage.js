import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { fetch } from '../actions';
import { makeGetArticle } from '../selectors';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';

class ArticlePage extends Component {
	render() {
		return (
	    <div >
	        <ArticleHeader headline={ this.props.article.title } 
		        section={ this.props.section }
		        byline="By Jason Kao"
		        dateline="July 20, 2017"
		    />
		    <ArticleBody content={ this.props.article.content }/>
	    </div>
    	);
	}
}

const makeMapStateToProps = () => {
	const getArticle = makeGetArticle();
	const mapStateToProps = (state, props) => {
		article = getArticle(state, props);
	    return {
	        article: article,
	        section: state.core.entities.sections[ article.section ],
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
export default connect(makeMapStateToProps, matchDispatchToProps)(ArticlePage);