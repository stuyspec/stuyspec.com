import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeGetSectionArticles } from '../selectors';

class SectionPage extends Component {

	createArticleListItems(url) {
		articles = this.props.articles;
		return Object.keys(articles).map(function(key, index) {
		   return (
				<li key={ articles[key].id }>
					<Link to={ url + '/' + articles[key].slug }>{ articles[key].title }</Link>
				</li>
			)
		});
	}
	
	render() {
		return (
			<div>
				<h1>{ this.props.match.params.section }</h1>
				<ul>
					{ this.createArticleListItems( this.props.match.url ) }
				</ul>
			</div>
		)
	}
}

const makeMapStateToProps = () => {
	const getSectionArticles = makeGetSectionArticles();
	const mapStateToProps = (state, props) => {
	    return {
	    	articles: getSectionArticles(state, props),
	    }
	}
	return mapStateToProps
}

function matchDispatchToProps (dispatch) {
    return bindActionCreators({}, dispatch)
} 

export default connect(makeMapStateToProps, matchDispatchToProps)(SectionPage);