import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import injectSheet from 'react-jss'

import { fetch } from '../actions';
import { makeGetArticle, makeGetSection } from '../selectors';
import ArticleHeader from './ArticleHeader';
import ArticleBody from './ArticleBody';

const styles = {
  button: {
    color: 'red'
  }
}

// see https://stackoverflow.com/questions/39766694/2-different-ways-to-create-react-component
class ArticlePage extends Component {
	render() {
		return (
	    <div>
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
	const getSection = makeGetSection();
	const mapStateToProps = (state, props) => {
	    return {
	        article: getArticle(state, props),
	        section: getSection(state, props)
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