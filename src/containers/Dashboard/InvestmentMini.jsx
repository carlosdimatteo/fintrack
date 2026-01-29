import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { formatPercent } from '../../utils/formatters';
import { usePrivateFormatters } from '../../hooks/usePrivateFormatters';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
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

const TitleRow = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const Title = styled.h3`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.secondary};
	margin: 0;
`;

const CurrentBadge = styled.span`
	font-size: 10px;
	padding: 2px 6px;
	border-radius: 4px;
	background: rgba(250, 204, 21, 0.15);
	color: #facc15;
	text-transform: uppercase;
	font-weight: 600;
`;

const ViewAllLink = styled.button`
	background: transparent;
	border: none;
	color: ${({ theme }) => theme.colors.accent.primary};
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	cursor: pointer;
	padding: 0;
	
	&:hover {
		text-decoration: underline;
	}
`;

const TotalPnL = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 12px;
	border-radius: 8px;
	background: ${({ $positive }) => 
		$positive ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)'};
`;

const TotalLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const TotalValue = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ $positive }) => $positive ? '#4ade80' : '#f87171'};
`;

const InvestmentList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

const InvestmentItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	
	&:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
`;

const InvestmentInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

const InvestmentName = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const InvestmentMeta = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const InvestmentStats = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 2px;
`;

const InvestmentBalance = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const InvestmentPnL = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ $positive }) => $positive ? '#4ade80' : '#f87171'};
`;

export function InvestmentMini({ investments, isHistorical = false }) {
	const navigate = useNavigate();
	const fmt = usePrivateFormatters();
	
	// Calculate total PnL
	const totalPnL = investments.reduce((sum, inv) => sum + (inv.pnl || 0), 0);
	const totalCapital = investments.reduce((sum, inv) => sum + (inv.total_capital || 0), 0);
	const totalPnLPercent = totalCapital > 0 ? (totalPnL / totalCapital) * 100 : 0;
	const totalPnLPositive = totalPnL >= 0;
	
	// Sort by balance descending
	const sortedInvestments = [...investments].sort((a, b) => 
		(b.real_balance || 0) - (a.real_balance || 0)
	);
	
	return (
		<Container>
			<Header>
				<TitleRow>
					<Title>Investment Accounts</Title>
					{isHistorical && <CurrentBadge>Current</CurrentBadge>}
				</TitleRow>
				<ViewAllLink onClick={() => navigate('/investment')}>
					View all →
				</ViewAllLink>
			</Header>
			
			<TotalPnL $positive={totalPnLPositive}>
				<TotalLabel>Total PnL</TotalLabel>
				<TotalValue $positive={totalPnLPositive}>
					{fmt.signedCurrency(totalPnL)} ({formatPercent(totalPnLPercent)})
				</TotalValue>
			</TotalPnL>
			
			<InvestmentList>
				{sortedInvestments.map((inv) => {
					const pnlPositive = (inv.pnl || 0) >= 0;
					return (
						<InvestmentItem key={inv.id}>
							<InvestmentInfo>
								<InvestmentName>{inv.name}</InvestmentName>
								<InvestmentMeta>
									{inv.type} • Capital: {fmt.currency(inv.total_capital || 0)}
								</InvestmentMeta>
							</InvestmentInfo>
							<InvestmentStats>
								<InvestmentBalance>{fmt.currency(inv.real_balance || 0)}</InvestmentBalance>
								<InvestmentPnL $positive={pnlPositive}>
									{fmt.signedCurrency(inv.pnl || 0)} ({formatPercent(inv.pnl_percent || 0)})
								</InvestmentPnL>
							</InvestmentStats>
						</InvestmentItem>
					);
				})}
			</InvestmentList>
		</Container>
	);
}
