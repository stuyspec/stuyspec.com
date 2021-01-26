import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { Row, Col } from 'react-bootstrap/lib';

import Byline from '../../articles/components/Byline';
import Dateline from '../../articles/components/Dateline';

const SECTION_FEATURE_QUERY = gql`
  query SectionFeatureQuery($section_slug: String!) {
    featuredArticlesBySectionSlug(section_slug: $section_slug) {
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
        attachment_url
        medium_attachment_url
        thumb_attachment_url
      }
      section {
        name
        permalink
      }
    }
  }
`;

const styles = {
  SectionFeature: {
    borderTop: "1px solid #ddd",
    paddingTop: "6px",
    paddingBottom: "18px",
  },
  sectionLabel: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "12px",
    marginBottom: "3px",
    textTransform: "uppercase",
    width: "100%",
    "&:hover, &:active, &:focus": {
      color: "#000",
      textDecoration: "none",
    },
  },
  secondaryArticle: {
    paddingLeft: "13px !important",
    paddingRight: "0 !important",
  },
  ternaryArticle: {
    padding: "0 14px 0 13px !important",
    border: "solid 1px #ddd",
    borderStyle: "none solid",
    paddingRight: "13px !important",
  },
  title: {
    color: "#000",
    display: "block",
    fontFamily: "Minion Pro",
    fontSize: "18px",
    fontWeight: "bold",
    lineHeight: 1.25,
    marginBottom: "7px",
    "&:hover, &:active, &:focus": {
      color: "#000",
    },
  },
  preview: {
    fontFamily: "Minion Pro",
    fontSize: "1.1em",
    lineHeight: 1.29,
    margin: "0 0 12px 0",
  },
  figure: {
    maxHeight: "240px",
    overflow: "hidden",
    "& img": {
      width: "100%",
    },
  },
  featuredMediaContainer: {
    borderRight: "solid 1px #ddd",
    paddingLeft: "13px !important",
    paddingRight: "14px",
  },
  mobileArticleTitle1: {
    borderTop: "1px solid #ddd !important",
    marginTop: "14px",
    padding: "12px 7px 8px 0",
    "& a": {
      fontSize: "22px",
      marginBottom: 0,
    },
  },
  mobileArticleTitle2: {
    borderTop: "1px solid #ddd !important",
    padding: "12px 7px 2px 0",
    "& a": {
      fontSize: "22px",
      marginBottom: 0,
    },
  },
  "@media (max-width: 767px)": {
    SectionFeature: {
      borderBottom: "1px solid #ddd",
      paddingBottom: "6px",
    },
    ternaryArticle: {
      borderLeft: 0,
      marginBottom: 0,
      padding: "0px 13px 0px 0px !important",
    },
    secondaryArticle: {
      paddingLeft: "13px !important",
    },
    featuredMediaContainer: {
      borderRight: 0,
      paddingLeft: "0 !important",
      paddingRight: 0,
    },
  },
};

const useStyles = createUseStyles(styles);

interface IProps {
  slug: string
}

const SectionFeature: React.FC<IProps> = ({ slug }) => {
  const classes: any = useStyles();

  const result = useQuery(SECTION_FEATURE_QUERY, {
    variables: { section_slug: slug }
  })

  if (result.loading || !result.data) {
    return null;
  }

  const [
    primaryArticle,
    secondaryArticle,
    ternaryArticle,
  ] = result.data.featuredArticlesBySectionSlug;
  const featuredMedia = primaryArticle.media[0];
  const { section } = primaryArticle;
  return (
    <Row className={classes.SectionFeature}>
      <Link to={section.permalink} className={classes.sectionLabel}>
        {section.name}
      </Link>

      <Col xs={6} sm={4} md={4} lg={4} className={classes.primaryArticle}>
        <Link
          className={classes.title}
          to={`${section.permalink}/${primaryArticle.slug}`}
        >
          {primaryArticle.title}
        </Link>
        <p className={classes.preview}>{primaryArticle.preview}</p>
        <Byline contributors={primaryArticle.contributors} />
        <Dateline timestamp={primaryArticle.created_at} />
      </Col>

      {featuredMedia ? (
        <Col
          xs={6}
          sm={4}
          md={4}
          lg={4}
          className={classes.featuredMediaContainer}
        >
          <Link to={`${section.permalink}/${primaryArticle.slug}`}>
            <figure className={classes.figure}>
              <img
                src={featuredMedia.medium_attachment_url}
                alt={featuredMedia.title}
              />
            </figure>
          </Link>
        </Col>
      ) : (
        ternaryArticle && (
          <Col xs={6} sm={4} md={4} lg={4} className={classes.ternaryArticle}>
            <Link
              className={classes.title}
              to={`${section.permalink}/${ternaryArticle.slug}`}
            >
              {ternaryArticle.title}
            </Link>
            <p className={classes.preview}>{ternaryArticle.preview}</p>
            <Byline contributors={ternaryArticle.contributors} />
            <Dateline timestamp={ternaryArticle.created_at} />
          </Col>
        )
      )}

      <Col xsHidden sm={4} md={4} lg={4} className={classes.secondaryArticle}>
        <Link
          className={classes.title}
          to={`${section.permalink}/${secondaryArticle.slug}`}
        >
          {secondaryArticle.title}
        </Link>
        <p className={classes.preview}>{secondaryArticle.preview}</p>
        <Byline contributors={secondaryArticle.contributors} />
        <Dateline timestamp={secondaryArticle.created_at} />
      </Col>

      <Col
        xs={12}
        smHidden
        mdHidden
        lgHidden
        className={classes.mobileArticleTitle1}
      >
        <Link
          className={classes.title}
          to={`${section.permalink}/${secondaryArticle.slug}`}
        >
          {secondaryArticle.title}
        </Link>
      </Col>

      {featuredMedia &&
      ternaryArticle && (
        <Col
          xs={12}
          smHidden
          mdHidden
          lgHidden
          className={classes.mobileArticleTitle2}
        >
          <Link
            className={classes.title}
            to={`${section.permalink}/${ternaryArticle.slug}`}
          >
            {ternaryArticle.title}
          </Link>
        </Col>
      )}
    </Row>
  );
};

export default SectionFeature;
