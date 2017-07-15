import axios from 'axios'
import * as types from './actionTypes';

const apiUrl = 'http://api.icndb.com/jokes/random'
export const fetch = () => {
	return {
		type: types.FETCH_ARTICLE,
		payload: axios.get(apiUrl)
	}
}