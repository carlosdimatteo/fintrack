import Axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

// Use env variable if set, otherwise use /api (works with proxy in dev)
export const API_URL = process.env.REACT_APP_API_URL || '/api';
const API_KEY = process.env.REACT_APP_API_KEY || '';
const DEFAULT_STALE_TIME = 20 * 1000;

// Add X-API-Key header to all requests if configured
if (API_KEY) {
	Axios.defaults.headers.common['X-API-Key'] = API_KEY;
}

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
	const { isPending, isError, isSuccess, data, mutate, mutateAsync, reset } = useMutation({
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
		createDebtAsync: mutateAsync,
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
	const { isPending, isError, isSuccess, data, mutate, mutateAsync, reset } = useMutation({
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
		createRepaymentAsync: mutateAsync,
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

// ============================================
// Transfer Hooks
// ============================================

// POST /api/transfer - Create transfer between accounts
async function createTransfer(data) {
	const res = await Axios.post(`${API_URL}/transfer`, data);
	return res.data;
}

export function useCreateTransfer(options = {}) {
	const { isPending, isError, isSuccess, data, mutate, reset } = useMutation({
		...options,
		mutationFn: createTransfer,
	});
	return {
		isPending,
		isError,
		isSuccess,
		loading: isPending,
		data,
		createTransfer: mutate,
		mutate,
		reset,
	};
}

// GET /api/transfers - Transfer history with pagination
async function getTransfers(limit, offset) {
	const res = await Axios.get(`${API_URL}/transfers`, {
		params: { limit, offset },
	});
	return res.data;
}

export function useTransfers(limit = 20, offset = 0, options = {}) {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['transfers', limit, offset],
		queryFn: () => getTransfers(limit, offset),
	});
	return {
		transfers: data?.transfers ?? [],
		count: data?.count ?? 0,
		isLoading,
		isFetching,
		error,
		refetch,
	};
}

// ============================================
// Income Hooks (Enhanced)
// ============================================

// GET /api/income - Income history with pagination
async function getIncomeList(limit, offset) {
	const res = await Axios.get(`${API_URL}/income`, {
		params: { limit, offset },
	});
	return res.data;
}

export function useIncomeList(limit = 20, offset = 0, options = {}) {
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['incomeList', limit, offset],
		queryFn: () => getIncomeList(limit, offset),
	});
	return {
		incomes: data?.incomes ?? [],
		count: data?.count ?? 0,
		isLoading,
		isFetching,
		error,
		refetch,
	};
}

// GET /api/income/summary - Yearly summary by month
async function getIncomeSummary(year) {
	const res = await Axios.get(`${API_URL}/income/summary`, {
		params: { year },
	});
	return res.data;
}

export function useIncomeSummary(year, options = {}) {
	const { data, isLoading, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['incomeSummary', year],
		queryFn: () => getIncomeSummary(year),
	});
	
	// API returns array directly: [{year, month, total_income}]
	const summary = Array.isArray(data) ? data : [];
	const total = summary.reduce((sum, item) => sum + (item.total_income || 0), 0);
	
	return {
		summary,
		total,
		year,
		isLoading,
		error,
		refetch,
	};
}

// ============================================
// Dashboard Hooks
// ============================================

// GET /api/dashboard - All-in-one summary
async function getDashboard(year, month) {
	const params = {};
	if (year) params.year = year;
	if (month) params.month = month;
	const res = await Axios.get(`${API_URL}/dashboard`, { params });
	return res.data;
}

export function useDashboard(year, month, options = {}) {
	const { data, isLoading, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['dashboard', year, month],
		queryFn: () => getDashboard(year, month),
	});
	return {
		dashboard: data ?? null,
		currentMonth: data?.current_month ?? null,
		ytd: data?.ytd ?? null,
		goals: data?.goals ?? null,
		netWorth: data?.net_worth ?? null,
		investments: data?.investments ?? [],
		savingsProgress: data?.savings_progress ?? null,
		isLoading,
		error,
		refetch,
	};
}

// GET /api/net-worth/history - Historical net worth
async function getNetWorthHistory() {
	const res = await Axios.get(`${API_URL}/net-worth/history`);
	return res.data;
}

export function useNetWorthHistory(options = {}) {
	const { data, isLoading, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['netWorthHistory'],
		queryFn: getNetWorthHistory,
	});
	return {
		history: Array.isArray(data) ? data : [],
		isLoading,
		error,
		refetch,
	};
}

// ============================================
// Goals Hooks
// ============================================

// GET /api/goals - Get goals for a year
async function getGoals(year) {
	const res = await Axios.get(`${API_URL}/goals`, {
		params: { year },
	});
	return res.data;
}

export function useGoals(year, options = {}) {
	const { data, isLoading, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['goals', year],
		queryFn: () => getGoals(year),
	});
	return {
		goals: data ?? null,
		isLoading,
		error,
		refetch,
	};
}

// POST /api/goals - Create or update goals (upsert)
async function upsertGoals(data) {
	const res = await Axios.post(`${API_URL}/goals`, data);
	return res.data;
}

export function useUpsertGoals(options = {}) {
	const { isPending, isError, isSuccess, data, mutate, reset } = useMutation({
		...options,
		mutationFn: upsertGoals,
	});
	return {
		isPending,
		isError,
		isSuccess,
		loading: isPending,
		data,
		upsertGoals: mutate,
		mutate,
		reset,
	};
}

// ============================================
// Budget Hooks
// ============================================

// GET /api/budget/history - Monthly budget breakdown for a year
async function getBudgetHistory(year) {
	const res = await Axios.get(`${API_URL}/budget/history`, {
		params: { year },
	});
	return res.data;
}

export function useBudgetHistory(year, options = {}) {
	const { data, isLoading, error, refetch } = useQuery({
		...options,
		staleTime: DEFAULT_STALE_TIME,
		queryKey: ['budgetHistory', year],
		queryFn: () => getBudgetHistory(year),
	});
	return {
		data: data ?? null,
		months: data?.months ?? [],
		yearlyTotals: data?.yearly_totals ?? null,
		year: data?.year ?? year,
		isLoading,
		error,
		refetch,
	};
}

// ============================================
// Exchange Rate (for currency conversion)
// ============================================

const STALE_12H = 4 * 60 * 60 * 1000;

async function fetchExchangeRate(from, to) {
	const res = await Axios.get(`${API_URL}/exchange-rate`, {
		params: { from, to },
	});
	return res.data;
}

/**
 * Fetches USD→COP (or other pair) from your backend. React Query caches for 12h
 * (staleTime), so it won't refetch until stale. Only runs when a component
 * that uses it is mounted (e.g. a form), not on app load.
 * @see https://tanstack.com/query/latest/docs/framework/react/guides/caching
 */
export function useExchangeRate(from = 'USD', to = 'COP', options = {}) {
	const { data, isFetching, isFetched } = useQuery({
		...options,
		queryKey: ['exchangeRate', from, to],
		queryFn: () => fetchExchangeRate(from, to),
		staleTime: STALE_12H,
		gcTime: STALE_12H,
		enabled: true,
		retry: 1,
	});

	return {
		conversionRate: data?.conversion_rate ?? null,
		isFetching,
		isFetched,
	};
}
