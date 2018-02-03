import React from "react";
import injectSheet from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Helmet } from "react-helmet";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import humps from "humps";

import { ArticleList } from "../../articles/components";
import { NotFoundPage } from "../../core/components";
import { MEDIA_CREATOR_SLUGS } from "../../../constants";

const ArtistProfileBySlug = gql`
  query ArtistProfileBySlug($user_slug: String!, $role_slug: String!) {
    profileByUserSlug(user_slug: $user_slug, role_slug: $role_slug) {
      user {
        first_name
        last_name
        email
        description
      }
      media {
        media_type
        title
        attachment_url
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
            id
            permalink
          }
        }
      }
    }
  }
`;

const styles = {
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
    ArtistPage: {
      paddingLeft: "10%",
    },
  },
};

const ArtistPage = ({ classes, data, match }) => {
  data = humps.camelizeKeys(data);
  if (data.loading) {
    return null;
  }

  if (!data.profileByUserSlug) {
    return <NotFoundPage />;
  }

  const artist = data.profileByUserSlug.user;

  const mediaType = MEDIA_CREATOR_SLUGS[match.path.split("/")[1]];
  const articles = data.profileByUserSlug.media
    .filter(medium => medium.mediaType === mediaType)
    .map(medium => ({
      ...medium.article,
      media: [
        {
          mediaType: medium.mediaType,
          title: medium.title,
          attachmentUrl: medium.attachmentUrl,
        },
      ],
    }));
  return (
    <Grid className={classes.ArtistPage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>{`${artist.firstName} ${artist.lastName}`}</title>
        <meta />
      </Helmet>
      <Row>
        <Col xs={12} sm={12} md={9} lg={9}>
          <p className={classes.name}>
            {`${artist.firstName} ${artist.lastName}`}
          </p>
          <a href={`mailto:${artist.email}`} className={classes.email}>
            {artist.email}
          </a>
          <p className={classes.description}>{artist.description}</p>
          <div className={classes.latest}>Photos</div>
          <ArticleList articles={articles} />
        </Col>
      </Row>
    </Grid>
  );
};

export default graphql(ArtistProfileBySlug, {
  options: ({ match }) => ({
    variables: {
      user_slug: match.params.artist_slug,
      role_slug: match.path.split("/")[1], // this route will always work thanks to limits set in RoutingApp
    },
  }),
})(injectSheet(styles)(ArtistPage));
