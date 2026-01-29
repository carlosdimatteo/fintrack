import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper, PageHeader, PageTitle } from '../../components/Layout';
import { Tabs } from '../../components/Tabs';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseHistory } from './ExpenseHistory';

const TABS = [
	{ value: '', label: 'Add' },
	{ value: 'history', label: 'History' },
];

export function Expenses() {
	const location = useLocation();
	const navigate = useNavigate();
	
	// Determine active tab from URL
	const path = location.pathname.replace('/expenses', '').replace('/', '');
	const activeTab = path || '';
	
	const handleTabChange = (tabValue) => {
		navigate(`/expenses${tabValue ? `/${tabValue}` : ''}`);
	};

	return (
		<PageWrapper>
			<PageHeader>
				<PageTitle>Expense</PageTitle>
				<Tabs tabs={TABS} activeTab={activeTab} onChange={handleTabChange} />
			</PageHeader>

			<Routes>
				<Route index element={<ExpenseForm />} />
				<Route path="history" element={<ExpenseHistory />} />
			</Routes>
		</PageWrapper>
	);
}
