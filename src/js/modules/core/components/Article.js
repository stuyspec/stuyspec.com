import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetch } from '../actions';
import { getArticle } from '../selectors';
import { Link } from 'react-router-dom'

import ArticleHeader from 'ArticleHeader';

class Article extends Component {
	render() {
		return (
	    <div>
	        <h2 onClick={() => this.props.fetch()}>
   	            Click Me for an async joke
	        </h2>
	        { this.props.article.joke }
	        <ArticleHeader />
	    </div>
    	);
	}
}

function mapStateToProps (state) {
	console.log(state)
    return {
        article: getArticle(state)
	}
}

// Get actions and pass them as props
function matchDispatchToProps (dispatch) {
    return bindActionCreators({fetch: fetch}, dispatch)
} 

// We don't want to return the plain Article (component) anymore, we want to return the smart Container
//      > Article is now aware of state and actions
export default connect(mapStateToProps, matchDispatchToProps)(Article);