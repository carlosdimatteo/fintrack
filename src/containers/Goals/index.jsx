import { useState } from 'react';
import styled from 'styled-components';
import { PageWrapper, PageHeader, PageTitle, LoadingText } from '../../components/Layout';
import { useGoals, useDashboard } from '../../hooks/useAPI';
import { GoalsForm } from './GoalsForm';
import { GoalsView } from './GoalsView';

const YearSelector = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: ${({ theme }) => theme.spacing.lg};
	margin-bottom: ${({ theme }) => theme.spacing.md};
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

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing.lg};
`;

export function Goals() {
	const currentYear = new Date().getFullYear();
	const [year, setYear] = useState(currentYear);
	
	const { goals, isLoading: goalsLoading, refetch: refetchGoals } = useGoals(year);
	const { ytd, isLoading: dashboardLoading } = useDashboard(year, 12); // Get full year YTD
	
	const isLoading = goalsLoading || dashboardLoading;
	
	if (isLoading) {
		return (
			<PageWrapper>
				<PageHeader>
					<PageTitle>Goals</PageTitle>
				</PageHeader>
				<LoadingText>Loading goals...</LoadingText>
			</PageWrapper>
		);
	}
	
	return (
		<PageWrapper>
			<PageHeader>
				<PageTitle>Goals</PageTitle>
			</PageHeader>
			
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
			
			<ContentContainer>
				<GoalsView goals={goals} ytd={ytd} year={year} />
				<GoalsForm 
					goals={goals} 
					year={year} 
					onSuccess={refetchGoals}
				/>
			</ContentContainer>
		</PageWrapper>
	);
}
