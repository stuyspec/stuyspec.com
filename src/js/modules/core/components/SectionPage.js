import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

import { getArticlesWithinSection } from '../selectors';

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
				<h1>{ this.props.section.name }</h1>
				<p>description: { this.props.section.description }</p>				
				<hr/>
				<p>articles</p>
				<ul>
					{ this.createArticleListItems( this.props.match.url ) }
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
   	articles: getArticlesWithinSection(state, ownProps),
   	section: ownProps.section,
});

const matchDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
} 

export default connect(mapStateToProps, matchDispatchToProps)(SectionPage);