import styled from 'styled-components';
import { formatCurrency } from '../../utils/formatters';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const Title = styled.h3`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.secondary};
	margin: 0;
`;

const StatsGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
`;

const StatCard = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding: 14px;
	border-radius: 10px;
	
	border: 1px solid transparent;
	background: 
		linear-gradient(${({ theme }) => theme.colors.card.interior}, ${({ theme }) => theme.colors.card.interior}) padding-box,
		${({ theme }) => theme.colors.card.borderGradient} border-box;
`;

const StatLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const StatValue = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ $color }) => $color || '#E6ECEC'};
`;

export function YTDSummary({ data }) {
	const savingsPositive = data.savings >= 0;
	
	return (
		<Container>
			<Title>Year to Date</Title>
			<StatsGrid>
				<StatCard>
					<StatLabel>Income</StatLabel>
					<StatValue>{formatCurrency(data.income)}</StatValue>
				</StatCard>
				<StatCard>
					<StatLabel>Expenses</StatLabel>
					<StatValue>{formatCurrency(data.expenses)}</StatValue>
				</StatCard>
				<StatCard>
					<StatLabel>Invested</StatLabel>
					<StatValue>{formatCurrency(data.investment_deposits)}</StatValue>
				</StatCard>
				<StatCard>
					<StatLabel>Savings</StatLabel>
					<StatValue $color={savingsPositive ? '#4ade80' : '#f87171'}>
						{formatCurrency(data.savings)}
					</StatValue>
				</StatCard>
			</StatsGrid>
		</Container>
	);
}
