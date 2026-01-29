import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useInvestmentTransactions } from '../../hooks/useAPI';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { LoadingText } from '../../components/Layout';
import { formatCurrency, formatDate } from '../../utils/formatters';

const HistoryList = styled.div`
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
	display: inline-flex;
	align-items: center;
	gap: 6px;
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ $isDeposit }) => $isDeposit ? '#4ade80' : '#f87171'};
`;

const TypeBadge = styled.span`
	font-size: 10px;
	padding: 2px 6px;
	border-radius: 4px;
	background: ${({ $isDeposit }) => 
		$isDeposit ? 'rgba(74, 222, 128, 0.15)' : 'rgba(248, 113, 113, 0.15)'};
	color: ${({ $isDeposit }) => $isDeposit ? '#4ade80' : '#f87171'};
	text-transform: uppercase;
	font-weight: 600;
`;

const TransactionAccount = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	color: ${({ theme }) => theme.colors.text.primary};
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

const TransactionAmount = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ $isDeposit }) => $isDeposit ? '#4ade80' : '#f87171'};
`;

const EmptyState = styled.div`
	text-align: center;
	color: ${({ theme }) => theme.colors.text.muted};
	padding: ${({ theme }) => theme.spacing.xl};
`;

const LoadMoreContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: ${({ theme }) => theme.spacing.md} 0;
`;

const PAGE_SIZE = 20;

export function InvestmentHistory() {
	const [offset, setOffset] = useState(0);
	const [allTransactions, setAllTransactions] = useState([]);
	const [total, setTotal] = useState(0);
	
	const { transactions, count, isLoading, isFetching, error } = useInvestmentTransactions(PAGE_SIZE, offset);
	
	// Accumulate transactions as pages load
	useEffect(() => {
		if (transactions.length > 0) {
			if (offset === 0) {
				setAllTransactions(transactions);
			} else {
				setAllTransactions((prev) => {
					const existingIds = new Set(prev.map((t) => t.id));
					const newTx = transactions.filter((t) => !existingIds.has(t.id));
					return [...prev, ...newTx];
				});
			}
		}
		if (count > 0) {
			setTotal(count);
		}
	}, [transactions, count, offset]);
	
	const hasMore = allTransactions.length < total;
	
	const handleLoadMore = () => {
		setOffset((prev) => prev + PAGE_SIZE);
	};
	
	if (isLoading && offset === 0) {
		return <LoadingText>Loading transactions...</LoadingText>;
	}
	
	if (error) {
		return <LoadingText>Error loading transactions</LoadingText>;
	}
	
	if (allTransactions.length === 0) {
		return (
			<Card>
				<EmptyState>No investment transactions yet</EmptyState>
			</Card>
		);
	}
	
	return (
		<Card>
			<HistoryList>
				{allTransactions.map((tx) => {
					const isDeposit = tx.type === 'deposit';
					return (
						<TransactionItem key={tx.id}>
							<TransactionInfo>
								<TransactionType $isDeposit={isDeposit}>
									<TypeBadge $isDeposit={isDeposit}>
										{isDeposit ? 'IN' : 'OUT'}
									</TypeBadge>
									<TransactionAccount>{tx.account_name}</TransactionAccount>
								</TransactionType>
								{tx.description && (
									<TransactionDescription>{tx.description}</TransactionDescription>
								)}
								<TransactionDate>{formatDate(tx.date)}</TransactionDate>
							</TransactionInfo>
							<TransactionAmount $isDeposit={isDeposit}>
								{isDeposit ? '+' : '-'}{formatCurrency(tx.amount)}
							</TransactionAmount>
						</TransactionItem>
					);
				})}
			</HistoryList>
			{hasMore && (
				<LoadMoreContainer>
					<Button onClick={handleLoadMore} disabled={isFetching}>
						{isFetching ? 'Loading...' : 'Load More'}
					</Button>
				</LoadMoreContainer>
			)}
		</Card>
	);
}
