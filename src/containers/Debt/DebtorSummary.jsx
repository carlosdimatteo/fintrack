import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDebtsByDebtor } from '../../hooks/useAPI';
import { Card } from '../../components/Card';
import { LoadingText } from '../../components/Layout';

const DebtorList = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing.sm};
`;

const DebtorCard = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	border-radius: 12px;
	cursor: pointer;
	transition: all 0.15s ease;
	
	border: 1px solid transparent;
	background: 
		linear-gradient(${({ theme }) => theme.colors.card.interior}, ${({ theme }) => theme.colors.card.interior}) padding-box,
		${({ theme }) => theme.colors.card.borderGradient} border-box;
	
	&:hover {
		background: 
			linear-gradient(rgba(120, 180, 180, 0.08), rgba(120, 180, 180, 0.08)) padding-box,
			${({ theme }) => theme.colors.card.borderGradient} border-box;
	}
	
	&:active {
		transform: scale(0.98);
	}
`;

const DebtorInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

const DebtorName = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const TransactionCount = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const NetOwed = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 2px;
`;

const Amount = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ $positive }) => $positive ? '#4ade80' : '#f87171'};
`;

const OwedLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const EmptyState = styled.div`
	text-align: center;
	color: ${({ theme }) => theme.colors.text.muted};
	padding: ${({ theme }) => theme.spacing.xl};
`;

const SummaryCard = styled.div`
	display: flex;
	justify-content: space-around;
	padding: 16px;
	margin-bottom: ${({ theme }) => theme.spacing.md};
	border-radius: 12px;
	
	border: 1px solid transparent;
	background: 
		linear-gradient(${({ theme }) => theme.colors.card.interior}, ${({ theme }) => theme.colors.card.interior}) padding-box,
		${({ theme }) => theme.colors.card.borderGradient} border-box;
`;

const SummaryStat = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
`;

const StatValue = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ $color }) => $color || '#E6ECEC'};
`;

const StatLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

function formatCurrency(amount) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(Math.abs(amount));
}

export function DebtorSummary() {
	const navigate = useNavigate();
	const { debtors, isLoading, error } = useDebtsByDebtor();
	
	if (isLoading) {
		return <LoadingText>Loading debtors...</LoadingText>;
	}
	
	if (error) {
		return <LoadingText>Error loading debtors</LoadingText>;
	}
	
	// Calculate totals
	const totalOwedToYou = debtors
		.filter(d => d.net_owed > 0)
		.reduce((sum, d) => sum + d.net_owed, 0);
	
	const totalYouOwe = debtors
		.filter(d => d.net_owed < 0)
		.reduce((sum, d) => sum + Math.abs(d.net_owed), 0);
	
	const handleDebtorClick = (debtorId) => {
		navigate(`/debts/history/${debtorId}`);
	};
	
	if (debtors.length === 0) {
		return (
			<Card>
				<EmptyState>No debt records yet</EmptyState>
			</Card>
		);
	}
	
	return (
		<>
			<SummaryCard>
				<SummaryStat>
					<StatValue $color="#4ade80">{formatCurrency(totalOwedToYou)}</StatValue>
					<StatLabel>Owed to you</StatLabel>
				</SummaryStat>
				<SummaryStat>
					<StatValue $color="#f87171">{formatCurrency(totalYouOwe)}</StatValue>
					<StatLabel>You owe</StatLabel>
				</SummaryStat>
			</SummaryCard>
			
			<DebtorList>
				{debtors.map((debtor) => (
					<DebtorCard 
						key={debtor.debtor_id} 
						onClick={() => handleDebtorClick(debtor.debtor_id)}
					>
						<DebtorInfo>
							<DebtorName>{debtor.debtor_name}</DebtorName>
							<TransactionCount>
								{debtor.transaction_count} transaction{debtor.transaction_count !== 1 ? 's' : ''}
							</TransactionCount>
						</DebtorInfo>
						<NetOwed>
							<Amount $positive={debtor.net_owed > 0}>
								{formatCurrency(debtor.net_owed)}
							</Amount>
							<OwedLabel>
								{debtor.net_owed > 0 ? 'owes you' : debtor.net_owed < 0 ? 'you owe' : 'settled'}
							</OwedLabel>
						</NetOwed>
					</DebtorCard>
				))}
			</DebtorList>
		</>
	);
}
