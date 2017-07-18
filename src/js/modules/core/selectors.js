import { createSelector } from 'reselect'

const getJSONResponse = (state) => {
	console.log(state.core.request)
	if (state.core.request) {
		return JSON.parse(state.core.request.request.response)
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