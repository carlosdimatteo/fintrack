import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTransfers } from '../../hooks/useAPI';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { LoadingText } from '../../components/Layout';
import { formatCurrency, formatDate } from '../../utils/formatters';

const HistoryList = styled.div`
	display: flex;
	flex-direction: column;
`;

const TransferItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 14px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	
	&:last-child {
		border-bottom: none;
	}
`;

const TransferInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	flex: 1;
	min-width: 0;
`;

const TransferAccounts = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const AccountName = styled.span`
	font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

const Arrow = styled.span`
	color: ${({ theme }) => theme.colors.accent.primary};
`;

const TransferDescription = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.muted};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const TransferDate = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const TransferAmounts = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 2px;
`;

const Amount = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const ExchangeRate = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
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

export function TransferHistory() {
	const [offset, setOffset] = useState(0);
	const [allTransfers, setAllTransfers] = useState([]);
	const [total, setTotal] = useState(0);
	
	const { transfers, count, isLoading, isFetching, error } = useTransfers(PAGE_SIZE, offset);
	
	// Accumulate transfers as pages load
	useEffect(() => {
		if (transfers.length > 0) {
			if (offset === 0) {
				setAllTransfers(transfers);
			} else {
				setAllTransfers((prev) => {
					const existingIds = new Set(prev.map((t) => t.id));
					const newTransfers = transfers.filter((t) => !existingIds.has(t.id));
					return [...prev, ...newTransfers];
				});
			}
		}
		if (count > 0) {
			setTotal(count);
		}
	}, [transfers, count, offset]);
	
	const hasMore = allTransfers.length < total;
	
	const handleLoadMore = () => {
		setOffset((prev) => prev + PAGE_SIZE);
	};
	
	if (isLoading && offset === 0) {
		return <LoadingText>Loading transfers...</LoadingText>;
	}
	
	if (error) {
		return <LoadingText>Error loading transfers</LoadingText>;
	}
	
	if (allTransfers.length === 0) {
		return (
			<Card>
				<EmptyState>No transfers yet</EmptyState>
			</Card>
		);
	}
	
	return (
		<Card>
			<HistoryList>
				{allTransfers.map((transfer) => {
					const hasDifferentAmounts = transfer.source_amount !== transfer.dest_amount;
					const exchangeRate = hasDifferentAmounts 
						? (transfer.dest_amount / transfer.source_amount).toFixed(4)
						: null;
					
					return (
						<TransferItem key={transfer.id}>
							<TransferInfo>
								<TransferAccounts>
									<AccountName>{transfer.source_account_name}</AccountName>
									<Arrow>→</Arrow>
									<AccountName>{transfer.dest_account_name}</AccountName>
								</TransferAccounts>
								{transfer.description && (
									<TransferDescription>{transfer.description}</TransferDescription>
								)}
								<TransferDate>{formatDate(transfer.date)}</TransferDate>
							</TransferInfo>
							<TransferAmounts>
								<Amount>{formatCurrency(transfer.source_amount)}</Amount>
								{hasDifferentAmounts && (
									<>
										<Amount style={{ fontSize: '13px', opacity: 0.8 }}>
											→ {formatCurrency(transfer.dest_amount)}
										</Amount>
										<ExchangeRate>Rate: {exchangeRate}</ExchangeRate>
									</>
								)}
							</TransferAmounts>
						</TransferItem>
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
