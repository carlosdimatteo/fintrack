import {
	OverviewContent,
	RemainingRow,
	RemainingLabel,
	RemainingValue,
	SpentTotalRow,
	SpentTotal,
	SpentValue,
	CategoryGrid,
	CategoryCard,
	CategoryName,
	CategoryAmounts,
	CategorySpent,
	CategoryTotal,
} from './Budget.styles';
import { PageWrapper, PageHeader, PageTitle, LoadingText } from '../../components/Layout';
import { useBudgets } from '../../hooks/useAPI';
import { Card } from '../../components/Card';
import { ProgressBar } from '../../components/ProgressBar';

function getStatus(spent, total) {
	const percentage = (spent / total) * 100;
	if (percentage >= 100) return 'over';
	if (percentage >= 80) return 'warning';
	return 'ok';
}

export function Budget() {
	const { budgets, isLoading: loading } = useBudgets({
		placeholderData: [],
	});

	const totalAmount = budgets.reduce((acc, { amount }) => acc + amount, 0);
	const totalSpent = budgets.reduce((acc, { spent }) => acc + spent, 0);
	const remaining = totalAmount - totalSpent;

	if (loading) {
		return (
			<PageWrapper>
				<PageHeader>
					<PageTitle>Budget</PageTitle>
				</PageHeader>
				<LoadingText>Loading...</LoadingText>
			</PageWrapper>
		);
	}

	return (
		<PageWrapper>
			<PageHeader>
				<PageTitle>Budget</PageTitle>
			</PageHeader>

			{/* Overview Card */}
			<Card padding="16px">
				<OverviewContent>
					<RemainingRow>
						<RemainingLabel>Remaining</RemainingLabel>
						<RemainingValue>${remaining.toFixed(2)}</RemainingValue>
					</RemainingRow>
					<SpentTotalRow>
						<SpentTotal>
							<SpentValue $status={getStatus(totalSpent, totalAmount)}>
								${totalSpent.toFixed(2)}
							</SpentValue> / ${totalAmount.toFixed(2)}
						</SpentTotal>
					</SpentTotalRow>
					<ProgressBar value={totalSpent} max={totalAmount} showValue={false} size="small" />
				</OverviewContent>
			</Card>

			{/* Category Grid */}
			<CategoryGrid>
				{budgets.map(({ amount, spent, category_name: category }, index) => {
					const status = getStatus(spent, amount);
					return (
						<CategoryCard key={index}>
							<CategoryName>{category}</CategoryName>
							<CategoryAmounts>
								<CategorySpent $status={status}>${spent}</CategorySpent>
								<CategoryTotal>/ ${amount}</CategoryTotal>
							</CategoryAmounts>
						</CategoryCard>
					);
				})}
			</CategoryGrid>
		</PageWrapper>
	);
}
