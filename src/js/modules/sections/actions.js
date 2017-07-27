import axios from 'axios';
import * as t from './actionTypes';

const apiUrl = 'http://api.icndb.com/jokes/random'
export const fetch = () => {
	return {
		type: t.FETCH_SECTION,
		payload: axios.get( apiUrl )
	}
}