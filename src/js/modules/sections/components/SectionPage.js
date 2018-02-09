import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Grid, Row, Col } from "react-bootstrap/lib";
import humps from "humps";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Helmet } from "react-helmet";

import { ArticleList } from "../../articles/components";
import { SubsectionPage, SectionColumn, SectionFeature } from "./";
import {
  LeftTitleArticle,
  RightTitleArticle,
} from "../../articles/components/summaries";
import { TallAd } from "../../advertisements/components/index";

// TODO: STYLE SECONDARY ARTICLE. consider setting a max height

const SectionPageQuery = gql`
  query SectionPageQuery($section_id: ID!) {
    featuredSubsection(section_id: $section_id) {
      name
      slug
      permalink
    }
    topRankedArticles(section_id: $section_id, limit: 2, has_media: true) {
      id
      title
      slug
      preview
      created_at
      section {
        permalink
        parent_section {
          id
        }
      }
      contributors {
        first_name
        last_name
        slug
      }
      section {
        id
        name
        permalink
      }
      media {
        title
        media_type
        attachment_url
      }
    }
    latestArticles(section_id: $section_id, limit: 10) {
      id
      title
      slug
      preview
      created_at
      section {
        id
        permalink
      }
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
    }
    sectionsByParentSectionID(section_id: $section_id) {
      id
      name
      slug
      permalink
    }
  }
`;

const styles = {
  sectionTitle: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "60px",
    fontWeight: 300,
    lineHeight: 1,
    marginBottom: "7px",
    textAlign: "center",
  },
  subsectionBar: {
    margin: "0 0 35px 0",
    paddingLeft: 0,
    textAlign: "center",
  },
  secondaryRow: {
    marginBottom: "18px",
    borderBottom: "1px solid #ddd",
    paddingBottom: "18px",
  },
  secondaryCol: {
    paddingRight: "0 !important",
  },
  SectionFeatureContainer: {
    borderBottom: "1px solid #ddd",
    marginBottom: "18px",
    marginRight: "14px",
    "& div": {
      borderTop: "none",
    },
  },
  TallAdContainer: {
    borderLeft: "1px solid #ddd",
    marginTop: "57px",
    paddingLeft: "14px !important",
    paddingRight: "0 !important",
  },
  subsectionListItem: {
    display: "inline-block",
    marginBottom: "5px",
    textDecoration: "none",
    padding: "0 26px 0px 0",
    "&:last-child": {
      paddingRight: 0,
    },
  },
  subsectionLink: {
    color: "#000",
    fontFamily: "Circular Std",
    fontSize: "14px",
    fontWeight: 300,
    "&:hover, &:active, &:focus": {
      color: "#000",
      textDecoration: "none",
    },
  },
  latestArticles: {
    borderRight: "solid 1px #ddd",
    marginTop: "8px",
    padding: "0 13px 0 0",
    "& > div:last-child": {
      // articleBlocks
      border: "none",
      margin: 0,
    },
  },
  sectionColumnContainer: {
    "& > div": {
      borderLeft: "none",
    },
  },
  SubsectionPage: {
    "& div > div": {
      borderRight: 0,
    },
  },
  "@media (min-width: 992px)": {
    SectionFeatureContainer: {
      marginRight: "14px !important",
    },
  },
  "@media (min-width: 768px)": {
    SectionFeatureContainer: {
      marginRight: 0,
    },
  },
  "@media (max-width: 991px)": {
    featuredArticle: {
      marginLeft: 0,
      paddingTop: "3vw",
      width: "41.666666%", // col-sm-5
    },
    featuredArticleSummary: {
      margin: "0 auto 18px auto",
      width: "80%",
    },
  },
  "@media (max-width: 767px)": {
    latestArticles: {
      borderRight: "none",
      paddingRight: 0,
    },
    featuredMedia: {
      paddingRight: "0 !important",
      "& figure": {
        maxHeight: "50vh",
      },
      "& figure img": {
        marginLeft: "-14px",
        width: "100vw",
      },
    },
    featuredArticle: {
      padding: "14px 0 0 0 !important",
      width: "100%",
    },
    featuredArticleTitle: {
      fontSize: "30px",
      lineHeight: "36px",
    },
    SectionFeatureContainer: {
      borderBottom: 0,
      borderRight: 0,
      marginRight: "0 !important",
    },
  },
};

// const SectionPage = ({ classes, data, section }) => {
const SectionPage = ({ data, classes, section }) => {
  // let { data, classes, section } = props;
  if (data.loading) {
    return null;
  }

  data = humps.camelizeKeys(data);
  const { latestArticles, topRankedArticles, featuredSubsection } = data;
  const [featuredArticle, secondaryArticle] = topRankedArticles;

  if (!featuredSubsection) {
    return <SubsectionPage section={section} latestArticles={latestArticles} />;
  }

  const subsections = data.sectionsByParentSectionID;

  return (
    <Grid fluid className={classes.SectionPage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>{section.name}</title>
        <meta />
      </Helmet>
      <div className={classes.sectionTitle}>{section.name}</div>
      <ul className={classes.subsectionBar}>
        {section.name === "10/31 Terror Attack" ? (
          <li className={classes.subsectionListItem}>
            <Link
              className={classes.subsectionLink}
              to={featuredSubsection.permalink}
            >
              {featuredSubsection.name}
            </Link>
          </li>
        ) : (
          subsections
            .sort((a, b) => a["name"].localeCompare(b["name"]))
            .map(subsection => {
              return (
                <li className={classes.subsectionListItem} key={subsection.id}>
                  <Link
                    className={classes.subsectionLink}
                    to={subsection.permalink}
                  >
                    {subsection.name}
                  </Link>
                </li>
              );
            })
        )}
      </ul>
      <RightTitleArticle article={featuredArticle} />
      <Row className={classes.secondaryRow}>
        <Col xs={12} sm={12} md={9} lg={9} className={classes.secondaryCol}>
          {featuredSubsection && (
            <div className={classes.SectionFeatureContainer}>
              <SectionFeature section_slug={featuredSubsection.slug} />
            </div>
          )}
          <LeftTitleArticle article={secondaryArticle} />
        </Col>
        <Col
          xsHidden
          smHidden
          md={3}
          lg={3}
          className={classes.TallAdContainer}
        >
          <TallAd />
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={9} md={9} lg={9} className={classes.latestArticles}>
          <ArticleList
            articles={latestArticles}
            title="Latest"
            label="Latest"
          />
        </Col>
        <Col xsHidden sm={3} md={3} lg={3}>
          <div className={classes.sectionColumnContainer}>
            <SectionColumn slugs={subsections.map(s => s.slug)} />
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default graphql(SectionPageQuery, {
  options: ({ section }) => ({ 
    variables: {
     section_id: section.id,
   }
  }),
})(injectSheet(styles)(SectionPage));
