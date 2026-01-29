import styled from 'styled-components';
import { formatPercent } from '../../utils/formatters';
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

const Header = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const Title = styled.h3`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.secondary};
	margin: 0;
`;

const TotalValue = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes['2xl']};
	font-weight: ${({ theme }) => theme.typography.weights.bold};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const TotalPnL = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ $positive }) => $positive ? '#4ade80' : '#f87171'};
`;

const Section = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding-top: 12px;
	border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const SectionTitle = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const BreakdownList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const BreakdownItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const BreakdownLabel = styled.span`
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const ColorDot = styled.span`
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: ${({ $color }) => $color};
`;

const BreakdownValues = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 1px;
`;

const BreakdownValue = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const BreakdownPnL = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ $positive }) => $positive ? '#4ade80' : '#f87171'};
`;

const ExpectedVsReal = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const CompareRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const CompareLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const CompareValue = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ $color }) => $color || '#E6ECEC'};
`;

const DiscrepancyAlert = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 12px;
	border-radius: 8px;
	background: ${({ $severe }) => $severe ? 'rgba(248, 113, 113, 0.1)' : 'rgba(250, 204, 21, 0.1)'};
	border: 1px solid ${({ $severe }) => $severe ? 'rgba(248, 113, 113, 0.3)' : 'rgba(250, 204, 21, 0.3)'};
`;

const DiscrepancyLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ $severe }) => $severe ? '#f87171' : '#facc15'};
`;

const DiscrepancyValue = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ $severe }) => $severe ? '#f87171' : '#facc15'};
`;

export function NetWorthCard({ data }) {
	const fmt = usePrivateFormatters();
	
	const discrepancy = Math.abs(data.fiat_discrepancy || 0);
	const hasDiscrepancy = discrepancy > 50;
	const severeDiscrepancy = discrepancy > 500;
	
	const totalPnL = data.total_pnl || 0;
	const totalPnLPositive = totalPnL >= 0;
	
	// Calculate PnL percentages
	const cryptoPnL = (data.crypto_balance || 0) - (data.crypto_capital || 0);
	const brokerPnL = (data.broker_balance || 0) - (data.broker_capital || 0);
	const cryptoPnLPercent = data.crypto_capital ? (cryptoPnL / data.crypto_capital) * 100 : 0;
	const brokerPnLPercent = data.broker_capital ? (brokerPnL / data.broker_capital) * 100 : 0;
	
	return (
		<Container>
			<Header>
				<Title>Net Worth</Title>
				<TotalValue>{fmt.currency(data.total_real_net_worth)}</TotalValue>
				<TotalPnL $positive={totalPnLPositive}>
					Total PnL: {fmt.signedCurrency(totalPnL)}
				</TotalPnL>
			</Header>
			
			<Section>
				<SectionTitle>Asset Breakdown</SectionTitle>
				<BreakdownList>
					<BreakdownItem>
						<BreakdownLabel>
							<ColorDot $color="#4ade80" />
							Fiat ({(data.fiat_percent || 0).toFixed(1)}%)
						</BreakdownLabel>
						<BreakdownValue>{fmt.currency(data.total_fiat_balance)}</BreakdownValue>
					</BreakdownItem>
					<BreakdownItem>
						<BreakdownLabel>
							<ColorDot $color="#f59e0b" />
							Crypto ({(data.crypto_percent || 0).toFixed(1)}%)
						</BreakdownLabel>
						<BreakdownValues>
							<BreakdownValue>{fmt.currency(data.crypto_balance)}</BreakdownValue>
							<BreakdownPnL $positive={cryptoPnL >= 0}>
								{fmt.signedCurrency(cryptoPnL)} ({formatPercent(cryptoPnLPercent)})
							</BreakdownPnL>
						</BreakdownValues>
					</BreakdownItem>
					<BreakdownItem>
						<BreakdownLabel>
							<ColorDot $color="#60a5fa" />
							Broker ({(data.broker_percent || 0).toFixed(1)}%)
						</BreakdownLabel>
						<BreakdownValues>
							<BreakdownValue>{fmt.currency(data.broker_balance)}</BreakdownValue>
							<BreakdownPnL $positive={brokerPnL >= 0}>
								{fmt.signedCurrency(brokerPnL)} ({formatPercent(brokerPnLPercent)})
							</BreakdownPnL>
						</BreakdownValues>
					</BreakdownItem>
				</BreakdownList>
			</Section>
			
			<Section>
				<SectionTitle>Expected vs Real</SectionTitle>
				<ExpectedVsReal>
					<CompareRow>
						<CompareLabel>Expected Fiat</CompareLabel>
						<CompareValue>{fmt.currency(data.expected_fiat_balance)}</CompareValue>
					</CompareRow>
					<CompareRow>
						<CompareLabel>Real Fiat</CompareLabel>
						<CompareValue $color="#4ade80">{fmt.currency(data.total_fiat_balance)}</CompareValue>
					</CompareRow>
					<CompareRow>
						<CompareLabel>Expected Net Worth</CompareLabel>
						<CompareValue>{fmt.currency(data.expected_net_worth)}</CompareValue>
					</CompareRow>
					<CompareRow>
						<CompareLabel>Real Net Worth</CompareLabel>
						<CompareValue $color="#4ade80">{fmt.currency(data.total_real_net_worth)}</CompareValue>
					</CompareRow>
				</ExpectedVsReal>
			</Section>
			
			{hasDiscrepancy && (
				<DiscrepancyAlert $severe={severeDiscrepancy}>
					<DiscrepancyLabel $severe={severeDiscrepancy}>
						{severeDiscrepancy ? 'Large discrepancy!' : 'Balance discrepancy'}
					</DiscrepancyLabel>
					<DiscrepancyValue $severe={severeDiscrepancy}>
						{fmt.currency(data.fiat_discrepancy)}
					</DiscrepancyValue>
				</DiscrepancyAlert>
			)}
		</Container>
	);
}
