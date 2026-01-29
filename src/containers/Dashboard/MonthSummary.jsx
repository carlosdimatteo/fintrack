import styled from 'styled-components';
import { formatCurrency } from '../../utils/formatters';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 20px;
	border-radius: 12px;
	
	border: 1px solid transparent;
	background: 
		linear-gradient(${({ theme }) => theme.colors.card.interior}, ${({ theme }) => theme.colors.card.interior}) padding-box,
		${({ theme }) => theme.colors.card.borderGradient} border-box;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Title = styled.h3`
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
	margin: 0;
`;

const MonthBadge = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const StatsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 12px;
`;

const StatItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

const StatLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const StatValue = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ $color }) => $color || '#E6ECEC'};
`;

const SavingsBar = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding-top: 8px;
	border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const SavingsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const SavingsLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const SavingsRate = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	font-weight: ${({ theme }) => theme.typography.weights.bold};
	color: ${({ $positive }) => $positive ? '#4ade80' : '#f87171'};
`;

const MONTHS = [
	'', 'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

export function MonthSummary({ data }) {
	const monthName = MONTHS[data.month] || '';
	const savingsPositive = data.savings >= 0;
	
	return (
		<Container>
			<Header>
				<Title>This Month</Title>
				<MonthBadge>{monthName} {data.year}</MonthBadge>
			</Header>
			
			<StatsGrid>
				<StatItem>
					<StatLabel>Income</StatLabel>
					<StatValue>{formatCurrency(data.income)}</StatValue>
				</StatItem>
				<StatItem>
					<StatLabel>Expenses</StatLabel>
					<StatValue>{formatCurrency(data.expenses)}</StatValue>
				</StatItem>
				<StatItem>
					<StatLabel>Invested</StatLabel>
					<StatValue>{formatCurrency(data.investment_deposits)}</StatValue>
				</StatItem>
				<StatItem>
					<StatLabel>Savings</StatLabel>
					<StatValue $color={savingsPositive ? '#4ade80' : '#f87171'}>
						{formatCurrency(data.savings)}
					</StatValue>
				</StatItem>
			</StatsGrid>
			
			<SavingsBar>
				<SavingsHeader>
					<SavingsLabel>Savings Rate</SavingsLabel>
					<SavingsRate $positive={data.savings_rate >= 0}>
						{data.savings_rate >= 0 ? '+' : ''}{data.savings_rate.toFixed(1)}%
					</SavingsRate>
				</SavingsHeader>
			</SavingsBar>
		</Container>
	);
}
