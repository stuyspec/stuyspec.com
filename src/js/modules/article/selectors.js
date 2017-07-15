import { createSelector } from 'reselect'

const getJSONResponse = (state) => {
	console.log(state.article.article.request)
	if (state.article.article.request) {
		return JSON.parse(state.article.article.request.response)
	}
}

const initialResponse = {
	type: null,
	value: {
		id: null,
		joke: null
	}
}

// always defaults to initialResponse, response is null
export const getArticle = createSelector(
	[ getJSONResponse ],
	(response=initialResponse) => {
		return {
			type: response.type,
			id: response.value.id,
			joke: response.value.joke
		}
	}
)