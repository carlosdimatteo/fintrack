import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useDebtHistory, useDebtsByDebtor } from '../../hooks/useAPI';
import { Card } from '../../components/Card';
import { LoadingText } from '../../components/Layout';
import { formatDate } from '../../utils/formatters';
import { usePrivateFormatters } from '../../hooks/usePrivateFormatters';

const BackButton = styled.button`
	background: transparent;
	border: none;
	color: ${({ theme }) => theme.colors.accent.primary};
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	cursor: pointer;
	padding: 0;
	margin-bottom: ${({ theme }) => theme.spacing.md};
	display: flex;
	align-items: center;
	gap: 4px;
	
	&:hover {
		text-decoration: underline;
	}
`;

const DebtorHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DebtorName = styled.h2`
	font-size: ${({ theme }) => theme.typography.sizes.xl};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
	margin: 0;
`;

const NetBalance = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const BalanceAmount = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xl};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ $positive }) => $positive ? '#4ade80' : '#f87171'};
`;

const BalanceLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const TransactionList = styled.div`
	display: flex;
	flex-direction: column;
`;

const TransactionItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 14px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	
	&:last-child {
		border-bottom: none;
	}
`;

const TransactionInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	flex: 1;
	min-width: 0;
`;

const TransactionType = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ $outbound }) => $outbound ? '#4ade80' : '#f87171'};
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

const TransactionDescription = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.muted};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const TransactionDate = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const LinkedBadge = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 4px;
	font-size: 10px;
	padding: 2px 6px;
	border-radius: 4px;
	background: ${({ $type }) => 
		$type === 'expense' 
			? 'rgba(248, 113, 113, 0.15)' 
			: 'rgba(74, 222, 128, 0.15)'};
	color: ${({ $type }) => 
		$type === 'expense' ? '#f87171' : '#4ade80'};
	text-transform: uppercase;
	font-weight: 600;
`;

const TransactionAmount = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ $outbound }) => $outbound ? '#4ade80' : '#f87171'};
`;

const EmptyState = styled.div`
	text-align: center;
	color: ${({ theme }) => theme.colors.text.muted};
	padding: ${({ theme }) => theme.spacing.xl};
`;

export function DebtHistory() {
	const { debtorId } = useParams();
	const navigate = useNavigate();
	const fmt = usePrivateFormatters();
	
	const { debts, isLoading, error } = useDebtHistory(debtorId);
	const { debtors } = useDebtsByDebtor();
	
	// Find the debtor info
	const debtorInfo = debtors.find(d => d.debtor_id === Number(debtorId));
	
	if (isLoading) {
		return <LoadingText>Loading history...</LoadingText>;
	}
	
	if (error) {
		return <LoadingText>Error loading history</LoadingText>;
	}
	
	return (
		<>
			<BackButton onClick={() => navigate('/debts')}>
				← Back to overview
			</BackButton>
			
			{debtorInfo && (
				<DebtorHeader>
					<DebtorName>{debtorInfo.debtor_name}</DebtorName>
					<NetBalance>
						<BalanceAmount $positive={debtorInfo.net_owed > 0}>
							{fmt.currency(debtorInfo.net_owed)}
						</BalanceAmount>
						<BalanceLabel>
							{debtorInfo.net_owed > 0 ? 'owes you' : debtorInfo.net_owed < 0 ? 'you owe' : 'settled'}
						</BalanceLabel>
					</NetBalance>
				</DebtorHeader>
			)}
			
			<Card>
				{debts.length === 0 ? (
					<EmptyState>No transactions with this person</EmptyState>
				) : (
					<TransactionList>
						{debts.map((debt) => (
							<TransactionItem key={debt.id}>
								<TransactionInfo>
									<TransactionType $outbound={debt.outbound}>
										{debt.outbound ? 'Lent' : 'Received'}
										{debt.expense_id && (
											<LinkedBadge $type="expense">Expense</LinkedBadge>
										)}
										{debt.income_id && (
											<LinkedBadge $type="income">Income</LinkedBadge>
										)}
									</TransactionType>
									{debt.description && (
										<TransactionDescription>{debt.description}</TransactionDescription>
									)}
									<TransactionDate>{formatDate(debt.date)}</TransactionDate>
								</TransactionInfo>
								<TransactionAmount $outbound={debt.outbound}>
									{debt.outbound ? '+' : '-'}{fmt.currency(debt.amount)}
								</TransactionAmount>
							</TransactionItem>
						))}
					</TransactionList>
				)}
			</Card>
		</>
	);
}
