import Axios from 'axios';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export const API_URL = 'https://fintrack-376102.rj.r.appspot.com/api';
const DEFAULT_STALE_TIME = 20 * 1000;
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
			console.log({ res });
			setLoading(false);
			return res;
		} catch (e) {
			setError(e);
		}
	}

	async function getCategories() {
		try {
			setLoading(true);
			const res = await Axios.get(`${API_URL}/categories`);
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
		getCategories,
	};
}

export async function getAccounts() {
	const res = await Axios.get(`${API_URL}/accounts`);
	return res.data;
}

export async function getInvestmentAccounts() {
	const res = await Axios.get(`${API_URL}/investment-accounts`);
	return res.data;
}

export function useAllAcounts(options = {}) {
	const { data, isLoading, error } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['accounts'],
		queryFn: async () => {
			const { accounts } = await getAccounts();
			const { accounts: investmentAccounts } = await getInvestmentAccounts();
			console.log({ accounts, investmentAccounts });
			return {
				accounts,
				investmentAccounts,
				all: [...accounts, ...investmentAccounts],
			};
		},
	});
	return {
		accounts: data.accounts,
		investmentAccounts: data.investmentAccounts,
		all: data.all,
		isLoading,
		error,
	};
}
