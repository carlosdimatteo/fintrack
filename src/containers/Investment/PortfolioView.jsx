import styled from 'styled-components';
import { useInvestmentSummary } from '../../hooks/useAPI';
import { Card } from '../../components/Card';
import { LoadingText } from '../../components/Layout';
import { formatCurrency, formatPercent } from '../../utils/formatters';

const PortfolioContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing.md};
`;

const TotalCard = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
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
	color: ${({ theme }) => theme.colors.text.primary};
`;

const TotalPnL = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ $positive }) => $positive ? '#4ade80' : '#f87171'};
`;

const AccountList = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing.sm};
`;

const AccountCard = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	border-radius: 12px;
	
	border: 1px solid transparent;
	background: 
		linear-gradient(${({ theme }) => theme.colors.card.interior}, ${({ theme }) => theme.colors.card.interior}) padding-box,
		${({ theme }) => theme.colors.card.borderGradient} border-box;
`;

const AccountInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const AccountName = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const AccountType = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const AccountStats = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 2px;
`;

const AccountBalance = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const AccountPnL = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ $positive }) => $positive ? '#4ade80' : '#f87171'};
`;

const AccountCapital = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const EmptyState = styled.div`
	text-align: center;
	color: ${({ theme }) => theme.colors.text.muted};
	padding: ${({ theme }) => theme.spacing.xl};
`;

export function PortfolioView() {
	const { accounts, isLoading, error } = useInvestmentSummary();
	
	if (isLoading) {
		return <LoadingText>Loading portfolio...</LoadingText>;
	}
	
	if (error) {
		return <LoadingText>Error loading portfolio</LoadingText>;
	}
	
	if (accounts.length === 0) {
		return (
			<Card>
				<EmptyState>No investment accounts yet</EmptyState>
			</Card>
		);
	}
	
	// Calculate totals
	const totalBalance = accounts.reduce((sum, a) => sum + (a.real_balance || 0), 0);
	const totalCapital = accounts.reduce((sum, a) => sum + (a.total_capital || 0), 0);
	const totalPnL = totalBalance - totalCapital;
	const totalPnLPercent = totalCapital > 0 ? ((totalPnL / totalCapital) * 100) : 0;
	
	return (
		<PortfolioContainer>
			<TotalCard>
				<TotalLabel>Total Portfolio Value</TotalLabel>
				<TotalValue>{formatCurrency(totalBalance)}</TotalValue>
				<TotalPnL $positive={totalPnL >= 0}>
					{totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)} ({formatPercent(totalPnLPercent)})
				</TotalPnL>
			</TotalCard>
			
			<AccountList>
				{accounts.map((account) => (
					<AccountCard key={account.id}>
						<AccountInfo>
							<AccountName>{account.name}</AccountName>
							<AccountType>{account.type}</AccountType>
						</AccountInfo>
						<AccountStats>
							<AccountBalance>{formatCurrency(account.real_balance || 0)}</AccountBalance>
							<AccountPnL $positive={(account.pnl || 0) >= 0}>
								{(account.pnl || 0) >= 0 ? '+' : ''}{formatCurrency(account.pnl || 0)} ({formatPercent(account.pnl_percent || 0)})
							</AccountPnL>
							<AccountCapital>Capital: {formatCurrency(account.total_capital || 0)}</AccountCapital>
						</AccountStats>
					</AccountCard>
				))}
			</AccountList>
		</PortfolioContainer>
	);
}
