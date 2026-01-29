import { useState } from 'react';
import styled from 'styled-components';
import { PageWrapper, PageHeader, PageTitle, LoadingText } from '../../components/Layout';
import { useDashboard } from '../../hooks/useAPI';
import { MonthSummary } from './MonthSummary';
import { YTDSummary } from './YTDSummary';
import { NetWorthCard } from './NetWorthCard';
import { GoalsProgress } from './GoalsProgress';
import { InvestmentMini } from './InvestmentMini';

const DashboardGrid = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing.lg};
`;

const PeriodSelector = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${({ theme }) => theme.spacing.md};
	padding: 12px;
	border-radius: 10px;
	background: rgba(255, 255, 255, 0.03);
`;

const PeriodButton = styled.button`
	background: transparent;
	border: none;
	color: ${({ theme }) => theme.colors.accent.primary};
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	cursor: pointer;
	padding: 4px 8px;
	border-radius: 6px;
	transition: all 0.15s ease;
	
	&:hover {
		background: rgba(120, 180, 180, 0.1);
	}
	
	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
`;

const PeriodDisplay = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 120px;
`;

const PeriodMonth = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const PeriodYear = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const MONTHS = [
	'', 'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

export function Dashboard() {
	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth() + 1;
	
	const [year, setYear] = useState(currentYear);
	const [month, setMonth] = useState(currentMonth);
	
	const { currentMonth: monthData, ytd, goals, netWorth, investments, isLoading, error } = useDashboard(year, month);
	
	const isCurrentPeriod = year === currentYear && month === currentMonth;
	
	const goToPrev = () => {
		if (month === 1) {
			setMonth(12);
			setYear(year - 1);
		} else {
			setMonth(month - 1);
		}
	};
	
	const goToNext = () => {
		if (month === 12) {
			setMonth(1);
			setYear(year + 1);
		} else {
			setMonth(month + 1);
		}
	};
	
	if (isLoading) {
		return (
			<PageWrapper>
				<PageHeader>
					<PageTitle>Dashboard</PageTitle>
				</PageHeader>
				<LoadingText>Loading dashboard...</LoadingText>
			</PageWrapper>
		);
	}
	
	if (error) {
		return (
			<PageWrapper>
				<PageHeader>
					<PageTitle>Dashboard</PageTitle>
				</PageHeader>
				<LoadingText>Error loading dashboard</LoadingText>
			</PageWrapper>
		);
	}
	
	return (
		<PageWrapper>
			<PageHeader>
				<PageTitle>Dashboard</PageTitle>
			</PageHeader>
			
			<PeriodSelector>
				<PeriodButton onClick={goToPrev}>←</PeriodButton>
				<PeriodDisplay>
					<PeriodMonth>{MONTHS[month]}</PeriodMonth>
					<PeriodYear>{year}</PeriodYear>
				</PeriodDisplay>
				<PeriodButton onClick={goToNext} disabled={isCurrentPeriod}>→</PeriodButton>
			</PeriodSelector>
			
			<DashboardGrid>
				{monthData && <MonthSummary data={monthData} />}
				
				{ytd && <YTDSummary data={ytd} />}
				
				{netWorth && <NetWorthCard data={netWorth} />}
				
				{goals && <GoalsProgress goals={goals} ytd={ytd} />}
				
				{investments.length > 0 && (
					<InvestmentMini investments={investments} isHistorical={!isCurrentPeriod} />
				)}
			</DashboardGrid>
		</PageWrapper>
	);
}
