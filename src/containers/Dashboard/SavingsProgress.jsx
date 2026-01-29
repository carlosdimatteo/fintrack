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

const Section = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const SectionTitle = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const NetWorthRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const NetWorthLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const NetWorthValue = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const GoalItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 12px;
	background: rgba(255, 255, 255, 0.02);
	border-radius: 8px;
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

const GoalValues = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const GoalAmount = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const GoalRemaining = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ $complete }) => $complete ? '#4ade80' : '#f59e0b'};
`;

const ProgressBarOuter = styled.div`
	height: 6px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 3px;
	overflow: hidden;
`;

const ProgressBarInner = styled.div`
	height: 100%;
	width: ${({ $percent }) => Math.min(Math.max($percent, 0), 100)}%;
	background: ${({ $color }) => $color || 'linear-gradient(135deg, #7a9e9f 0%, #5a8a8b 100%)'};
	border-radius: 3px;
	transition: width 0.3s ease;
`;

const NoData = styled.div`
	text-align: center;
	color: ${({ theme }) => theme.colors.text.muted};
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	padding: 12px;
`;

export function SavingsProgress({ data, goals }) {
	const fmt = usePrivateFormatters();
	
	if (!data) {
		return (
			<Container>
				<Title>Savings Progress</Title>
				<NoData>No savings data available</NoData>
			</Container>
		);
	}
	
	const savingsGoal = goals?.savings_goal || 0;
	const hasGoal = savingsGoal > 0;
	
	return (
		<Container>
			<Title>Savings Progress</Title>
			
			{/* Net Worth Variations */}
			<Section>
				<SectionTitle>Net Worth Calculations</SectionTitle>
				<NetWorthRow>
					<NetWorthLabel>Real Net Worth</NetWorthLabel>
					<NetWorthValue>{fmt.currency(data.current_net_worth)}</NetWorthValue>
				</NetWorthRow>
				<NetWorthRow>
					<NetWorthLabel>Without Broker PnL</NetWorthLabel>
					<NetWorthValue>{fmt.currency(data.current_without_broker_winnings)}</NetWorthValue>
				</NetWorthRow>
				<NetWorthRow>
					<NetWorthLabel>Without Any PnL</NetWorthLabel>
					<NetWorthValue>{fmt.currency(data.current_without_winnings)}</NetWorthValue>
				</NetWorthRow>
			</Section>
			
			{/* Savings Goal Progress */}
			{hasGoal && (
				<Section>
					<SectionTitle>Goal Progress ({fmt.currency(savingsGoal)})</SectionTitle>
					
					{/* Real savings */}
					<GoalItem>
						<GoalHeader>
							<GoalLabel>Using Real Balances</GoalLabel>
							<GoalPercent $negative={data.percentage < 0}>
								{data.percentage.toFixed(1)}%
							</GoalPercent>
						</GoalHeader>
						<ProgressBarOuter>
							<ProgressBarInner 
								$percent={data.percentage} 
								$color={data.percentage >= 100 ? '#4ade80' : data.percentage < 0 ? '#f87171' : undefined}
							/>
						</ProgressBarOuter>
						<GoalValues>
							<GoalAmount>Saved: {fmt.currency(data.saved_this_year)}</GoalAmount>
							<GoalRemaining $complete={data.remaining <= 0}>
								{data.remaining > 0 ? `${fmt.currency(data.remaining)} to go` : 'Goal reached!'}
							</GoalRemaining>
						</GoalValues>
					</GoalItem>
					
					{/* Without broker winnings */}
					<GoalItem>
						<GoalHeader>
							<GoalLabel>Without Broker PnL</GoalLabel>
							<GoalPercent $negative={data.percentage_without_broker < 0}>
								{data.percentage_without_broker.toFixed(1)}%
							</GoalPercent>
						</GoalHeader>
						<ProgressBarOuter>
							<ProgressBarInner 
								$percent={data.percentage_without_broker} 
								$color={data.percentage_without_broker >= 100 ? '#4ade80' : data.percentage_without_broker < 0 ? '#f87171' : undefined}
							/>
						</ProgressBarOuter>
						<GoalValues>
							<GoalAmount>Saved: {fmt.currency(data.saved_without_broker_winnings)}</GoalAmount>
							<GoalRemaining $complete={data.remaining_without_broker <= 0}>
								{data.remaining_without_broker > 0 ? `${fmt.currency(data.remaining_without_broker)} to go` : 'Goal reached!'}
							</GoalRemaining>
						</GoalValues>
					</GoalItem>
					
					{/* Without any winnings */}
					<GoalItem>
						<GoalHeader>
							<GoalLabel>Without Any PnL</GoalLabel>
							<GoalPercent $negative={data.percentage_without_winnings < 0}>
								{data.percentage_without_winnings.toFixed(1)}%
							</GoalPercent>
						</GoalHeader>
						<ProgressBarOuter>
							<ProgressBarInner 
								$percent={data.percentage_without_winnings} 
								$color={data.percentage_without_winnings >= 100 ? '#4ade80' : data.percentage_without_winnings < 0 ? '#f87171' : undefined}
							/>
						</ProgressBarOuter>
						<GoalValues>
							<GoalAmount>Saved: {fmt.currency(data.saved_without_winnings)}</GoalAmount>
							<GoalRemaining $complete={data.remaining_without_winnings <= 0}>
								{data.remaining_without_winnings > 0 ? `${fmt.currency(data.remaining_without_winnings)} to go` : 'Goal reached!'}
							</GoalRemaining>
						</GoalValues>
					</GoalItem>
				</Section>
			)}
			
			{!hasGoal && (
				<NoData>Set a savings goal to track progress</NoData>
			)}
		</Container>
	);
}
