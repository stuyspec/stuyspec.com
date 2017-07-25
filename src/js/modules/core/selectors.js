import { createSelector } from 'reselect'

const getArticles = state => state.core.entities.articles;
export const getSections = state => state.core.entities.sections;
const getRequestedArticleSlug = (state, props) => props.match.params.article_slug;
const getRequestedSectionSlug = (state, props) => {
	// split path to get the first part: section name
	pathParts = props.match.path.split('/');
	return pathParts[1];
}

/* Gets articles with only necessary properties
 */
export const getHomeArticles = createSelector(
	[ getArticles ],
	(articles) => {
		homeArticles = {}; // for immutability
		// moving all articles in the articles object as a condensed version into homeArticles
		Object.keys(articles).map( (key) => {
			article = articles[key];
			// chooses minimum properties for a link to the article
			pickedArticle = ( ({ title, slug, section }) => ({ title, slug, section }) ) (article);
			homeArticles[key] = pickedArticle;
		});
		return homeArticles;
	}
)

/* Writes the filter function for objects.
 * predicate is the function which keys/properties must match
 */
Object.filter = (obj, predicate) =>
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

/* Gets article that matches the requested article slug.
 */
export const makeGetArticle = () => {
	return createSelector(
		[ getArticles, getRequestedArticleSlug ],
		(articles, requestedArticleSlug) => {
			nestedArticle = Object.filter(articles, article => {
				return article.slug === requestedArticleSlug;
			});
			articlesMatched = Object.keys(nestedArticle).length;
			if (articlesMatched == 1) { // only one article matched
				for (var key in nestedArticle) {
					return nestedArticle[key];
				}
			}
			console.log("EXCEPTION: article_slug " + requestedArticleSlug + " matched " + articlesMatched + " articles.");
		}
	)
}

/* Gets section that matches the requested section slug.
 */
export const makeGetSection = () => {
	return createSelector(
		[ getSections, getRequestedSectionSlug ],
		(sections, requestedSectionSlug) => {
			// find the nested section object with a matching slug
			nestedSection = Object.filter(sections, section => {
				return section.slug === requestedSectionSlug;
			})
			sectionsMatched = Object.keys(nestedSection).length;
			if (sectionsMatched == 1) { // only one section matched
				for (var key in nestedSection) {
					return nestedSection[key];
				}
			}
			console.log("EXCEPTION: section_slug " + requestedSectionSlug + " matched " + sectionsMatched + " sections.");
		}
	)
}

/* Gets all articles within the requested section.
 */
export const makeGetSectionArticles = () => {
	getSection = makeGetSection();
	return createSelector(
		[ getArticles, getSection ],
		(articles, section) => {			
			// find all articles with matching section id
			sectionArticles = Object.filter(articles, article => {
				return article.section === section.id;
			});
			return sectionArticles;						
		}
	)
}