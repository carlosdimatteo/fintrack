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
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.secondary};
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
	color: ${({ $negative }) => $negative ? '#f87171' : '#4ade80'};
`;

const GoalValues = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const ProgressBarOuter = styled.div`
	height: 8px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 4px;
	overflow: hidden;
`;

const ProgressBarInner = styled.div`
	height: 100%;
	width: ${({ $percent }) => Math.min(Math.max($percent, 0), 100)}%;
	background: ${({ $color }) => $color || 'linear-gradient(135deg, #7a9e9f 0%, #5a8a8b 100%)'};
	border-radius: 4px;
	transition: width 0.3s ease;
`;


const NoGoals = styled.div`
	text-align: center;
	color: ${({ theme }) => theme.colors.text.muted};
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	padding: 12px;
`;

export function GoalsProgress({ goals, ytd }) {
	const fmt = usePrivateFormatters();
	
	const idealInvestmentProgress = goals?.ideal_investment 
		? ((ytd?.investment_deposits || 0) / goals.ideal_investment) * 100 
		: 0;
	
	if (!goals || (!goals.savings_goal && !goals.investment_goal && !goals.ideal_investment)) {
		return (
			<Container>
				<Title>Goals {goals?.year || new Date().getFullYear()}</Title>
				<NoGoals>No goals set for this year</NoGoals>
			</Container>
		);
	}
	
	const savingsProgress = goals.savings_goal 
		? ((ytd?.savings || 0) / goals.savings_goal) * 100 
		: 0;
	
	const investmentProgress = goals.investment_goal 
		? ((ytd?.investment_deposits || 0) / goals.investment_goal) * 100 
		: 0;
	
	return (
		<Container>
			<Title>Goals {goals.year}</Title>
			
			{goals.savings_goal > 0 && (
				<GoalItem>
					<GoalHeader>
						<GoalLabel>
							Savings Goal{' '}
							<GoalPercent $negative={savingsProgress < 0}>
								({savingsProgress.toFixed(1)}%)
							</GoalPercent>
						</GoalLabel>
						<GoalValues>
							{fmt.currency(ytd?.savings || 0)} / {fmt.currency(goals.savings_goal)}
						</GoalValues>
					</GoalHeader>
					<ProgressBarOuter>
						<ProgressBarInner 
							$percent={savingsProgress} 
							$color={savingsProgress >= 100 ? '#4ade80' : savingsProgress < 0 ? '#f87171' : undefined}
						/>
					</ProgressBarOuter>
				</GoalItem>
			)}
			
			{goals.investment_goal > 0 && (
				<GoalItem>
					<GoalHeader>
						<GoalLabel>
							Investment Goal{' '}
							<GoalPercent $negative={investmentProgress < 0}>
								({investmentProgress.toFixed(1)}%)
							</GoalPercent>
						</GoalLabel>
						<GoalValues>
							{fmt.currency(ytd?.investment_deposits || 0)} / {fmt.currency(goals.investment_goal)}
						</GoalValues>
					</GoalHeader>
					<ProgressBarOuter>
						<ProgressBarInner 
							$percent={investmentProgress} 
							$color={investmentProgress >= 100 ? '#4ade80' : undefined}
						/>
					</ProgressBarOuter>
				</GoalItem>
			)}
			
			{goals.ideal_investment > 0 && (
				<GoalItem>
					<GoalHeader>
						<GoalLabel>
							Ideal Investment{' '}
							<GoalPercent $negative={idealInvestmentProgress < 0}>
								({idealInvestmentProgress.toFixed(1)}%)
							</GoalPercent>
						</GoalLabel>
						<GoalValues>
							{fmt.currency(ytd?.investment_deposits || 0)} / {fmt.currency(goals.ideal_investment)}
						</GoalValues>
					</GoalHeader>
					<ProgressBarOuter>
						<ProgressBarInner 
							$percent={idealInvestmentProgress} 
							$color={idealInvestmentProgress >= 100 ? '#4ade80' : undefined}
						/>
					</ProgressBarOuter>
				</GoalItem>
			)}
		</Container>
	);
}
