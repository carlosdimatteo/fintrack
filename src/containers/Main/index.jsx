import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainContainer, PageContent } from './Main.styles';
import { Expenses } from '../Expense';
import { Navbar } from '../../components/navbar';
import { Budget } from '../Budget';
import { Accounting } from '../Accounting';
export function Main() {
	return (
		<MainContainer>
			<BrowserRouter>
				<PageContent>
					<Routes>
						<Route path="/" element={<Navigate to="/expenses" />} />
						<Route path="/expenses" element={<Expenses />} />
						<Route path="/budget" element={<Budget />} />
						<Route path="/accounting" element={<Accounting />} />
					</Routes>
				</PageContent>
				<Navbar />
			</BrowserRouter>
		</MainContainer>
	);
}
