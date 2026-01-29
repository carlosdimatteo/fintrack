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
import {
	useDebtsByDebtor,
	useAllAccounts,
	useCreateDebtor,
	useCreateDebt,
	useDebtRepayment,
	useExpenseList,
} from '../../hooks/useAPI';
import { CURRENCIES, convertToUSD, toggleCurrency as toggleCurrencyUtil } from '../../utils/currency';

const DirectionToggle = styled.div`
	display: flex;
	border-radius: 10px;
	overflow: hidden;
	border: 1px solid rgba(120, 180, 180, 0.2);
`;

const DirectionButton = styled.button`
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

const NewDebtorRow = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	padding-top: 8px;
`;

const NewDebtorInput = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 4px;
	min-width: 0;
`;

const SmallLabel = styled.label`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const SmallButton = styled.button`
	height: 36px;
	padding: 0 14px;
	border-radius: 8px;
	font-size: 13px;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.15s ease;
	border: none;
	
	${({ $variant }) => $variant === 'primary' ? `
		background: linear-gradient(135deg, rgba(90, 150, 150, 0.5) 0%, rgba(70, 130, 130, 0.4) 100%);
		color: #E6ECEC;
		&:hover {
			background: linear-gradient(135deg, rgba(100, 160, 160, 0.6) 0%, rgba(80, 140, 140, 0.5) 100%);
		}
		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	` : `
		background: rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.6);
		&:hover {
			background: rgba(255, 255, 255, 0.12);
		}
	`}
`;

const AddDebtorLink = styled.button`
	background: transparent;
	border: none;
	color: ${({ theme }) => theme.colors.accent.primary};
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	cursor: pointer;
	padding: 4px 0;
	text-align: left;

	&:hover {
		text-decoration: underline;
	}
`;

const CheckboxRow = styled.label`
	display: flex;
	align-items: center;
	gap: 10px;
	cursor: pointer;
	padding: 12px 0;
`;

const Checkbox = styled.input`
	width: 20px;
	height: 20px;
	accent-color: ${({ theme }) => theme.colors.accent.primary};
	cursor: pointer;
`;

const CheckboxLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

export function DebtForm({ onSuccess }) {
	const toast = useToast();
	
	// Form state
	const [debtor, setDebtor] = useState(null);
	const [amount, setAmount] = useState('');
	const [direction, setDirection] = useState('outbound'); // outbound = they owe me
	const [description, setDescription] = useState('');
	const [linkedExpense, setLinkedExpense] = useState(null);
	const [activeCurrency, setActiveCurrency] = useState(CURRENCIES.USD);
	const [receivedPayment, setReceivedPayment] = useState(false);
	const [account, setAccount] = useState(null);
	
	// New debtor state
	const [showNewDebtorInput, setShowNewDebtorInput] = useState(false);
	const [newDebtorName, setNewDebtorName] = useState('');
	
	// API hooks
	const { debtors: debtorBalances, refetch: refetchDebtors } = useDebtsByDebtor();
	const { accounts } = useAllAccounts();
	const { expenses: recentExpenses } = useExpenseList(20, 0);
	
	const { createDebt, loading: debtLoading } = useCreateDebt({
		onError: () => toast.error('Failed to create debt'),
		onSuccess: () => {
			toast.success('Debt recorded!');
			clearForm();
			onSuccess?.();
		},
	});
	
	const { createRepayment, loading: repaymentLoading } = useDebtRepayment({
		onError: () => toast.error('Failed to record repayment'),
		onSuccess: () => {
			toast.success('Repayment recorded!');
			clearForm();
			onSuccess?.();
		},
	});
	
	const { createDebtor, loading: creatingDebtor } = useCreateDebtor({
		onError: () => toast.error('Failed to create debtor'),
		onSuccess: () => {
			toast.success(`Added ${newDebtorName} as a debtor`);
			setNewDebtorName('');
			setShowNewDebtorInput(false);
			refetchDebtors();
		},
	});
	
	const loading = debtLoading || repaymentLoading;
	
	// Options - use debtorBalances which includes name and balance
	const debtorOptions = debtorBalances.map((d) => {
		const netOwed = d.net_owed ?? 0;
		const balanceStr = netOwed === 0 
			? '' 
			: netOwed > 0 
				? ` | +$${netOwed.toFixed(2)}` 
				: ` | -$${Math.abs(netOwed).toFixed(2)}`;
		return {
			value: d.debtor_id,
			label: `${d.debtor_name}${balanceStr}`,
		};
	});
	
	const accountOptions = accounts.map((a) => ({
		value: a.id,
		label: a.name,
	}));
	
	const expenseOptions = recentExpenses.map((e) => ({
		value: e.id,
		label: `${e.category} - $${e.expense.toFixed(2)} (${new Date(e.date).toLocaleDateString()})`,
	}));
	
	function toggleCurrency() {
		setActiveCurrency((prev) => toggleCurrencyUtil(prev));
	}
	
	function clearForm() {
		setDebtor(null);
		setAmount('');
		setDirection('outbound');
		setDescription('');
		setLinkedExpense(null);
		setReceivedPayment(false);
		setAccount(null);
	}
	
	function handleCreateDebtor() {
		if (!newDebtorName.trim()) {
			toast.warning('Please enter a name');
			return;
		}
		createDebtor({ name: newDebtorName.trim() });
	}
	
	function validate() {
		if (!debtor) {
			toast.warning('Please select a debtor');
			return false;
		}
		if (!amount || Number(amount) <= 0) {
			toast.warning('Please enter a valid amount');
			return false;
		}
		// If receiving payment, account is required
		if (receivedPayment && !account) {
			toast.warning('Please select an account for the received payment');
			return false;
		}
		return true;
	}
	
	function handleSubmit() {
		if (!validate()) return;
		
		const originalAmount = Number(amount);
		const convertedAmount = convertToUSD(originalAmount, activeCurrency);
		
		if (receivedPayment) {
			// Use repayment endpoint - creates income record
			createRepayment({
				debtor_id: debtor.value,
				debtor_name: debtor.label,
				amount: convertedAmount,
				account_id: account.value,
				account: account.label,
				description,
			});
		} else {
			// Use regular debt endpoint - no income record
			createDebt({
				debtor_id: debtor.value,
				debtor_name: debtor.label,
				amount: convertedAmount,
				outbound: direction === 'outbound',
				description,
				expense_id: linkedExpense?.value || null,
			});
		}
	}
	
	return (
		<Card>
			<Form onSubmit={(e) => e.preventDefault()}>
				<FormStack>
					<FormField>
						<FieldLabel>Direction</FieldLabel>
						<DirectionToggle>
							<DirectionButton 
								type="button"
								$active={direction === 'outbound'}
								onClick={() => setDirection('outbound')}
							>
								They owe me
							</DirectionButton>
							<DirectionButton 
								type="button"
								$active={direction === 'inbound'}
								onClick={() => setDirection('inbound')}
							>
								I owe them | Repayment
							</DirectionButton>
						</DirectionToggle>
					</FormField>
					
					<FormField>
						<FieldLabel>Who</FieldLabel>
						<SelectComp
							value={debtor}
							options={debtorOptions}
							onChange={setDebtor}
							placeholder="Select person..."
						/>
						{showNewDebtorInput ? (
							<NewDebtorRow>
								<NewDebtorInput>
									<SmallLabel>New debtor name</SmallLabel>
									<Input
										value={newDebtorName}
										onChange={setNewDebtorName}
										placeholder="Enter name..."
									/>
								</NewDebtorInput>
								<SmallButton
									$variant="primary"
									type="button"
									onClick={handleCreateDebtor}
									disabled={creatingDebtor}
								>
									{creatingDebtor ? '...' : 'Add'}
								</SmallButton>
								<SmallButton
									type="button"
									onClick={() => setShowNewDebtorInput(false)}
								>
									Cancel
								</SmallButton>
							</NewDebtorRow>
						) : (
							<AddDebtorLink type="button" onClick={() => setShowNewDebtorInput(true)}>
								+ Create new debtor
							</AddDebtorLink>
						)}
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
					
					{/* Only show for inbound (I owe them) - received payment option */}
					{direction === 'inbound' && (
						<CheckboxRow>
							<Checkbox
								type="checkbox"
								checked={receivedPayment}
								onChange={(e) => setReceivedPayment(e.target.checked)}
							/>
							<CheckboxLabel>
								I received payment (creates income record)
							</CheckboxLabel>
						</CheckboxRow>
					)}
					
					{/* Show account selector if receiving payment */}
					{receivedPayment && (
						<FormField>
							<FieldLabel>Received into account</FieldLabel>
							<SelectComp
								value={account}
								options={accountOptions}
								onChange={setAccount}
								placeholder="Select account..."
							/>
						</FormField>
					)}
					
					<FormField>
						<FieldLabel>Description (optional)</FieldLabel>
						<Textarea
							value={description}
							onChange={setDescription}
							placeholder="What is this debt for?"
						/>
					</FormField>
					
					{/* Only show link to expense when not receiving payment */}
					{!receivedPayment && (
						<FormField>
							<FieldLabel>Link to expense (optional)</FieldLabel>
							<SelectComp
								value={linkedExpense}
								options={expenseOptions}
								onChange={setLinkedExpense}
								placeholder="Select recent expense..."
								isClearable
							/>
						</FormField>
					)}
					
					<Button onClick={handleSubmit} disabled={loading}>
						{loading ? 'Saving...' : receivedPayment ? 'Record Repayment' : 'Record Debt'}
					</Button>
				</FormStack>
			</Form>
		</Card>
	);
}
