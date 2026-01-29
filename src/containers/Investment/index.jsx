import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper, PageHeader, PageTitle } from '../../components/Layout';
import { Tabs } from '../../components/Tabs';
import { InvestmentForm } from './InvestmentForm';
import { PortfolioView } from './PortfolioView';
import { InvestmentHistory } from './InvestmentHistory';

const TABS = [
	{ value: '', label: 'Portfolio' },
	{ value: 'add', label: 'Add' },
	{ value: 'history', label: 'History' },
];

export function Investment() {
	const location = useLocation();
	const navigate = useNavigate();
	
	const path = location.pathname.replace('/investment', '').replace('/', '');
	const activeTab = path || '';
	
	const handleTabChange = (tabValue) => {
		navigate(`/investment${tabValue ? `/${tabValue}` : ''}`);
	};

	return (
		<PageWrapper>
			<PageHeader>
				<PageTitle>Investments</PageTitle>
				<Tabs tabs={TABS} activeTab={activeTab} onChange={handleTabChange} />
			</PageHeader>

			<Routes>
				<Route index element={<PortfolioView />} />
				<Route path="add" element={<InvestmentForm />} />
				<Route path="history" element={<InvestmentHistory />} />
			</Routes>
		</PageWrapper>
	);
}
