import { createSelector } from 'reselect'

const getArticles = state => state.core.entities.articles;
const getSections = state => state.core.entities.sections;
const getRequestedArticleSlug = (state, props) => props.match.params.article_slug;
const getRequestedSectionSlug = (state, props) => {
	const pathParts = props.match.path.split('/');
	return pathParts[1];
}

/* The homepage does not require all Article properties.
 * TODO: condense articles to properties title, section, and slug
 */
export const getCondensedArticles = createSelector(
	[ getArticles ],
	(articles) => {
		return Object.assign({}, articles);
	}
)

export const getArticleBySlug = createSelector(
	[ getArticles, getRequestedArticleSlug ],
	(articles, articleSlug) => {
		return articles[ articleSlug ];
	}
)

export const getSectionBySlug = createSelector(
	[ getSections, getRequestedSectionSlug ],
	(sections, sectionSlug) => {
		return sections[ sectionSlug ];
	}
)

/* Writes the filter function for objects.
 * predicate is the function which keys/properties must match
 */
Object.filter = (obj, predicate) =>
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

const getSectionByProps = (state, props) => props.section;

export const getArticlesWithinSection = createSelector(
	[ getSectionByProps, getArticles ],
	(section, articles) => {
		return Object.filter(articles, article => {
			return article.section == section.id;
		})
	}
)