import React from "react";
import { connect } from "react-redux";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import humps from "humps";

import { ArticleList } from "../../articles/components";
import { NotFoundPage } from "../../core/components";

const PhotographerBySlug = gql`
  query PhoographerPageQuery($slug: String!) {
    userBySlug(slug: $slug) {
      first_name
      last_name
      email
      description
      media {
        article {
          id
          slug
          title
          summary
          contributors {
            slug
            first_name
            last_name
          }
          section {
            permalink
          }
          media {
            media_type
            title
            attachment_url
          }
        }
      }
    }
  }
`;

const styles = {
  PhotographerPage: {
    marginTop: "100px",
  },
  name: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "48px",
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: "11px",
  },
  email: {
    color: "#3084df",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "17px",
    marginBottom: "7px",
  },
  latest: {
    borderTop: "1px solid #000",
    borderBottom: "1px solid #ddd",
    borderStyle: "solid none",
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "13px",
    fontWeight: "300",
    marginBottom: "22px",
    padding: "4px 0px",
  },
  description: {
    fontFamily: "Minion Pro",
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "26px",
  },
  "@media (max-width: 1199px) and (min-width: 992px)": {
    PhotographerPage: {
      paddingLeft: "10%",
    },
  },
};

const PhotographerPage = ({ classes, data }) => {
  data = humps.camelizeKeys(data);
  if (data.loading) return null;

  const photographer = data.userBySlug;
  if (photographer === null) {
    return <NotFoundPage />;
  }
  console.log(data);
  const articles = photographer.media.articles.map(medium => medium.article);
  return (
    <Grid className={classes.PhotographerPage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>{`${photographer.firstName} ${photographer.lastName}`}</title>
        <meta />
      </Helmet>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9}>
          <p className={classes.name}>
            {`${photographer.firstName} ${photographer.lastName}`}
          </p>
          <a href={`mailto:${photographer.email}`} className={classes.email}>
            {photographer.email}
          </a>
          <p className={classes.description}>{photographer.description}</p>
          <div className={classes.latest}>Photos</div>
          <ArticleList articles={photographer.articles} />
        </Col>
      </Row>
    </Grid>
  );
};

export default graphql(PhotographerBySlug, {
  options: ({ match }) => ({
    variables: { slug: match.params.photographer_slug },
  }),
})(withRouter(injectSheet(styles)(PhotographerPage)));
