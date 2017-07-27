import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';

import { getArticlesWithinSection } from '../selectors';

const styles = {
}

const SectionPage = ({ classes, articles, section, match }) => {
	const createArticleListItems = (url) => {
		return Object.keys(articles).map(function(key, index) {
		   return (
				<li key={ articles[key].id }>
					<Link to={ url + '/' + articles[key].slug }>{ articles[key].title }</Link>
				</li>
			)
		});
	}
	return (
		<div>
			<h1>{ section.name }</h1>
			<p>description: { section.description }</p>				
			<hr/>
			<p>articles</p>
			<ul>
				{ createArticleListItems( match.url ) }
			</ul>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => ({
   	articles: getArticlesWithinSection(state, ownProps),
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch)
} 

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)( injectSheet(styles)(SectionPage) );