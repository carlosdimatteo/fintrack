import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper, PageHeader, PageTitle } from '../../components/Layout';
import { Tabs } from '../../components/Tabs';
import { IncomeForm } from './IncomeForm';
import { IncomeHistory } from './IncomeHistory';
import { IncomeSummary } from './IncomeSummary';

const TABS = [
	{ value: '', label: 'Add' },
	{ value: 'history', label: 'History' },
	{ value: 'summary', label: 'Summary' },
];

export function Income() {
	const location = useLocation();
	const navigate = useNavigate();
	
	const path = location.pathname.replace('/income', '').replace('/', '');
	const activeTab = path || '';
	
	const handleTabChange = (tabValue) => {
		navigate(`/income${tabValue ? `/${tabValue}` : ''}`);
	};

	return (
		<PageWrapper>
			<PageHeader>
				<PageTitle>Income</PageTitle>
				<Tabs tabs={TABS} activeTab={activeTab} onChange={handleTabChange} />
			</PageHeader>

			<Routes>
				<Route index element={<IncomeForm />} />
				<Route path="history" element={<IncomeHistory />} />
				<Route path="summary" element={<IncomeSummary />} />
			</Routes>
		</PageWrapper>
	);
}
