import React from "react";
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

const HomePage = ({ classes, sections, articles, loadAll }) => {
  return (
    <div className={classes.HomePage}>
      <h1>Home page</h1>
      {/* No more loadAll button in feature/homepage-design */}
      <button onClick={loadAll}>load all</button>
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
};

const mapStateToProps = state => ({
  articles: getArticles(state),
  sections: getSections(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loadAll }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  injectSheet(styles)(HomePage),
);
