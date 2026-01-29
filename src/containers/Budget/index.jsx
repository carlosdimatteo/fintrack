import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper, PageHeader, PageTitle } from '../../components/Layout';
import { Tabs } from '../../components/Tabs';
import { BudgetCurrent } from './BudgetCurrent';
import { BudgetHistory } from './BudgetHistory';

const TABS = [
	{ value: '', label: 'Current' },
	{ value: 'history', label: 'History' },
];

export function Budget() {
	const location = useLocation();
	const navigate = useNavigate();
	
	const path = location.pathname.replace('/budget', '').replace('/', '');
	const activeTab = path || '';
	
	const handleTabChange = (tabValue) => {
		navigate(`/budget${tabValue ? `/${tabValue}` : ''}`);
	};

	return (
		<PageWrapper>
			<PageHeader>
				<PageTitle>Budget</PageTitle>
				<Tabs tabs={TABS} activeTab={activeTab} onChange={handleTabChange} />
			</PageHeader>

			<Routes>
				<Route index element={<BudgetCurrent />} />
				<Route path="history" element={<BudgetHistory />} />
			</Routes>
		</PageWrapper>
	);
}
