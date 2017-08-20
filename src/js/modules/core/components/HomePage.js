import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";

import { getArticles } from "../../articles/selectors";
import { getSections } from "../../sections/selectors";

import { fetchArticles } from "../../articles/actions";
import { fetchUsers } from "../../users/actions";
import { fetchMedia } from "../../media/actions";

const styles = {
  HomePage: {}
};

const HomePage = ({
                    classes,
                    sections,
                    articles,
                    fetchArticles,
                    fetchUsers,
                    fetchMedia
                  }) => {
  const createArticleLinks = () => {
    return Object.values(articles).map(article => {
      return (
        <li key={ article.id }>
          <Link to={ `${sections[ article.sectionId ].permalink}/${article.slug}` }>
            { article.title }
          </Link>
        </li>
      );
    });
  };
  return (
    <div className={ classes.HomePage }>
      <h1>Home page</h1>
      <button onClick={ fetchArticles }>fetch articles</button>
      <button onClick={ fetchUsers }>fetch users</button>
      <button onClick={ fetchMedia }>fetch media</button>
      <h2>Articles</h2>
      <ul>
        { createArticleLinks() }
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  articles: getArticles(state),
  sections: getSections(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { fetchArticles, fetchUsers, fetchMedia },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(HomePage));
