import { useState } from 'react';
import { Form } from '../../components/Form';
import { Input, CurrencyButton } from '../../components/Input';
import { SelectComp } from '../../components/Select';
import { Textarea } from '../../components/Textarea';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import {
	PageWrapper,
	PageHeader,
	PageTitle,
	FormField,
	FieldLabel,
	InputRow,
} from '../../components/Layout';
import {
	useAllAcounts,
	useCategories,
	useSubmitExpense,
} from '../../hooks/useAPI';

export function Expenses() {
	const [category, setCategory] = useState(null);
	const [expense, setExpense] = useState('');
	const [description, setDescription] = useState('');
	const [account, setAccount] = useState(null);
	const currencies = {
		dollar: 'USD',
		peso: 'COP',
	};

	const { accounts, investmentAccounts } = useAllAcounts({
		placeholderData: {
			accounts: [],
			investmentAccounts: [],
		},
	});
	const accountOptions = [...accounts, ...investmentAccounts].map((a) => ({
		value: a.name,
		label: a.name,
		id: a.id,
		type: accounts.includes(a) ? 'account' : 'investment_account',
	}));

	const [activeCurrency, setActiveCurrency] = useState(currencies.dollar);
	const { categories } = useCategories({ placeholderData: [] });
	const categoryOptions = categories.map((cat) => ({
		value: cat.id,
		label: cat.name,
	}));

	const { submitExpense, loading } = useSubmitExpense({
		onError() {
			alert('Error submitting expense');
		},
		onSuccess() {
			clearInput();
		},
	});

	function toggleCurrency() {
		setActiveCurrency((prev) =>
			prev === currencies.dollar ? currencies.peso : currencies.dollar
		);
	}

	function clearInput() {
		setCategory(null);
		setExpense('');
		setDescription('');
		setAccount(null);
	}

	function handleSubmit() {
		if (!category) {
			alert('Please select a category');
			return;
		}
		if (!expense) {
			alert('Please enter an amount');
			return;
		}

		const originalAmount = Number(expense);
		const isDollar = activeCurrency === currencies.dollar;
		const dataToPost = {
			category_id: category.value,
			category: category.label,
			expense: isDollar
				? originalAmount
				: Number((originalAmount / 4000).toFixed(2)),
			description: description,
			method: account?.value || null,
			originalAmount,
			account_id: account?.id || null,
			account_type: account?.type || null,
		};
		submitExpense(dataToPost);
	}

	return (
		<PageWrapper>
			<PageHeader>
				<PageTitle>Expense</PageTitle>
			</PageHeader>

			<Card>
				<Form onSubmit={(e) => e.preventDefault()}>
					<FormField>
						<FieldLabel>Category</FieldLabel>
						<SelectComp
							value={category}
							options={categoryOptions}
							onChange={setCategory}
							placeholder="Select category..."
						/>
					</FormField>

					<FormField>
						<FieldLabel>Amount</FieldLabel>
						<InputRow>
							<Input
								type="number"
								value={expense}
								onChange={setExpense}
								placeholder="0.00"
							/>
							<CurrencyButton onClick={toggleCurrency}>
								{activeCurrency}
							</CurrencyButton>
						</InputRow>
					</FormField>

					<FormField>
						<FieldLabel>Description (optional)</FieldLabel>
						<Textarea
							value={description}
							onChange={setDescription}
							placeholder="What was this expense for?"
						/>
					</FormField>

					<FormField>
						<FieldLabel>Account (optional)</FieldLabel>
						<SelectComp
							value={account}
							options={accountOptions}
							onChange={setAccount}
							placeholder="Select account..."
						/>
					</FormField>

					<Button onClick={handleSubmit} disabled={loading}>
						{loading ? 'Submitting...' : 'Submit Expense'}
					</Button>
				</Form>
			</Card>
		</PageWrapper>
	);
}
