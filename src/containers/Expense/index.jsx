import { useState } from 'react';
import { Form } from '../../components/Form';
import { Input, CurrencyButton } from '../../components/Input';
import { SelectComp } from '../../components/Select';
import { Textarea } from '../../components/Textarea';
import { Button } from '../../components/Button';
import { PageContainer, Text, Title } from '../Main/Main.styles';
import {
	useAllAcounts,
	useCategories,
	useSubmitExpense,
} from '../../hooks/useAPI';
import { InputContainer } from './Expense.styles';

export function Expenses() {
	const [category, setCategory] = useState('');
	const [expense, setExpense] = useState('');
	const [description, setDescription] = useState('');
	const [card, setCard] = useState('');
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
	const methods = [...accounts, ...investmentAccounts].map((a) => ({
		value: a.name,
		label: a.name,
	}));

	const [activeCurrency, setActiveCurrency] = useState(currencies.dollar);
	const { categories } = useCategories({ placeholderData: [] });
	const categoryOptions = categories.map((cat) => {
		return { value: cat.id, label: cat.name };
	});
	const { submitExpense, loading } = useSubmitExpense({
		onError() {
			alert('error on submit, check console log');
		},
		onSuccess() {
			clearInput();
		},
	});

	function actualCurrency() {
		if (activeCurrency === currencies.dollar)
			setActiveCurrency(currencies.peso);
		if (activeCurrency === currencies.peso)
			setActiveCurrency(currencies.dollar);
	}

	function clearInput() {
		setCategory(null);
		setExpense('');
		setDescription('');
		setCard(null);
	}

	function checkForm() {
		if ((category === null || category === '') && expense === '')
			alert('Please select category and input total expense');
		else if (category === null || category === '')
			alert('Please select category');
		else if (expense === '') alert('Please input total expense');
		else postData();
	}

	const postData = () => {
		const foundAccount = accounts.find((acc) => card.value.includes(acc.name));
		const foundInvestmentAccount = investmentAccounts.find((acc) =>
			card.value.includes(acc.name),
		);
		const originalAmount = Number(expense);
		const isDollar = activeCurrency === currencies.dollar;
		const dataToPost = {
			category_id: category.value,
			category: category.label,
			expense: isDollar
				? originalAmount
				: Number((originalAmount / 4000).toFixed(2)),
			description: description,
			method: card.value,
			originalAmount,
			account_id: foundAccount?.id || foundInvestmentAccount?.id || null,
			account_type: foundAccount ? 'account' : 'investment_account',
		};
		submitExpense(dataToPost);
	};

	return (
		<PageContainer>
			<Title>Expense</Title>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<Text>Category</Text>
				<SelectComp
					defaultValue={category}
					value={category}
					options={categoryOptions}
					onChange={(t) => {
						setCategory(t);
					}}
				/>

				<Text>Amount</Text>
				<InputContainer>
					<Input type="number" value={expense} onChange={setExpense} />
					<CurrencyButton onClick={actualCurrency}>
						{activeCurrency}
					</CurrencyButton>
				</InputContainer>

				<Text>Description</Text>
				<Textarea value={description} onChange={setDescription} />
				<Text>Payment Method (optional)</Text>
				<SelectComp
					defaultValue={card}
					value={card}
					options={methods}
					onChange={(t) => {
						setCard(t);
					}}
				/>

				<Button
					onClick={() => {
						checkForm();
					}}
				>
					{loading ? 'Loading...' : 'SUBMIT'}
				</Button>
			</Form>
		</PageContainer>
	);
}
