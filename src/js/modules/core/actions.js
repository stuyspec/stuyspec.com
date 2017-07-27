import axios from 'axios';
import * as t from './actionTypes';

const apiUrl = 'http://api.icndb.com/jokes/random'
export const fetch = () => {
	return {
		type: t.FETCH_ARTICLE,
		payload: axios.get( apiUrl )
	}
}