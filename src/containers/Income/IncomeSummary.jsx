import { useState } from 'react';
import styled from 'styled-components';
import { useIncomeSummary } from '../../hooks/useAPI';
import { Card } from '../../components/Card';
import { LoadingText } from '../../components/Layout';
import { usePrivateFormatters } from '../../hooks/usePrivateFormatters';

const SummaryContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing.md};
`;

const YearSelector = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${({ theme }) => theme.spacing.lg};
`;

const YearButton = styled.button`
	background: transparent;
	border: none;
	color: ${({ theme }) => theme.colors.accent.primary};
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	cursor: pointer;
	padding: 8px 12px;
	border-radius: 8px;
	transition: all 0.15s ease;
	
	&:hover {
		background: rgba(120, 180, 180, 0.1);
	}
	
	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
`;

const YearDisplay = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xl};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
	min-width: 80px;
	text-align: center;
`;

const TotalCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	padding: 20px;
	border-radius: 12px;
	
	border: 1px solid transparent;
	background: 
		linear-gradient(${({ theme }) => theme.colors.card.interior}, ${({ theme }) => theme.colors.card.interior}) padding-box,
		${({ theme }) => theme.colors.card.borderGradient} border-box;
`;

const TotalLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const TotalValue = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes['2xl']};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: #4ade80;
`;

const MonthList = styled.div`
	display: flex;
	flex-direction: column;
`;

const MonthRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	
	&:last-child {
		border-bottom: none;
	}
`;

const MonthName = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	color: ${({ $current, theme }) => 
		$current ? theme.colors.accent.primary : theme.colors.text.primary};
	font-weight: ${({ $current, theme }) => 
		$current ? theme.typography.weights.semibold : theme.typography.weights.normal};
`;

const MonthAmount = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ $hasIncome }) => $hasIncome ? '#4ade80' : 'rgba(255, 255, 255, 0.3)'};
`;

const EmptyState = styled.div`
	text-align: center;
	color: ${({ theme }) => theme.colors.text.muted};
	padding: ${({ theme }) => theme.spacing.xl};
`;

const MONTHS = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

export function IncomeSummary() {
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1;
	const [year, setYear] = useState(currentYear);
	const fmt = usePrivateFormatters();
	
	const { summary, total, isLoading, error } = useIncomeSummary(year);
	
	// Create a map of month -> total (API uses total_income field)
	const monthTotals = {};
	summary.forEach((item) => {
		monthTotals[item.month] = item.total_income;
	});
	
	if (isLoading) {
		return <LoadingText>Loading summary...</LoadingText>;
	}
	
	if (error) {
		return <LoadingText>Error loading summary</LoadingText>;
	}
	
	return (
		<SummaryContainer>
			<YearSelector>
				<YearButton onClick={() => setYear(year - 1)}>
					←
				</YearButton>
				<YearDisplay>{year}</YearDisplay>
				<YearButton 
					onClick={() => setYear(year + 1)}
					disabled={year >= currentYear}
				>
					→
				</YearButton>
			</YearSelector>
			
			<TotalCard>
				<TotalLabel>Total Income {year}</TotalLabel>
				<TotalValue>{fmt.currency(total)}</TotalValue>
			</TotalCard>
			
			<Card>
				{summary.length === 0 ? (
					<EmptyState>No income recorded for {year}</EmptyState>
				) : (
					<MonthList>
						{MONTHS.map((monthName, index) => {
							const monthNum = index + 1;
							const monthTotal = monthTotals[monthNum] || 0;
							const isCurrent = year === currentYear && monthNum === currentMonth;
							
							return (
								<MonthRow key={monthNum}>
									<MonthName $current={isCurrent}>
										{monthName}
										{isCurrent && ' •'}
									</MonthName>
									<MonthAmount $hasIncome={monthTotal > 0}>
										{monthTotal > 0 ? fmt.currency(monthTotal) : '—'}
									</MonthAmount>
								</MonthRow>
							);
						})}
					</MonthList>
				)}
			</Card>
		</SummaryContainer>
	);
}
