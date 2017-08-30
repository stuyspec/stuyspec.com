import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getArticles } from "../../articles/selectors";
import { getSections } from "../../sections/selectors";

const styles = {
  HomePage: {},
};

const HomePage = ({ classes, sections, articles }) => {
  return (
    <div className={classes.HomePage}>
      <h1>Home page</h1>
      <Link to="/recommended">Recommended</Link>
      <Link to="/latest">Latest</Link>
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
};

const mapStateToProps = state => ({
  articles: getArticles(state),
  sections: getSections(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(HomePage));
