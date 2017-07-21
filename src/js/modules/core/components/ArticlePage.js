import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetch } from '../actions';
import { Link } from 'react-router-dom'

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

function mapStateToProps (state) {
	articleObject = state.core.entities.articles[0];
    return {
        article: articleObject,
        section: state.core.entities.sections[ articleObject.section ],
	}
}

// Get actions and pass them as props
function matchDispatchToProps (dispatch) {
    return bindActionCreators({fetch: fetch}, dispatch)
} 

// We don't want to return the plain Article (component) anymore, we want to return the smart Container
//      > Article is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(ArticlePage);