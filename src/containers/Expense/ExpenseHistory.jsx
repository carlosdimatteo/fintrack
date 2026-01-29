import styled from 'styled-components';
import { Card } from '../../components/Card';
import { LoadingText } from '../../components/Layout';
import { useState, useEffect } from 'react';
import { useExpenseList } from '../../hooks/useAPI';

const HistoryList = styled.div`
	display: flex;
	flex-direction: column;
`;

const ExpenseItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 14px 0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	
	&:last-child {
		border-bottom: none;
	}
`;

const ExpenseInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	flex: 1;
	min-width: 0;
`;

const ExpenseCategory = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.primary};
`;

const ExpenseDescription = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.muted};
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const ExpenseMeta = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const ExpenseAmount = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 2px;
`;

const Amount = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: #f87171;
`;

const LoadMoreButton = styled.button`
	display: block;
	width: 100%;
	background: transparent;
	border: 1px solid rgba(120, 180, 180, 0.3);
	color: ${({ theme }) => theme.colors.accent.primary};
	padding: 12px;
	border-radius: 10px;
	cursor: pointer;
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	transition: all 0.15s ease;
	margin-top: ${({ theme }) => theme.spacing.md};
	text-align: center;

	&:hover {
		background: rgba(120, 180, 180, 0.1);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

const EmptyState = styled.div`
	text-align: center;
	color: ${({ theme }) => theme.colors.text.muted};
	padding: ${({ theme }) => theme.spacing.xl};
`;

function formatDate(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

function formatCurrency(amount) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
}

export function ExpenseHistory() {
	const [allExpenses, setAllExpenses] = useState([]);
	const [offset, setOffset] = useState(0);
	const [total, setTotal] = useState(0);
	const limit = 20;
	
	const { expenses, count, isLoading, isFetching, error } = useExpenseList(limit, offset);
	
	// Accumulate expenses when new data arrives
	useEffect(() => {
		if (expenses.length > 0) {
			if (offset === 0) {
				setAllExpenses(expenses);
			} else {
				setAllExpenses((prev) => {
					const existingIds = new Set(prev.map(e => e.id));
					const newExpenses = expenses.filter(e => !existingIds.has(e.id));
					return [...prev, ...newExpenses];
				});
			}
		}
		if (count > 0) {
			setTotal(count);
		}
	}, [expenses, count, offset]);
	
	const hasMore = allExpenses.length < total;
	
	const loadMore = () => {
		setOffset((prev) => prev + limit);
	};
	
	if (isLoading && allExpenses.length === 0) {
		return <LoadingText>Loading expenses...</LoadingText>;
	}
	
	if (error) {
		return <LoadingText>Error loading expenses</LoadingText>;
	}
	
	if (allExpenses.length === 0) {
		return (
			<Card>
				<EmptyState>No expenses recorded yet</EmptyState>
			</Card>
		);
	}
	
	return (
		<Card>
			<HistoryList>
				{allExpenses.map((expense) => (
					<ExpenseItem key={expense.id}>
						<ExpenseInfo>
							<ExpenseCategory>{expense.category}</ExpenseCategory>
							{expense.description && (
								<ExpenseDescription>{expense.description}</ExpenseDescription>
							)}
							<ExpenseMeta>
								{formatDate(expense.date)}
								{expense.account_name && ` • ${expense.account_name}`}
							</ExpenseMeta>
						</ExpenseInfo>
						<ExpenseAmount>
							<Amount>{formatCurrency(expense.expense)}</Amount>
						</ExpenseAmount>
					</ExpenseItem>
				))}
			</HistoryList>
			
			{hasMore && (
				<LoadMoreButton onClick={loadMore} disabled={isFetching}>
					{isFetching ? 'Loading...' : 'Load More'}
				</LoadMoreButton>
			)}
		</Card>
	);
}
