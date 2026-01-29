import { useState } from 'react';
import { PageContainer, Title } from '../Main/Main.styles';
import { Form } from '../../components/Form';
import { Text } from '../Main/Main.styles';
import { InputContainer } from './Income.styles';
import { Textarea } from '../../components/Textarea';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { CurrencyButton } from '../../components/Input';
import { SelectComp } from '../../components/Select';
import { useAllAccounts, useSubmitIncome } from '../../hooks/useAPI';

export function Income() {
	const currencies = {
		dollar: 'USD',
		peso: 'COP',
	};
	const [description, setDescription] = useState('');
	const [account, setAccount] = useState('');
	const { accounts, investmentAccounts } = useAllAccounts({
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
	const [income, setIncome] = useState('');
	const { all } = useAllAccounts({
		placeholderData: {
			all: [],
		},
	});

	function actualCurrency() {
		if (activeCurrency === currencies.dollar)
			setActiveCurrency(currencies.peso);
		if (activeCurrency === currencies.peso)
			setActiveCurrency(currencies.dollar);
	}

	const postData = () => {
		const foundAcc = all.find((acc) => account.value.includes(acc.name));

		const dataToPost = {
			account_name: account.value,
			amount: income,
			description,
			account_id: foundAcc?.id,
		};
		console.log(dataToPost);
		submitIncome(dataToPost);
	};

	const { submitIncome, loading } = useSubmitIncome({
		onError() {
			alert('error on submit, check console log');
		},
		onSuccess() {
			clearInput();
		},
	});

	function clearInput() {
		setAccount(null);
		setIncome('');
		setDescription('');
	}

	return (
		<PageContainer>
			<Title>Income</Title>

			<Form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<Text>Account</Text>
				<SelectComp
					defaultValue={account}
					value={account}
					options={methods}
					onChange={(t) => {
						setAccount(t);
					}}
				/>

				<Text>Amount</Text>
				<InputContainer>
					<Input type="number" value={income} onChange={setIncome} />
					<CurrencyButton onClick={actualCurrency}>
						{activeCurrency}
					</CurrencyButton>
				</InputContainer>
				<Text>Description</Text>
				<Textarea value={description} onChange={setDescription}></Textarea>

				<Button
					onClick={() => {
						postData();
					}}
					disabled={loading}
				>
					{' '}
					{'SUBMIT'}
				</Button>
			</Form>
		</PageContainer>
	);
}
