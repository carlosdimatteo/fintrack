import styled from 'styled-components';
import { usePrivateFormatters } from '../../hooks/usePrivateFormatters';

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

const Title = styled.h3`
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
	margin: 0;
`;

const GoalItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const GoalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const GoalLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const GoalPercent = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ $negative, $complete }) => 
		$complete ? '#4ade80' : $negative ? '#f87171' : '#facc15'};
`;

const GoalValues = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const GoalActual = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const GoalTarget = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const ProgressBarOuter = styled.div`
	height: 10px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 5px;
	overflow: hidden;
`;

const ProgressBarInner = styled.div`
	height: 100%;
	width: ${({ $percent }) => Math.min(Math.max($percent, 0), 100)}%;
	background: ${({ $color }) => $color || 'linear-gradient(135deg, #7a9e9f 0%, #5a8a8b 100%)'};
	border-radius: 5px;
	transition: width 0.3s ease;
`;

const ProjectedSection = styled.div`
	padding-top: 12px;
	border-top: 1px solid rgba(255, 255, 255, 0.06);
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const ProjectedLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const ProjectedValue = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ $positive }) => $positive ? '#4ade80' : '#f87171'};
`;

const NoGoals = styled.div`
	text-align: center;
	color: ${({ theme }) => theme.colors.text.muted};
	padding: 20px;
`;

export function GoalsView({ goals, ytd, year }) {
	const fmt = usePrivateFormatters();
	
	if (!goals) {
		return (
			<Container>
				<Title>Progress {year}</Title>
				<NoGoals>No goals set for {year}. Set your goals below!</NoGoals>
			</Container>
		);
	}
	
	const currentMonth = new Date().getMonth() + 1;
	const currentYear = new Date().getFullYear();
	const monthsElapsed = year === currentYear ? currentMonth : 12;
	const monthsRemaining = 12 - monthsElapsed;
	
	// Calculate progress
	const savingsActual = ytd?.savings || 0;
	const investmentActual = ytd?.investment_deposits || 0;
	
	const savingsProgress = goals.savings_goal 
		? (savingsActual / goals.savings_goal) * 100 
		: 0;
	const investmentProgress = goals.investment_goal 
		? (investmentActual / goals.investment_goal) * 100 
		: 0;
	const idealProgress = goals.ideal_investment 
		? (investmentActual / goals.ideal_investment) * 100 
		: 0;
	
	// Project year-end (simple linear extrapolation)
	const monthlyRateSavings = monthsElapsed > 0 ? savingsActual / monthsElapsed : 0;
	const monthlyRateInvestment = monthsElapsed > 0 ? investmentActual / monthsElapsed : 0;
	
	const projectedSavings = savingsActual + (monthlyRateSavings * monthsRemaining);
	const projectedInvestment = investmentActual + (monthlyRateInvestment * monthsRemaining);
	
	const getProgressColor = (percent) => {
		if (percent >= 100) return '#4ade80';
		if (percent < 0) return '#f87171';
		return undefined; // default gradient
	};
	
	return (
		<Container>
			<Title>Progress {year}</Title>
			
			{goals.savings_goal > 0 && (
				<GoalItem>
					<GoalHeader>
						<GoalLabel>
							Savings Goal{' '}
							<GoalPercent 
								$negative={savingsProgress < 0} 
								$complete={savingsProgress >= 100}
							>
								({savingsProgress.toFixed(1)}%)
							</GoalPercent>
						</GoalLabel>
					</GoalHeader>
					<ProgressBarOuter>
						<ProgressBarInner 
							$percent={savingsProgress} 
							$color={getProgressColor(savingsProgress)}
						/>
					</ProgressBarOuter>
					<GoalValues>
						<GoalActual>{fmt.currency(savingsActual)}</GoalActual>
						<GoalTarget>/ {fmt.currency(goals.savings_goal)}</GoalTarget>
					</GoalValues>
				</GoalItem>
			)}
			
			{goals.investment_goal > 0 && (
				<GoalItem>
					<GoalHeader>
						<GoalLabel>
							Investment Goal{' '}
							<GoalPercent 
								$negative={investmentProgress < 0} 
								$complete={investmentProgress >= 100}
							>
								({investmentProgress.toFixed(1)}%)
							</GoalPercent>
						</GoalLabel>
					</GoalHeader>
					<ProgressBarOuter>
						<ProgressBarInner 
							$percent={investmentProgress} 
							$color={getProgressColor(investmentProgress)}
						/>
					</ProgressBarOuter>
					<GoalValues>
						<GoalActual>{fmt.currency(investmentActual)}</GoalActual>
						<GoalTarget>/ {fmt.currency(goals.investment_goal)}</GoalTarget>
					</GoalValues>
				</GoalItem>
			)}
			
			{goals.ideal_investment > 0 && (
				<GoalItem>
					<GoalHeader>
						<GoalLabel>
							Ideal Investment{' '}
							<GoalPercent 
								$negative={idealProgress < 0} 
								$complete={idealProgress >= 100}
							>
								({idealProgress.toFixed(1)}%)
							</GoalPercent>
						</GoalLabel>
					</GoalHeader>
					<ProgressBarOuter>
						<ProgressBarInner 
							$percent={idealProgress} 
							$color={getProgressColor(idealProgress)}
						/>
					</ProgressBarOuter>
					<GoalValues>
						<GoalActual>{fmt.currency(investmentActual)}</GoalActual>
						<GoalTarget>/ {fmt.currency(goals.ideal_investment)}</GoalTarget>
					</GoalValues>
				</GoalItem>
			)}
			
			{year === currentYear && monthsRemaining > 0 && (
				<ProjectedSection>
					<ProjectedLabel>Projected Year-End (at current pace)</ProjectedLabel>
					{goals.savings_goal > 0 && (
						<ProjectedValue $positive={projectedSavings >= goals.savings_goal}>
							Savings: {fmt.currency(projectedSavings)} 
							{projectedSavings >= goals.savings_goal ? ' ✓' : ` (${fmt.currency(goals.savings_goal - projectedSavings)} short)`}
						</ProjectedValue>
					)}
					{goals.investment_goal > 0 && (
						<ProjectedValue $positive={projectedInvestment >= goals.investment_goal}>
							Investment: {fmt.currency(projectedInvestment)}
							{projectedInvestment >= goals.investment_goal ? ' ✓' : ` (${fmt.currency(goals.investment_goal - projectedInvestment)} short)`}
						</ProjectedValue>
					)}
				</ProjectedSection>
			)}
		</Container>
	);
}
