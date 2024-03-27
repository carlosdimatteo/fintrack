import Axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

export const API_URL = 'https://fintrack-376102.rj.r.appspot.com/api';
const DEFAULT_STALE_TIME = 20 * 1000;

async function submitExpense(dataToPost) {
	const res = await Axios.post(`${API_URL}/submit`, dataToPost);
	return res;
}

async function getBudgets() {
	const res = await Axios.get(`${API_URL}/budget`);
	return res.data.budgets;
}

async function getCategories() {
	const res = await Axios.get(`${API_URL}/categories`);
	return res.data.categories;
}

async function getAccounts() {
	const res = await Axios.get(`${API_URL}/accounts`);
	return res.data;
}

async function getInvestmentAccounts() {
	const res = await Axios.get(`${API_URL}/investment-accounts`);
	return res.data;
}
async function setAccountingForTheCurrentMonth(data) {
	const res = await Axios.post(`${API_URL}/accounting`, data);
	return res.data;
}

export function useSubmitExpense(options = {}) {
	const { isPending, isError, isSuccess, data, mutate } = useMutation({
		...options,
		mutationFn: submitExpense,
	});
	return {
		isPending,
		isError,
		isSuccess,
		loading: isPending,
		data,
		submitExpense: mutate,
		mutate,
	};
}

export function useBudgets(options = {}) {
	const { data, isLoading, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['budgets'],
		queryFn: getBudgets,
	});
	return {
		budgets: data,
		isLoading,
		error,
		refetch,
	};
}

export function useCategories(options = {}) {
	const { data, isLoading, error } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['categories'],
		queryFn: getCategories,
	});
	return {
		categories: data,
		isLoading,
		error,
	};
}

export function useAccounting(options = {}) {
	const { isPending, isError, isSuccess, data, mutate } = useMutation({
		...options,
		mutationFn: setAccountingForTheCurrentMonth,
	});
	return {
		isPending,
		isError,
		isSuccess,
		loading: isPending,
		data,
		submitAccounting: mutate,
		mutate,
	};
}

export function useAllAcounts(options = {}) {
	const { data, isLoading, error } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['accounts'],
		queryFn: async () => {
			const { accounts } = await getAccounts();
			const { accounts: investmentAccounts } = await getInvestmentAccounts();
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
