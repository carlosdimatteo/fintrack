import Axios from 'axios';
import { useState } from 'react';

export const API_URL = 'https://spheric-basis-398613.rj.r.appspot.com/api';

export function useAPI() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	async function submitExpense(dataToPost) {
		try {
			setLoading(true);
			const res = await Axios.post(`${API_URL}/submit`, dataToPost);
			setLoading(false);
			return res;
		} catch (e) {
			setError(e);
		}
	}

	async function getBudgets() {
		try {
			setLoading(true);
			console.log('getting budgets');
			const res = await Axios.get(`${API_URL}/budget`);

			setLoading(false);
			return res;
		} catch (e) {
			setError(e);
		}
	}

	return {
		error,
		loading,
		submitExpense,
		getBudgets,
	};
}
