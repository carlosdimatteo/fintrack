import {
	BudgetAmount,
	BudgetContainer,
	BudgetItem,
	BudgetItemTitle,
	BudgetList,
	BudgetTitle,
} from './Budget.styles';
import { useBudgets } from '../../hooks/useAPI';

export function Budget() {
	const { budgets, isLoading: loading } = useBudgets({
		placeholderData: [],
	});
	function getColorBySpentAmount(spent, total) {
		const percentage = (spent / total) * 100;
		if (percentage < 80) {
			return '#6dde74';
		}
		if (percentage < 100) {
			return 'orange';
		}
		return '#cf3232';
	}

	const totalAmount = budgets.reduce((acc, { amount }) => acc + amount, 0);
	const totalSpent = budgets.reduce((acc, { spent }) => acc + spent, 0);

	return (
		<BudgetContainer>
			<BudgetTitle>Budget</BudgetTitle>

			{!loading && (
				<>
					<BudgetItem fullWidth>
						<BudgetItemTitle>Total</BudgetItemTitle>

						<div
							style={{
								display: 'flex',
								width: '100%',
								justifyContent: 'space-between',
							}}
						>
							<BudgetAmount style={{ textAlign: 'left' }}>
								Remaining: {(totalAmount - totalSpent).toFixed(2)}
							</BudgetAmount>
							<BudgetAmount>
								<BudgetAmount
									color={getColorBySpentAmount(totalSpent, totalAmount)}
								>
									{totalSpent.toFixed(2)}
								</BudgetAmount>
								/ {totalAmount}
							</BudgetAmount>
						</div>
					</BudgetItem>
					<BudgetList>
						{budgets.map(
							({ amount, spent, category_name: category }, index) => {
								return (
									<BudgetItem key={index}>
										<BudgetItemTitle>{category}</BudgetItemTitle>
										<BudgetAmount>
											<BudgetAmount
												color={getColorBySpentAmount(spent, amount)}
											>
												{spent}
											</BudgetAmount>{' '}
											/ {amount}
										</BudgetAmount>
									</BudgetItem>
								);
							},
						)}
					</BudgetList>
				</>
			)}
			{!!loading && <BudgetTitle>Loading...</BudgetTitle>}
		</BudgetContainer>
	);
}
