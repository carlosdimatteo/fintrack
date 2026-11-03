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
import { LoadingText } from '../../components/Layout';
import { useBudgets } from '../../hooks/useAPI';
import { Card } from '../../components/Card';
import { ProgressBar } from '../../components/ProgressBar';

function getStatus(spent, total) {
	const percentage = (spent / total) * 100;
	if (percentage >= 100) return 'over';
	if (percentage >= 80) return 'warning';
	return 'ok';
}

export function BudgetCurrent() {
	const { budgets, isLoading: loading } = useBudgets({
		placeholderData: [],
	});

	// A rolled-up category's spend counts in its parent's budget, so only parents' amounts add up.
	const totalAmount = budgets
		.filter((b) => !b.rollup_category_id)
		.reduce((acc, { amount }) => acc + amount, 0);
	const totalSpent = budgets.reduce((acc, { spent }) => acc + spent, 0);
	const remaining = totalAmount - totalSpent;

	if (loading) {
		return <LoadingText>Loading...</LoadingText>;
	}

	return (
		<>
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
				{budgets.map((b) => (
					<CategoryCard key={b.category_id}>
						<CategoryName>{b.category_name}</CategoryName>
						{b.rollup_category_id ? (
							<CategoryAmounts>
								<CategorySpent>${b.spent.toFixed(2)}</CategorySpent>
								<CategoryTotal>→ counts toward {b.rollup_category_name}</CategoryTotal>
							</CategoryAmounts>
						) : b.evaluate_ytd ? (
							<>
								<CategoryAmounts>
									<CategorySpent $status={b.status}>${b.ytd_actual.toFixed(2)}</CategorySpent>
									<CategoryTotal>/ ${b.ytd_budget.toFixed(2)} this year so far</CategoryTotal>
								</CategoryAmounts>
								<CategoryTotal>
									This month ${b.actual.toFixed(2)} / ${b.amount} · Year ${b.full_year_budget.toFixed(2)}
								</CategoryTotal>
							</>
						) : (
							<CategoryAmounts>
								<CategorySpent $status={b.status}>${b.actual.toFixed(2)}</CategorySpent>
								<CategoryTotal>/ ${b.amount}</CategoryTotal>
							</CategoryAmounts>
						)}
						{b.lent > 0 && <CategoryTotal>+ ${b.lent.toFixed(2)} lent, not counted</CategoryTotal>}
						{b.notes && <CategoryTotal>{b.notes}</CategoryTotal>}
					</CategoryCard>
				))}
			</CategoryGrid>
		</>
	);
}
