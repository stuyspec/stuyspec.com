import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetch } from '../actions';
import { getHomeArticles } from '../selectors';

class HomePage extends Component {
	createSectionListItems() {
		sections = this.props.sections;
		const links = Object.keys(sections).map(function(key, index) {
		   return (
				<li key={ sections[key].id }>
					<Link to={ sections[key].slug }>{ sections[key].name }</Link>
				</li>
			)
		});
		return links;
	}
	render() {
		return (
			<div>
				<h1>Home page</h1>
				<ul>
					{ this.createSectionListItems() }
				</ul>
			</div>
		)
	}
}

function mapStateToProps (state) {
    return {
        articles: getHomeArticles(state),
        sections: state.core.entities.sections,
    }
}

// Get actions and pass them as props
function matchDispatchToProps (dispatch) {
    return bindActionCreators({fetch: fetch}, dispatch)
} 

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);