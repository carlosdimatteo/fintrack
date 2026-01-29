import { useState } from 'react';
import styled from 'styled-components';
import { useBudgetHistory } from '../../hooks/useAPI';
import { Card } from '../../components/Card';
import { LoadingText } from '../../components/Layout';
import { formatCurrency } from '../../utils/formatters';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing.lg};
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

// Yearly Totals Card
const YearlyCard = styled.div`
	padding: 20px;
	border-radius: 12px;
	border: 1px solid transparent;
	background: 
		linear-gradient(${({ theme }) => theme.colors.card.interior}, ${({ theme }) => theme.colors.card.interior}) padding-box,
		${({ theme }) => theme.colors.card.borderGradient} border-box;
`;

const YearlyHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
`;

const YearlyTitle = styled.h3`
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
	margin: 0;
`;

const YearlyStats = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 12px;
	margin-bottom: 16px;
`;

const YearlyStat = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

const YearlyStatLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const YearlyStatValue = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ $color }) => $color || '#E6ECEC'};
`;

const CategoryList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	max-height: 300px;
	overflow-y: auto;
`;

const CategoryRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.04);
	
	&:last-child {
		border-bottom: none;
	}
`;

const CategoryName = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.primary};
	flex: 1;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const CategoryValues = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`;

const CategorySpent = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ $over }) => $over ? '#f87171' : '#E6ECEC'};
`;

const CategoryBudget = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const CategoryPercents = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	min-width: 55px;
`;

const CategoryPercent = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ $type }) => $type === 'income' ? '#4ade80' : '#E6ECEC'};
	opacity: ${({ $zero }) => $zero ? 0.4 : 1};
`;

// Monthly Breakdown
const MonthsGrid = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

const MonthCard = styled.div`
	padding: 16px;
	border-radius: 10px;
	border: 1px solid transparent;
	background: 
		linear-gradient(${({ theme }) => theme.colors.card.interior}, ${({ theme }) => theme.colors.card.interior}) padding-box,
		${({ theme }) => theme.colors.card.borderGradient} border-box;
`;

const MonthHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
`;

const MonthName = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const MonthTotal = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const MonthDetails = styled.div`
	margin-top: 12px;
	padding-top: 12px;
	border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const MonthIncomeRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 0;
	margin-bottom: 8px;
	border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	
	span {
		font-size: ${({ theme }) => theme.typography.sizes.sm};
		color: ${({ theme }) => theme.colors.text.muted};
	}
`;

const MonthIncome = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: #4ade80 !important;
`;

const ExpandIcon = styled.span`
	color: ${({ theme }) => theme.colors.text.muted};
	font-size: 12px;
`;

const MONTHS = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

export function BudgetHistory() {
	const currentYear = new Date().getFullYear();
	const [year, setYear] = useState(currentYear);
	const [expandedMonth, setExpandedMonth] = useState(null);
	
	const { months, yearlyTotals, isLoading, error } = useBudgetHistory(year);
	
	if (isLoading) {
		return <LoadingText>Loading budget history...</LoadingText>;
	}
	
	if (error) {
		return <LoadingText>Error loading budget history</LoadingText>;
	}
	
	const toggleMonth = (monthNum) => {
		setExpandedMonth(expandedMonth === monthNum ? null : monthNum);
	};
	
	// Filter categories with actual spending or budget
	const filterCategories = (categories) => {
		return categories.filter(c => c.spent > 0 || c.budget > 0);
	};
	
	return (
		<Container>
			<YearSelector>
				<YearButton onClick={() => setYear(year - 1)}>←</YearButton>
				<YearDisplay>{year}</YearDisplay>
				<YearButton 
					onClick={() => setYear(year + 1)}
					disabled={year >= currentYear}
				>
					→
				</YearButton>
			</YearSelector>
			
			{/* Yearly Summary */}
			{yearlyTotals && (
				<YearlyCard>
					<YearlyHeader>
						<YearlyTitle>Yearly Summary</YearlyTitle>
					</YearlyHeader>
					
					<YearlyStats>
						<YearlyStat>
							<YearlyStatLabel>Total Income</YearlyStatLabel>
							<YearlyStatValue $color="#4ade80">
								{formatCurrency(yearlyTotals.total_income)}
							</YearlyStatValue>
						</YearlyStat>
						<YearlyStat>
							<YearlyStatLabel>Total Expenses</YearlyStatLabel>
							<YearlyStatValue $color="#f87171">
								{formatCurrency(yearlyTotals.total_expenses)}
							</YearlyStatValue>
						</YearlyStat>
						<YearlyStat>
							<YearlyStatLabel>Total Budget</YearlyStatLabel>
							<YearlyStatValue>
								{formatCurrency(yearlyTotals.total_budget)}
							</YearlyStatValue>
						</YearlyStat>
						<YearlyStat>
							<YearlyStatLabel>Budget Diff</YearlyStatLabel>
							<YearlyStatValue $color={yearlyTotals.difference >= 0 ? '#4ade80' : '#f87171'}>
								{yearlyTotals.difference >= 0 ? '+' : ''}{formatCurrency(yearlyTotals.difference)}
							</YearlyStatValue>
						</YearlyStat>
					</YearlyStats>
					
					<CategoryList>
						{yearlyTotals.categories
							.filter(c => c.total_spent > 0 || c.yearly_budget > 0)
							.sort((a, b) => b.total_spent - a.total_spent)
							.map((cat) => (
								<CategoryRow key={cat.category_id}>
									<CategoryName>{cat.category_name}</CategoryName>
									<CategoryValues>
										<CategorySpent $over={cat.difference < 0}>
											{formatCurrency(cat.total_spent)}
										</CategorySpent>
										<CategoryBudget>/ {formatCurrency(cat.yearly_budget)}</CategoryBudget>
										<CategoryPercents>
											<CategoryPercent $zero={cat.pct_of_expenses === 0}>
												{cat.pct_of_expenses.toFixed(1)}% exp
											</CategoryPercent>
											<CategoryPercent $type="income" $zero={cat.pct_of_income === 0}>
												{cat.pct_of_income.toFixed(1)}% inc
											</CategoryPercent>
										</CategoryPercents>
									</CategoryValues>
								</CategoryRow>
							))}
					</CategoryList>
				</YearlyCard>
			)}
			
			{/* Monthly Breakdown */}
			<MonthsGrid>
				{months.map((monthData) => {
					const isExpanded = expandedMonth === monthData.month;
					const monthCategories = filterCategories(monthData.categories);
					
					return (
						<MonthCard key={monthData.month}>
							<MonthHeader onClick={() => toggleMonth(monthData.month)}>
								<MonthName>{MONTHS[monthData.month - 1]}</MonthName>
								<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
									<MonthTotal>{formatCurrency(monthData.total_expenses)}</MonthTotal>
									<ExpandIcon>{isExpanded ? '▼' : '▶'}</ExpandIcon>
								</div>
							</MonthHeader>
							
							{isExpanded && (
								<MonthDetails>
									<MonthIncomeRow>
										<span>Income:</span>
										<MonthIncome>{formatCurrency(monthData.total_income)}</MonthIncome>
									</MonthIncomeRow>
									{monthCategories
										.sort((a, b) => b.spent - a.spent)
										.map((cat) => (
											<CategoryRow key={cat.category_id}>
												<CategoryName>{cat.category_name}</CategoryName>
												<CategoryValues>
													<CategorySpent $over={cat.difference < 0}>
														{formatCurrency(cat.spent)}
													</CategorySpent>
													<CategoryBudget>/ {formatCurrency(cat.budget)}</CategoryBudget>
													<CategoryPercents>
														<CategoryPercent $zero={cat.pct_of_expenses === 0}>
															{cat.pct_of_expenses.toFixed(1)}% exp
														</CategoryPercent>
														<CategoryPercent $type="income" $zero={cat.pct_of_income === 0}>
															{cat.pct_of_income.toFixed(1)}% inc
														</CategoryPercent>
													</CategoryPercents>
												</CategoryValues>
											</CategoryRow>
										))}
								</MonthDetails>
							)}
						</MonthCard>
					);
				})}
			</MonthsGrid>
		</Container>
	);
}
