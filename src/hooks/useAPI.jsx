import Axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

// Use env variable if set, otherwise use /api (works with proxy in dev)
export const API_URL = process.env.REACT_APP_API_URL || '/api';
const DEFAULT_STALE_TIME = 20 * 1000;

async function submitIncome(income) {
	const res = await Axios.post(`${API_URL}/income`, income);
	return res;
}

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

export function useSubmitIncome(options = {}) {
	const { isPending, isError, isSuccess, data, mutate } = useMutation({
		...options,
		mutationFn: submitIncome,
	});
	return {
		isPending,
		isError,
		isSuccess,
		loading: isPending,
		data,
		submitIncome: mutate,
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

export function useAllAccounts(options = {}) {
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
		accounts: data?.accounts ?? [],
		investmentAccounts: data?.investmentAccounts ?? [],
		all: data?.all ?? [],
		isLoading,
		error,
	};
}

// Keep old name for backward compatibility
export const useAllAcounts = useAllAccounts;

// ============================================
// Expense Hooks
// ============================================

async function getExpenses(limit = 20, offset = 0) {
	const res = await Axios.get(`${API_URL}/expenses?limit=${limit}&offset=${offset}`);
	return res.data;
}

async function getRecentExpenses(limit = 10) {
	const res = await Axios.get(`${API_URL}/expenses/recent?limit=${limit}`);
	return res.data;
}

export function useExpenseList(limit = 20, offset = 0, options = {}) {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['expenses', limit, offset],
		queryFn: () => getExpenses(limit, offset),
	});
	return {
		expenses: data?.expenses ?? [],
		count: data?.count ?? 0,
		isLoading,
		isFetching,
		error,
		refetch,
	};
}

export function useRecentExpenses(limit = 10, options = {}) {
	const { data, isLoading, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['recentExpenses', limit],
		queryFn: () => getRecentExpenses(limit),
	});
	return {
		expenses: data?.expenses ?? [],
		isLoading,
		error,
		refetch,
	};
}

// ============================================
// Debt Hooks
// ============================================

async function getDebtors() {
	const res = await Axios.get(`${API_URL}/debtors`);
	return res.data;
}

async function createDebtor(data) {
	const res = await Axios.post(`${API_URL}/debtors`, data);
	return res.data;
}

async function submitExpenseWithDebt(data) {
	const res = await Axios.post(`${API_URL}/expense-debt`, data);
	return res.data;
}

export function useDebtors(options = {}) {
	const { data, isLoading, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['debtors'],
		queryFn: getDebtors,
	});
	return {
		debtors: data?.debtors ?? [],
		isLoading,
		error,
		refetch,
	};
}

export function useCreateDebtor(options = {}) {
	const { isPending, isError, isSuccess, data, mutate, reset } = useMutation({
		...options,
		mutationFn: createDebtor,
	});
	return {
		isPending,
		isError,
		isSuccess,
		loading: isPending,
		data,
		createDebtor: mutate,
		mutate,
		reset,
	};
}

export function useSubmitExpenseWithDebt(options = {}) {
	const { isPending, isError, isSuccess, data, mutate, reset } = useMutation({
		...options,
		mutationFn: submitExpenseWithDebt,
	});
	return {
		isPending,
		isError,
		isSuccess,
		loading: isPending,
		data,
		submitExpenseWithDebt: mutate,
		mutate,
		reset,
	};
}

// GET /api/debts/by-debtor - Summary per debtor
async function getDebtsByDebtor() {
	const res = await Axios.get(`${API_URL}/debts/by-debtor`);
	return res.data;
}

export function useDebtsByDebtor(options = {}) {
	const { data, isLoading, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['debtsByDebtor'],
		queryFn: getDebtsByDebtor,
	});
	return {
		debtors: data ?? [],
		isLoading,
		error,
		refetch,
	};
}

// GET /api/debts?debtor_id=X - History with specific debtor
async function getDebtHistory(debtorId) {
	const res = await Axios.get(`${API_URL}/debts?debtor_id=${debtorId}`);
	return res.data;
}

export function useDebtHistory(debtorId, options = {}) {
	const { data, isLoading, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['debtHistory', debtorId],
		queryFn: () => getDebtHistory(debtorId),
		enabled: !!debtorId,
	});
	return {
		debts: data?.debts ?? [],
		isLoading,
		error,
		refetch,
	};
}

// POST /api/debt - Standalone debt
async function createDebt(data) {
	const res = await Axios.post(`${API_URL}/debt`, data);
	return res.data;
}

export function useCreateDebt(options = {}) {
	const { isPending, isError, isSuccess, data, mutate, reset } = useMutation({
		...options,
		mutationFn: createDebt,
	});
	return {
		isPending,
		isError,
		isSuccess,
		loading: isPending,
		data,
		createDebt: mutate,
		mutate,
		reset,
	};
}

// POST /api/debt/repayment - Record repayment
async function createRepayment(data) {
	const res = await Axios.post(`${API_URL}/debt/repayment`, data);
	return res.data;
}

export function useDebtRepayment(options = {}) {
	const { isPending, isError, isSuccess, data, mutate, reset } = useMutation({
		...options,
		mutationFn: createRepayment,
	});
	return {
		isPending,
		isError,
		isSuccess,
		loading: isPending,
		data,
		createRepayment: mutate,
		mutate,
		reset,
	};
}

// ============================================
// Investment Hooks
// ============================================

// POST /api/investment - Create deposit or withdrawal
async function createInvestment(data) {
	const res = await Axios.post(`${API_URL}/investment`, data);
	return res.data;
}

export function useCreateInvestment(options = {}) {
	const { isPending, isError, isSuccess, data, mutate, reset } = useMutation({
		...options,
		mutationFn: createInvestment,
	});
	return {
		isPending,
		isError,
		isSuccess,
		loading: isPending,
		data,
		createInvestment: mutate,
		mutate,
		reset,
	};
}

// GET /api/investments - Transaction history with pagination
async function getInvestmentTransactions(limit, offset) {
	const res = await Axios.get(`${API_URL}/investments`, {
		params: { limit, offset },
	});
	return res.data;
}

export function useInvestmentTransactions(limit = 20, offset = 0, options = {}) {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['investmentTransactions', limit, offset],
		queryFn: () => getInvestmentTransactions(limit, offset),
	});
	return {
		transactions: data?.investments ?? [],
		count: data?.count ?? 0,
		isLoading,
		isFetching,
		error,
		refetch,
	};
}

// GET /api/investment-accounts/summary - Portfolio with PnL
async function getInvestmentSummary() {
	const res = await Axios.get(`${API_URL}/investment-accounts/summary`);
	return res.data;
}

export function useInvestmentSummary(options = {}) {
	const { data, isLoading, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['investmentSummary'],
		queryFn: getInvestmentSummary,
	});
	return {
		accounts: data ?? [],
		isLoading,
		error,
		refetch,
	};
}
