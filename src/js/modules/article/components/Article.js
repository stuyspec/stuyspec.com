import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetch } from '../actions';
import { getArticle } from '../selectors';

class Article extends Component {

  render() {
    return (
      <div>
        <h2 onClick={() => this.props.fetch()}>
          Click Me for an async joke
        </h2>
        { this.props.article.joke }
      </div>
    );
  }
}

// takes a part of state and passes it into props
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