import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetch } from '../actions';
import { getCondensedArticles } from '../selectors';

class HomePage extends Component {
	createSectionListItems() {
		sections = this.props.sections;
		return Object.keys(sections).map(function(key, index) {
		   return (
				<li key={ sections[key].id }>
					<Link to={ sections[key].slug }>{ sections[key].name }</Link>
				</li>
			)
		});
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

const mapStateToProps = (state, ownProps) => ({
    articles: getCondensedArticles(state),
    sections: state.core.entities.sections,
});

// Get actions and pass them as props
const matchDispatchToProps = dispatch => {
    return bindActionCreators({fetch: fetch}, dispatch)
} 

export default connect(mapStateToProps, matchDispatchToProps)(HomePage);