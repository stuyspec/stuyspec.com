import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { Helmet } from 'react-helmet';

import { ArticleFeed } from '../../articles/components';
import { SubsectionPage, SectionColumn, SectionFeature } from './';
import {
  LeftTitleArticle,
  RightTitleArticle,
} from '../../articles/components/summaries';
import { TallAd } from '../../advertisements/components/index';

const SECTION_PAGE_QUERY = gql`
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
        id
        name
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
      media {
        title
        media_type
        attachment_url
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

interface IVariables {
  section_id: string
}

interface IData {
  featuredSubsection?: {
    name: string,
    slug: string,
    permalink: string
  },
  topRankedArticles?: Array<{
    id: string,
    title: string,
    slug: string,
    preview?: string,
    created_at?: string,
    section: {
      id: string,
      name: string,
      permalink: string,
      parent_section?: {
        id: string
      }
    },
    contributors?: Array<{
      first_name?: string,
      last_name?: string,
      slug: string
    }>,
    media?: Array<{
      title: string,
      media_type: string,
      attachment_url: string
    } | undefined>,
  }>,
  sectionsByParentSectionID: Array<ISubsection | undefined>
}

interface ISubsection {
  id: string,
  name: string,
  slug: string,
  permalink: string
}

// TODO: STYLE SECONDARY ARTICLE. consider setting a max height

const styles = {
  sectionTitle: {
    color: "#000",
    fontFamily: "Canela",
    fontSize: "60px",
    fontWeight: 300,
    lineHeight: 1.2,
    marginBottom: "12px",
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
    marginTop: "29px",
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
      width: "41.666666%",
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

const useStyles = createUseStyles(styles);

interface IProps {
  section: {
    id: string,
    name: string,
  }
}

const SectionPage: React.FC<IProps> = ({ section }) => {
  const classes: any = useStyles();

  const result = useQuery<IData, IVariables>(SECTION_PAGE_QUERY, {
    variables: { section_id: section.id }
  });

  if (result.loading) {
    return null;
  }

  else if (result.error || !result.data) {
    console.error("SectionPage query failed.");
    return null;
  }

  const data = result.data;

  const { topRankedArticles, featuredSubsection } = data;
  const [featuredArticle, secondaryArticle] = topRankedArticles ?? [null, null];

  if (!featuredSubsection) {
    return <SubsectionPage section={section} />;
  }

  const subsections = data.sectionsByParentSectionID.filter(s => s) as ISubsection[];

  //stops TS from complaining
  //TODO: add types to ArticleFeed
  const UntypedArticleFeed: React.ComponentType<any> = ArticleFeed;

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
              .sort((a, b) => a!.name.localeCompare(b!.name))
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
              <SectionFeature slug={featuredSubsection.slug} />
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
          <UntypedArticleFeed section={section} />
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

export default SectionPage;
