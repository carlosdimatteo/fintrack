import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainContainer, PageContent } from './Main.styles';
import { Expenses } from '../Expense';
import { Navbar } from '../../components/navbar';
import { Budget } from '../Budget';
import { Accounting } from '../Accounting';
import { Income } from '../Income';
import { Debt } from '../Debt';
import { Investment } from '../Investment';
import { Transfer } from '../Transfer';
import { Showcase } from '../Showcase';

export function Main() {
	return (
		<MainContainer>
			<BrowserRouter>
				<PageContent>
					<Routes>
						<Route path="/" element={<Navigate to="/expenses" replace />} />
						<Route path="/expenses/*" element={<Expenses />} />
						<Route path="/budget" element={<Budget />} />
						<Route path="/income" element={<Income />} />
						<Route path="/investment/*" element={<Investment />} />
						<Route path="/transfers/*" element={<Transfer />} />
						<Route path="/debts/*" element={<Debt />} />
						<Route path="/accounting" element={<Accounting />} />
						<Route path="/showcase" element={<Showcase />} />
					</Routes>
				</PageContent>
				<Navbar />
			</BrowserRouter>
		</MainContainer>
	);
}
