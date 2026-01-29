import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper, PageHeader, PageTitle } from '../../components/Layout';
import { Tabs } from '../../components/Tabs';
import { DebtorSummary } from './DebtorSummary';
import { DebtForm } from './DebtForm';
import { DebtHistory } from './DebtHistory';

const TABS = [
	{ value: '', label: 'Overview' },
	{ value: 'add', label: 'Add' },
];

export function Debt() {
	const location = useLocation();
	const navigate = useNavigate();
	
	// Determine active tab from URL
	const pathParts = location.pathname.replace('/debts', '').split('/').filter(Boolean);
	const activeTab = pathParts[0] || '';
	
	const handleTabChange = (tabValue) => {
		navigate(`/debts${tabValue ? `/${tabValue}` : ''}`);
	};

	// Hide tabs when viewing history for a specific debtor
	const isHistoryView = pathParts[0] === 'history';

	return (
		<PageWrapper>
			<PageHeader>
				<PageTitle>Debts</PageTitle>
				{!isHistoryView && (
					<Tabs tabs={TABS} activeTab={activeTab} onChange={handleTabChange} />
				)}
			</PageHeader>

			<Routes>
				<Route index element={<DebtorSummary />} />
				<Route path="add" element={<DebtForm />} />
				<Route path="history/:debtorId" element={<DebtHistory />} />
			</Routes>
		</PageWrapper>
	);
}
