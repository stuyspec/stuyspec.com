import gql from "graphql-tag";

export const ARTICLE_QUERY = gql`
  query ArticleQuery($slug: String!) {
    articleBySlug(slug: $slug) {
      id
      slug
      title
      preview
      content
      media {
        id
        attachment_url
        medium_attachment_url
        thumb_attachment_url
        media_type
        caption
        title
        user {
          first_name
          last_name
          slug
        }
      }
      created_at
      volume
      issue
      contributors {
        first_name
        last_name
        slug
      }
      section {
        id
        name
        permalink
        description
        parent_section {
          id
          name
          permalink
        }
      }
      published_comments {
        id
        content
        created_at
        user {
          first_name
          last_name
        }
      }
      outquotes {
        text
      }
    }
  }
`;

export interface IContributor {
    first_name?: string,
    last_name?: string,
    slug: string,
}

