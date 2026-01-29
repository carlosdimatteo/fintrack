import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useIncomeList } from '../../hooks/useAPI';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { LoadingText } from '../../components/Layout';
import { formatDateTime } from '../../utils/formatters';
import { usePrivateFormatters } from '../../hooks/usePrivateFormatters';

const HistoryList = styled.div`
	display: flex;
	flex-direction: column;
`;

const IncomeItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 14px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	
	&:last-child {
		border-bottom: none;
	}
`;

const IncomeInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	flex: 1;
	min-width: 0;
`;

const IncomeAccount = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const IncomeDescription = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.muted};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const IncomeMeta = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const Amount = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: #4ade80;
`;

const LoadMoreContainer = styled.div`
	display: flex;
	justify-content: center;
	padding: ${({ theme }) => theme.spacing.md} 0;
`;

const EmptyState = styled.div`
	text-align: center;
	color: ${({ theme }) => theme.colors.text.muted};
	padding: ${({ theme }) => theme.spacing.xl};
`;

const PAGE_SIZE = 20;

export function IncomeHistory() {
	const [offset, setOffset] = useState(0);
	const [allIncomes, setAllIncomes] = useState([]);
	const [total, setTotal] = useState(0);
	const fmt = usePrivateFormatters();
	
	const { incomes, count, isLoading, isFetching, error } = useIncomeList(PAGE_SIZE, offset);
	
	// Accumulate incomes as pages load
	useEffect(() => {
		if (incomes.length > 0) {
			if (offset === 0) {
				setAllIncomes(incomes);
			} else {
				setAllIncomes((prev) => {
					const existingIds = new Set(prev.map((i) => i.id));
					const newIncomes = incomes.filter((i) => !existingIds.has(i.id));
					return [...prev, ...newIncomes];
				});
			}
		}
		if (count > 0) {
			setTotal(count);
		}
	}, [incomes, count, offset]);
	
	const hasMore = allIncomes.length < total;
	
	const handleLoadMore = () => {
		setOffset((prev) => prev + PAGE_SIZE);
	};
	
	if (isLoading && offset === 0) {
		return <LoadingText>Loading income history...</LoadingText>;
	}
	
	if (error) {
		return <LoadingText>Error loading income history</LoadingText>;
	}
	
	if (allIncomes.length === 0) {
		return (
			<Card>
				<EmptyState>No income recorded yet</EmptyState>
			</Card>
		);
	}
	
	return (
		<Card>
			<HistoryList>
				{allIncomes.map((income) => (
					<IncomeItem key={income.id}>
						<IncomeInfo>
							<IncomeAccount>{income.account_name}</IncomeAccount>
							{income.description && (
								<IncomeDescription>{income.description}</IncomeDescription>
							)}
							<IncomeMeta>
								{formatDateTime(income.date)}
							</IncomeMeta>
						</IncomeInfo>
						<Amount>+{fmt.currency(income.amount)}</Amount>
					</IncomeItem>
				))}
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
