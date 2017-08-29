import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getArticles } from "../../articles/selectors";
import { getSections } from "../../sections/selectors";
import { loadAll } from "../actions";

const styles = {
  HomePage: {},
};

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadAll();
  }

  render() {
    const { classes, sections, articles, loaded } = this.props;
    if (loaded) {
      return (
        <div className={classes.HomePage}>
          <h1>Home page</h1>
          {/* No more article list in feature/homepage-design */}
          <h2>Articles</h2>
          <ul>
            {Object.values(articles).map(article => {
              const section = sections[article.sectionId];
              return (
                <li key={article.id}>
                  <Link to={`${section.permalink}/${article.slug}`}>
                    {article.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return <p>loading...</p>;
    }
  }
}

const mapStateToProps = state => ({
  articles: getArticles(state),
  sections: getSections(state),
  loaded:
    state.articles.isFetched &&
    state.comments.isFetched &&
    state.media.isFetched &&
    state.sections.isFetched &&
    state.users.isFetched,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loadAll }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(HomePage),
);
