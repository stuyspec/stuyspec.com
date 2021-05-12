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
        is_featured
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
    }
  }
`;

export interface IContributor {
  first_name?: string,
  last_name?: string,
  slug: string,
};

export interface IMedium {
  id: string,
  attachment_url: string,
  medium_attachment_url: string,
  thumb_attachment_url: string,
  media_type: string,
  caption?: string,
  title: string,
  is_featured: boolean,
  user: IContributor
}

export interface ISection {
  id: string,
  name: string,
  permalink: string,
  description?: string,
  parent_section?: {
    id: string,
    name: string,
    permalink: string
  }
}

// interface IOutquote {
//   text: string
// }

export interface IArticle {
  id: string,
  slug: string,
  title: string,
  preview?: string,
  content: string,
  media?: Array<IMedium>,
  created_at: string,
  volume: number,
  issue: number,
  contributors?: Array<IContributor>,
  section: ISection,
  //outquotes?: Array<IOutquote | undefined>,
}

export interface IArticleData {
  articleBySlug?: IArticle
}

export interface IArticleVariables {
  slug: string
}

export const RIGHT_RAIL_QUERY = gql`
  query RightRailQuery {
    topRankedArticles(limit: 5) {
      id
      slug
      title
      contributors {
        first_name
        last_name
        slug
      }
      media {
        title
        thumb_attachment_url
      }
      section {
        id
        permalink
      }
    }
  }
`;

export interface IRightRailData {
  topRankedArticles?: Array<{
    id: string,
    slug: string,
    title: string,
    contributors?: Array<IContributor>,
    media?: Array<{
      title: string,
      thumb_attachment_url: string,
    }>,
    section: {
      id: string,
      permalink: string
    }
  } | undefined>
}

export const ARTICLE_REFERENCE_QUERY = gql`
  query ArticleReferenceQuery($article_id: ID!) {
    articleByID(id: $article_id) {
      title
      volume
      issue
      slug
      section {
        permalink
      }
    }
  }
`;

export interface IArticleReferenceData {
  articleByID?: {
    title: string,
    volume: number,
    issue: number,
    slug: string,
    section: {
      permalink: string
    }
  }
}

export interface IArticleReferenceVariables {
  article_id: string
}
