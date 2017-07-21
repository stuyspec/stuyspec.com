import { createSelector } from 'reselect'

const getArticles = state => state.core.entities.articles;

export const getHomeArticles = createSelector(
	[ getArticles ],
	(articles) => {
		homeArticles = {}
		Object.keys(articles).map( (key, index) => {
			article = articles[key];
			pickedArticle = ( ({ title, slug, section, content }) => ({ title, slug, section, content }) ) (article);
			homeArticles[key] = pickedArticle;
		});
		return homeArticles;
	}
)

Object.filter = (obj, predicate) =>
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

const getRequestedArticleSlug = (state, props) => props.match.params.article;

export const makeGetArticle = () => {
	return createSelector(
		[ getArticles, getRequestedArticleSlug ],
		(articles, requestedArticleSlug) => {
			article = Object.filter(articles, article => {
				return article.slug === requestedArticleSlug;
			});
			for (var key in article) {
				return article[key];
			}
		}
	)
}

const getSectionId = (state, props) => {
	sections = state.core.entities.sections;
	requestedSectionSlug = props.match.params.section;
	section = Object.filter(sections, section => {
		return section.slug === requestedSectionSlug;
	});
	for (var key in section) {
		return section[key].id
	}
	console.log("ERROR: SECTION NOT FOUND.");
}

export const makeGetSectionArticles = () => {
	return createSelector(
		[ getSectionId, getArticles ],
		(sectionId, articles) => {
			sectionArticles = Object.filter(articles, article => {
				return article.section === sectionId;
			});
			return sectionArticles;
		}
	)
}