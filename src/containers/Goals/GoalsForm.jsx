import { useState, useEffect } from 'react';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { FormField, FieldLabel, FormStack } from '../../components/Layout';
import { useToast } from '../../components/Toast';
import { useUpsertGoals } from '../../hooks/useAPI';

export function GoalsForm({ goals, year, onSuccess }) {
	const toast = useToast();
	
	// Form state
	const [savingsGoal, setSavingsGoal] = useState('');
	const [investmentGoal, setInvestmentGoal] = useState('');
	const [idealInvestment, setIdealInvestment] = useState('');
	
	// Populate form when goals load
	useEffect(() => {
		if (goals) {
			setSavingsGoal(goals.savings_goal?.toString() || '');
			setInvestmentGoal(goals.investment_goal?.toString() || '');
			setIdealInvestment(goals.ideal_investment?.toString() || '');
		} else {
			setSavingsGoal('');
			setInvestmentGoal('');
			setIdealInvestment('');
		}
	}, [goals, year]);
	
	const { upsertGoals, loading } = useUpsertGoals({
		onError: () => toast.error('Failed to save goals'),
		onSuccess: () => {
			toast.success('Goals saved!');
			onSuccess?.();
		},
	});
	
	function handleSubmit() {
		const data = {
			year,
			savings_goal: Number(savingsGoal) || 0,
			investment_goal: Number(investmentGoal) || 0,
			ideal_investment: Number(idealInvestment) || 0,
		};
		
		if (data.savings_goal === 0 && data.investment_goal === 0 && data.ideal_investment === 0) {
			toast.warning('Please set at least one goal');
			return;
		}
		
		upsertGoals(data);
	}
	
	return (
		<Card>
			<Form onSubmit={(e) => e.preventDefault()}>
				<FormStack>
					<FormField>
						<FieldLabel>Savings Goal for {year}</FieldLabel>
						<Input
							type="number"
							value={savingsGoal}
							onChange={setSavingsGoal}
							placeholder="e.g., 15000"
						/>
					</FormField>
					
					<FormField>
						<FieldLabel>Investment Goal for {year}</FieldLabel>
						<Input
							type="number"
							value={investmentGoal}
							onChange={setInvestmentGoal}
							placeholder="e.g., 8000"
						/>
					</FormField>
					
					<FormField>
						<FieldLabel>Ideal Investment for {year}</FieldLabel>
						<Input
							type="number"
							value={idealInvestment}
							onChange={setIdealInvestment}
							placeholder="e.g., 12000"
						/>
					</FormField>
					
					<Button onClick={handleSubmit} disabled={loading}>
						{loading ? 'Saving...' : goals ? 'Update Goals' : 'Set Goals'}
					</Button>
				</FormStack>
			</Form>
		</Card>
	);
}
