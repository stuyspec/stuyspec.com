import React from "react";
import { createUseStyles } from "react-jss";
import { Grid, Row, Col } from "react-bootstrap/lib";
import { Helmet } from "react-helmet";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

import { ArticleList } from "../../articles/components";
import { NotFoundPage } from "../../core/components";

const ArtistProfileBySlug = gql`
  query ArtistProfileBySlug($artist_slug: String!, $role_slug: String!) {
    profileByUserAndRole(user_slug: $artist_slug, role_slug: $role_slug) {
      user {
        first_name
        last_name
        email
        description
        profile_url
      }
      media {
        media_type
        title
        attachment_url
        article {
          id
          slug
          title
          preview
          created_at
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
    fontWeight: 300,
    marginBottom: "22px",
    padding: "4px 0px",
  },
  description: {
    fontFamily: "Minion Pro",
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "26px",
  },
  image: {
    textAlign: "center",
    marginBottom: "20px"
  },
  "@media (max-width: 1199px) and (min-width: 992px)": {
    ArtistPage: {
      paddingLeft: "10%",
    },
  },
};

const useStyles = createUseStyles(styles);

const ArtistPage = ({ artist_slug, role_slug }) => {
  const classes = useStyles();

  const result = useQuery(ArtistProfileBySlug, {
    variables: {
      artist_slug,
      role_slug
    }
  })


  if (result.loading) {
    return null;
  }

  if (!result.data.profileByUserAndRole) {
    return <NotFoundPage />;
  }

  const data = result.data;

  const artist = data.profileByUserAndRole.user;

  const articles = data.profileByUserAndRole.media.filter(m => m.article).map(medium => ({
    ...medium.article,
    media: [
      {
        media_type: medium.media_type,
        title: medium.title,
        attachment_url: medium.attachment_url,
      },
    ],
  }));
  
  const hasImage = artist.profile_url !== "/images/original/missing.png";

  return (
    <Grid className={classes.ArtistPage}>
      <Helmet titleTemplate="%s | The Stuyvesant Spectator">
        <title>{`${artist.first_name} ${artist.last_name}`}</title>
        <meta />
      </Helmet>
      <Row>
	    {hasImage &&
        <Col xs={2} sm={1} md={1} lg={2}>
            <img className={classes.image} src={artist.profile_url} height={120} width={120}/>
        </Col>}
	    <Col>
          <p className={classes.name}>
            {`${artist.first_name} ${artist.last_name}`}
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

export default ArtistPage;
