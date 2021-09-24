import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";

import {
  FeaturedArticle,
  RecommendedArticles,
  LatestArticlesRibbon,
  LeftColumn,
  RightColumn,
} from "../../articles/components/summaries";
import { SectionFeature, SectionColumn } from "../../sections/components";

const HomePageQuery = gql`
  query HomePageQuery {
    featuredArticle {
      title
      slug
      preview
      created_at
      contributors {
        first_name
        last_name
        slug
      }
      media {
        title
        media_type
        attachment_url
        medium_attachment_url
        thumb_attachment_url
      }
      section {
        name
        permalink
      }
    }
    columnArticles {
      title
      slug
      preview
      created_at
      contributors {
        first_name
        last_name
        slug
      }
      media {
        attachment_url
      }
      section {
        name
        permalink
      }
    }
  }
`;

const styles = {
  HomePage: {
    margin: "23px 0px 13px",
  },
  recommendedArticles: {
    padding: 0,
  },
  primaryComponents: {
    borderRight: "solid 1px #ddd",
    marginBottom: "19px",
    paddingRight: "14px",
  },
  "@media (max-width: 991px)": {
    primaryComponents: {
      borderRight: "none",
      paddingRight: 0,
    }
  },
  "@media (max-width: 767px)": {
    skinnyCol: {
      padding: "0 !important",
    },
  },
  adbanner: {
    fontFamily: "Circular Std",
    marginTop: "0%",
    margin: "auto",
  },
  "@media screen and (min-width: 769px)": {
    adbanner: {
      display: "none",
    },
  },
};

const HomePage = ({ classes, data }) => {
  if (data.loading) {
    return null;
  }
  const { featuredArticle, columnArticles } = data;

  const firstColumnSectionSlugs = ["opinions", "features", "humor"];
  const secondColumnSectionSlugs = [
    "staff-editorials",
    "ae",
    "sports-at-stuyvesant",
  ];
  return (
    <div>
      <Grid fluid>
        <Row>
          <center>
            <div className={classes.adbanner}>
              <h1 className="col-md-12 container-fluid">
                Check out the promotions on the bottom of the page!
              </h1>
            </div>
          </center>
          <Col
            xs={12}
            sm={12}
            md={9}
            lg={9}
            className={classes.primaryComponents}
          >
            <FeaturedArticle article={featuredArticle} />
            <SectionFeature slug={"news"} />
          </Col>
          <Col
            xsHidden
            smHidden
            md={3}
            lg={3}
            className={classes.recommendedArticles}
          >
            <RecommendedArticles />
          </Col>
        </Row>
        <Row>
          <Col xsHidden sm={12} md={12} lg={12}>
            <LatestArticlesRibbon className={classes.latestArticlesRibbon} />
          </Col>
        </Row>
        <Row>
          <LeftColumn articles={columnArticles.slice(0, 3)} />
          <Col xs={12} sm={3} md={3} lg={3} className={classes.skinnyCol}>
            <SectionColumn slugs={firstColumnSectionSlugs} />
          </Col>
          <Col xs={12} sm={3} md={3} lg={3} className={classes.skinnyCol}>
            <SectionColumn slugs={secondColumnSectionSlugs} />
          </Col>
          <RightColumn articles={columnArticles.slice(3)} />
        </Row>
      </Grid>
    </div>
  );
};

export default graphql(HomePageQuery)(injectSheet(styles)(HomePage));
