import { useState } from 'react';
import { Form } from '../../components/Form';
import { Input, CurrencyButton } from '../../components/Input';
import { SelectComp } from '../../components/Select';
import { Textarea } from '../../components/Textarea';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { FormField, FieldLabel, InputRow, FormStack } from '../../components/Layout';
import { useToast } from '../../components/Toast';
import { useAllAccounts, useSubmitIncome, useExchangeRate } from '../../hooks/useAPI';
import { CURRENCIES, convertToUSD, toggleCurrency as toggleCurrencyUtil } from '../../utils/currency';

export function IncomeForm({ onSuccess }) {
	const toast = useToast();
	
	// Form state
	const [account, setAccount] = useState(null);
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');
	const [activeCurrency, setActiveCurrency] = useState(CURRENCIES.USD);
	
	// API hooks
	const { accounts, investmentAccounts, all } = useAllAccounts();
	const { conversionRate } = useExchangeRate();
	
	const { submitIncome, loading } = useSubmitIncome({
		onError: () => toast.error('Failed to record income'),
		onSuccess: () => {
			toast.success('Income recorded!');
			clearForm();
			onSuccess?.();
		},
	});
	
	// Options - combine regular and investment accounts
	const accountOptions = [...accounts, ...investmentAccounts].map((a) => ({
		value: a.id,
		label: a.name,
		name: a.name,
	}));
	
	function toggleCurrency() {
		setActiveCurrency((prev) => toggleCurrencyUtil(prev));
	}
	
	function clearForm() {
		setAccount(null);
		setAmount('');
		setDescription('');
	}
	
	function validate() {
		if (!account) {
			toast.warning('Please select an account');
			return false;
		}
		if (!amount || Number(amount) <= 0) {
			toast.warning('Please enter a valid amount');
			return false;
		}
		return true;
	}
	
	function handleSubmit() {
		if (!validate()) return;
		if (activeCurrency !== CURRENCIES.USD && conversionRate == null) {
			toast.warning('Exchange rate is loading, please wait a moment');
			return;
		}
		const rate = activeCurrency === CURRENCIES.USD ? null : conversionRate;
		const originalAmount = Number(amount);
		const convertedAmount = convertToUSD(originalAmount, activeCurrency, rate);
		
		// Find the full account info
		const foundAcc = all.find((acc) => acc.id === account.value);
		
		submitIncome({
			account_name: account.label,
			amount: convertedAmount,
			description,
			account_id: foundAcc?.id || account.value,
		});
	}
	
	return (
		<Card>
			<Form onSubmit={(e) => e.preventDefault()}>
				<FormStack>
					<FormField>
						<FieldLabel>Account</FieldLabel>
						<SelectComp
							value={account}
							options={accountOptions}
							onChange={setAccount}
							placeholder="Select account..."
						/>
					</FormField>
					
					<FormField>
						<FieldLabel>Amount</FieldLabel>
						<InputRow>
							<Input
								type="number"
								value={amount}
								onChange={setAmount}
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
							placeholder="Income source or notes"
						/>
					</FormField>
					
					<Button onClick={handleSubmit} disabled={loading}>
						{loading ? 'Saving...' : 'Record Income'}
					</Button>
				</FormStack>
			</Form>
		</Card>
	);
}
