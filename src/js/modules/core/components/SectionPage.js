import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSectionArticles } from '../selectors';

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

// BUT WAIT THERE'S A PROBLEM https://github.com/reactjs/reselect#accessing-react-props-in-selectors
function mapStateToProps (state, props) {
    return {
    	articles: getSectionArticles(state, props),
    }
}

function matchDispatchToProps (dispatch) {
    return bindActionCreators({}, dispatch)
} 

export default connect(mapStateToProps, matchDispatchToProps)(SectionPage);