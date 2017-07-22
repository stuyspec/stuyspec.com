import { createSelector } from 'reselect'

const getArticles = state => state.core.entities.articles;

export const getHomeArticles = createSelector(
	[ getArticles ],
	(articles) => {
		homeArticles = {}
		// for all articles, take a subset of keys
		Object.keys(articles).map( (key, index) => {
			article = articles[key];
			pickedArticle = ( ({ title, slug, section }) => ({ title, slug, section }) ) (article);
			homeArticles[key] = pickedArticle;
		});
		return homeArticles;
	}
)

// filters all nested objects for which the predicate returns true
Object.filter = (obj, predicate) =>
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

const getRequestedArticleSlug = (state, props) => props.match.params.article_slug;

export const makeGetArticle = () => {
	return createSelector(
		[ getArticles, getRequestedArticleSlug ],
		(articles, requestedArticleSlug) => {
			article = Object.filter(articles, article => {
				return article.slug === requestedArticleSlug;
			});
			// article is currently in { id_key : {} } format
			for (var key in article) {
				return article[key];
			}
		}
	)
}

const getRequestedSectionSlug = (state, props) => props.match.params.section_slug;
const getSections = state => state.core.entities.sections;

export const makeGetSection = () => {
	return createSelector(
		[ getSections, getRequestedSectionSlug ],
		(sections, requestedSectionSlug) => {
			// find the nested section object with a matching slug
			targetSection = Object.filter(sections, section => {
				return section.slug === requestedSectionSlug;
			})
			sectionsMatched = Object.keys(targetSection).length;
			if (sectionsMatched == 1) { // only one section matched
				var sectionId;
				for (var key in targetSection) {
					return targetSection[key];
				}
			}
			console.log("EXCEPTION: section_slug matched " + sectionsMatched + " sections.")
		}
	)
}

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