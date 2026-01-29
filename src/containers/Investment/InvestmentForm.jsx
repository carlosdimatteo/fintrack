import { useState } from 'react';
import styled from 'styled-components';
import { Form } from '../../components/Form';
import { Input, CurrencyButton } from '../../components/Input';
import { SelectComp } from '../../components/Select';
import { Textarea } from '../../components/Textarea';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { FormField, FieldLabel, InputRow, FormStack } from '../../components/Layout';
import { useToast } from '../../components/Toast';
import { InfoTip } from '../../components/InfoTip';
import { useAllAccounts, useCreateInvestment } from '../../hooks/useAPI';
import { CURRENCIES, convertToUSD, toggleCurrency as toggleCurrencyUtil } from '../../utils/currency';

const TypeToggle = styled.div`
	display: flex;
	border-radius: 10px;
	overflow: hidden;
	border: 1px solid rgba(120, 180, 180, 0.2);
`;

const TypeButton = styled.button`
	flex: 1;
	padding: 12px 16px;
	border: none;
	background: ${({ $active }) => 
		$active 
			? 'linear-gradient(135deg, rgba(90, 150, 150, 0.4) 0%, rgba(70, 130, 130, 0.3) 100%)'
			: 'transparent'};
	color: ${({ $active, theme }) => 
		$active ? theme.colors.text.primary : theme.colors.text.muted};
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	cursor: pointer;
	transition: all 0.15s ease;
	
	&:hover {
		background: ${({ $active }) => 
			$active 
				? 'linear-gradient(135deg, rgba(90, 150, 150, 0.4) 0%, rgba(70, 130, 130, 0.3) 100%)'
				: 'rgba(120, 180, 180, 0.1)'};
	}
`;

const ArrowIndicator = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px 0;
	color: ${({ theme }) => theme.colors.accent.primary};
	font-size: 20px;
`;

export function InvestmentForm({ onSuccess }) {
	const toast = useToast();
	
	// Form state
	const [type, setType] = useState('deposit');
	const [investmentAccount, setInvestmentAccount] = useState(null);
	const [fiatAccount, setFiatAccount] = useState(null);
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');
	const [activeCurrency, setActiveCurrency] = useState(CURRENCIES.USD);
	
	// API hooks
	const { accounts, investmentAccounts } = useAllAccounts();
	
	const { createInvestment, loading } = useCreateInvestment({
		onError: () => toast.error('Failed to record transaction'),
		onSuccess: () => {
			toast.success(`${type === 'deposit' ? 'Deposit' : 'Withdrawal'} recorded!`);
			clearForm();
			onSuccess?.();
		},
	});
	
	// Options
	const investmentAccountOptions = investmentAccounts.map((a) => ({
		value: a.id,
		label: a.name,
	}));
	
	const fiatAccountOptions = accounts.map((a) => ({
		value: a.id,
		label: a.name,
	}));
	
	function toggleCurrency() {
		setActiveCurrency((prev) => toggleCurrencyUtil(prev));
	}
	
	function clearForm() {
		setInvestmentAccount(null);
		setFiatAccount(null);
		setAmount('');
		setDescription('');
	}
	
	function validate() {
		if (!investmentAccount) {
			toast.warning('Please select an investment account');
			return false;
		}
		if (!fiatAccount) {
			toast.warning('Please select a fiat account');
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
		
		const originalAmount = Number(amount);
		const convertedAmount = convertToUSD(originalAmount, activeCurrency);
		
		createInvestment({
			amount: convertedAmount,
			account_id: investmentAccount.value,
			account_name: investmentAccount.label,
			type,
			description,
			source_account_id: fiatAccount.value,
		});
	}
	
	return (
		<Card>
			<Form onSubmit={(e) => e.preventDefault()}>
				<FormStack>
					<FormField>
						<FieldLabel>Transaction Type</FieldLabel>
						<TypeToggle>
							<TypeButton 
								type="button"
								$active={type === 'deposit'}
								onClick={() => setType('deposit')}
							>
								Deposit
							</TypeButton>
							<TypeButton 
								type="button"
								$active={type === 'withdrawal'}
								onClick={() => setType('withdrawal')}
							>
								Withdrawal
							</TypeButton>
						</TypeToggle>
					</FormField>
					
					<InfoTip>
						{type === 'deposit' 
							? 'This will decrease your fiat account balance and increase your investment capital.'
							: 'This will increase your fiat account balance and decrease your investment capital.'}
					</InfoTip>
					
					<FormField>
						<FieldLabel>
							{type === 'deposit' ? 'From Account (Fiat)' : 'To Account (Fiat)'}
						</FieldLabel>
						<SelectComp
							value={fiatAccount}
							options={fiatAccountOptions}
							onChange={setFiatAccount}
							placeholder="Select fiat account..."
						/>
					</FormField>
					
					<ArrowIndicator>
						{type === 'deposit' ? '↓' : '↑'}
					</ArrowIndicator>
					
					<FormField>
						<FieldLabel>
							{type === 'deposit' ? 'To Investment Account' : 'From Investment Account'}
						</FieldLabel>
						<SelectComp
							value={investmentAccount}
							options={investmentAccountOptions}
							onChange={setInvestmentAccount}
							placeholder="Select investment account..."
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
							placeholder="Notes about this transaction"
						/>
					</FormField>
					
					<Button onClick={handleSubmit} disabled={loading}>
						{loading ? 'Saving...' : type === 'deposit' ? 'Record Deposit' : 'Record Withdrawal'}
					</Button>
				</FormStack>
			</Form>
		</Card>
	);
}
