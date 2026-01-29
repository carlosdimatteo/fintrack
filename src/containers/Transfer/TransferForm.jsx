import { useState, useEffect } from 'react';
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
import { useAllAccounts, useCreateTransfer } from '../../hooks/useAPI';
import { CURRENCIES, convertToUSD, toggleCurrency as toggleCurrencyUtil } from '../../utils/currency';

const ArrowIndicator = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px 0;
	color: ${({ theme }) => theme.colors.accent.primary};
	font-size: 20px;
`;

const AmountRow = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
`;

const DifferentAmountToggle = styled.label`
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
	cursor: pointer;
	margin-top: 4px;
`;

const Checkbox = styled.input`
	width: 16px;
	height: 16px;
	accent-color: ${({ theme }) => theme.colors.accent.primary};
`;

export function TransferForm({ onSuccess }) {
	const toast = useToast();
	
	// Form state
	const [sourceAccount, setSourceAccount] = useState(null);
	const [destAccount, setDestAccount] = useState(null);
	const [sourceAmount, setSourceAmount] = useState('');
	const [destAmount, setDestAmount] = useState('');
	const [differentAmounts, setDifferentAmounts] = useState(false);
	const [description, setDescription] = useState('');
	const [sourceCurrency, setSourceCurrency] = useState(CURRENCIES.USD);
	const [destCurrency, setDestCurrency] = useState(CURRENCIES.USD);
	
	// API hooks
	const { accounts } = useAllAccounts();
	
	const { createTransfer, loading } = useCreateTransfer({
		onError: () => toast.error('Failed to record transfer'),
		onSuccess: () => {
			toast.success('Transfer recorded!');
			clearForm();
			onSuccess?.();
		},
	});
	
	// Options
	const accountOptions = accounts.map((a) => ({
		value: a.id,
		label: a.name,
	}));
	
	// Sync dest amount with source if not using different amounts
	useEffect(() => {
		if (!differentAmounts) {
			setDestAmount(sourceAmount);
			setDestCurrency(sourceCurrency);
		}
	}, [sourceAmount, sourceCurrency, differentAmounts]);
	
	function toggleSourceCurrency() {
		setSourceCurrency((prev) => toggleCurrencyUtil(prev));
	}
	
	function toggleDestCurrency() {
		setDestCurrency((prev) => toggleCurrencyUtil(prev));
	}
	
	function clearForm() {
		setSourceAccount(null);
		setDestAccount(null);
		setSourceAmount('');
		setDestAmount('');
		setDifferentAmounts(false);
		setDescription('');
	}
	
	function validate() {
		if (!sourceAccount) {
			toast.warning('Please select a source account');
			return false;
		}
		if (!destAccount) {
			toast.warning('Please select a destination account');
			return false;
		}
		if (sourceAccount.value === destAccount.value) {
			toast.warning('Source and destination must be different');
			return false;
		}
		if (!sourceAmount || Number(sourceAmount) <= 0) {
			toast.warning('Please enter a valid source amount');
			return false;
		}
		if (differentAmounts && (!destAmount || Number(destAmount) <= 0)) {
			toast.warning('Please enter a valid destination amount');
			return false;
		}
		return true;
	}
	
	function handleSubmit() {
		if (!validate()) return;
		
		const srcAmountUSD = convertToUSD(sourceAmount, sourceCurrency);
		const dstAmountUSD = differentAmounts 
			? convertToUSD(destAmount, destCurrency)
			: srcAmountUSD;
		
		createTransfer({
			source_account_id: sourceAccount.value,
			source_amount: srcAmountUSD,
			dest_account_id: destAccount.value,
			dest_amount: dstAmountUSD,
			description,
		});
	}
	
	return (
		<Card>
			<Form onSubmit={(e) => e.preventDefault()}>
				<FormStack>
					<InfoTip>
						Transfers move money between your fiat accounts. Your total net worth stays the same.
					</InfoTip>
					
					<FormField>
						<FieldLabel>From Account</FieldLabel>
						<SelectComp
							value={sourceAccount}
							options={accountOptions}
							onChange={setSourceAccount}
							placeholder="Select source account..."
						/>
					</FormField>
					
					<FormField>
						<FieldLabel>Amount</FieldLabel>
						<AmountRow>
							<InputRow style={{ flex: 1 }}>
								<Input
									type="number"
									value={sourceAmount}
									onChange={setSourceAmount}
									placeholder="0.00"
								/>
								<CurrencyButton onClick={toggleSourceCurrency}>
									{sourceCurrency}
								</CurrencyButton>
							</InputRow>
						</AmountRow>
					</FormField>
					
					<ArrowIndicator>↓</ArrowIndicator>
					
					<FormField>
						<FieldLabel>To Account</FieldLabel>
						<SelectComp
							value={destAccount}
							options={accountOptions}
							onChange={setDestAccount}
							placeholder="Select destination account..."
						/>
					</FormField>
					
					<DifferentAmountToggle>
						<Checkbox
							type="checkbox"
							checked={differentAmounts}
							onChange={(e) => setDifferentAmounts(e.target.checked)}
						/>
						Different destination amount (currency conversion)
					</DifferentAmountToggle>
					
					{differentAmounts && (
						<FormField>
							<FieldLabel>Destination Amount</FieldLabel>
							<AmountRow>
								<InputRow style={{ flex: 1 }}>
									<Input
										type="number"
										value={destAmount}
										onChange={setDestAmount}
										placeholder="0.00"
									/>
									<CurrencyButton onClick={toggleDestCurrency}>
										{destCurrency}
									</CurrencyButton>
								</InputRow>
							</AmountRow>
						</FormField>
					)}
					
					<FormField>
						<FieldLabel>Description (optional)</FieldLabel>
						<Textarea
							value={description}
							onChange={setDescription}
							placeholder="Notes about this transfer"
						/>
					</FormField>
					
					<Button onClick={handleSubmit} disabled={loading}>
						{loading ? 'Saving...' : 'Record Transfer'}
					</Button>
				</FormStack>
			</Form>
		</Card>
	);
}
