import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { PageWrapper, PageHeader, PageTitle } from '../../components/Layout';
import { Tabs } from '../../components/Tabs';
import { TransferForm } from './TransferForm';
import { TransferHistory } from './TransferHistory';

const TABS = [
	{ value: '', label: 'Add' },
	{ value: 'history', label: 'History' },
];

export function Transfer() {
	const location = useLocation();
	const navigate = useNavigate();
	
	const path = location.pathname.replace('/transfers', '').replace('/', '');
	const activeTab = path || '';
	
	const handleTabChange = (tabValue) => {
		navigate(`/transfers${tabValue ? `/${tabValue}` : ''}`);
	};

	return (
		<PageWrapper>
			<PageHeader>
				<PageTitle>Transfers</PageTitle>
				<Tabs tabs={TABS} activeTab={activeTab} onChange={handleTabChange} />
			</PageHeader>

			<Routes>
				<Route index element={<TransferForm />} />
				<Route path="history" element={<TransferHistory />} />
			</Routes>
		</PageWrapper>
	);
}
