import { NavContainer, NavItem, PositionContainer } from './navbar.styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as DashboardIcon } from '../../assets/icons/dashboard.svg';
import { ReactComponent as GoalsIcon } from '../../assets/icons/goals.svg';
import { ReactComponent as ExpenseIcon } from '../../assets/icons/expense-icon.svg';
import { ReactComponent as BudgetIcon } from '../../assets/icons/budget.svg';
import { ReactComponent as BankIcon } from '../../assets/icons/bank.svg';
import { ReactComponent as InvestmentIcon } from '../../assets/icons/investment.svg';
import { ReactComponent as IncomeIcon } from '../../assets/icons/income.svg';
import { ReactComponent as DebtIcon } from '../../assets/icons/debt.svg';
import { ReactComponent as TransferIcon } from '../../assets/icons/transfer.svg';
export const tabs = [
	{
		name: 'Dashboard',
		icon: <DashboardIcon width={32} height={32} />,
		link: '/dashboard',
	},
	{
		name: 'Goals',
		icon: <GoalsIcon width={32} height={32} />,
		link: '/goals',
	},
	{
		name: 'Expenses',
		icon: <ExpenseIcon width={32} height={32} />,
		link: '/expenses',
	},
	{
		name: 'Budget',
		icon: <BudgetIcon width={32} height={32} />,
		link: '/budget',
	},
	{
		name: 'Income',
		icon: <IncomeIcon width={32} height={32} />,
		link: '/income',
	},
	{
		name: 'Investments',
		icon: <InvestmentIcon width={32} height={32} />,
		link: '/investment',
	},
	{
		name: 'Transfers',
		icon: <TransferIcon width={32} height={32} />,
		link: '/transfers',
	},
	{
		name: 'Debts',
		icon: <DebtIcon width={32} height={32} />,
		link: '/debts',
	},
	{
		name: 'Accounting',
		icon: <BankIcon width={32} height={32} />,
		link: '/accounting',
	},
];
export function Navbar() {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<PositionContainer>
			<NavContainer>
				{tabs.map(({ name, icon, link }, index) => (
					<NavItem
						key={index}
						onClick={() => {
							navigate(link);
						}}
						active={pathname === link || pathname.startsWith(`${link}/`)}
					>
						{icon}
					</NavItem>
				))}
			</NavContainer>
		</PositionContainer>
	);
}
