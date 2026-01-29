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
	useAllAccounts,
	useCategories,
	useSubmitExpense,
	useDebtors,
	useCreateDebtor,
	useSubmitExpenseWithDebt,
} from '../../hooks/useAPI';

// Debt split section styles
const SplitToggle = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 12px 0;
	cursor: pointer;
`;

const ToggleSwitch = styled.div`
	width: 44px;
	height: 24px;
	border-radius: 12px;
	background: ${({ $active, theme }) =>
		$active
			? 'linear-gradient(135deg, rgba(120, 180, 180, 0.6) 0%, rgba(90, 150, 150, 0.4) 100%)'
			: 'rgba(255, 255, 255, 0.1)'};
	border: 1px solid ${({ $active }) =>
		$active ? 'rgba(120, 180, 180, 0.4)' : 'rgba(255, 255, 255, 0.15)'};
	position: relative;
	transition: all 0.2s ease;

	&::after {
		content: '';
		position: absolute;
		top: 2px;
		left: ${({ $active }) => ($active ? '22px' : '2px')};
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: ${({ $active, theme }) =>
			$active ? theme.colors.accent.primary : 'rgba(255, 255, 255, 0.5)'};
		transition: left 0.2s ease;
	}
`;

const ToggleLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

const DebtSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing.md};
	padding: ${({ theme }) => theme.spacing.md};
	background: rgba(120, 180, 180, 0.05);
	border-radius: 12px;
	border: 1px solid rgba(120, 180, 180, 0.1);
`;

const DebtRow = styled.div`
	display: flex;
	align-items: flex-end;
	gap: 8px;
`;

const DebtRowField = styled.div`
	flex: ${({ $flex }) => $flex || 1};
	display: flex;
	flex-direction: column;
	gap: 4px;
	min-width: 0;
`;

const SmallLabel = styled.label`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
`;

const RemoveButton = styled.button`
	background: rgba(248, 113, 113, 0.15);
	border: 1px solid rgba(248, 113, 113, 0.3);
	color: #f87171;
	width: 32px;
	height: 32px;
	border-radius: 8px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	transition: all 0.15s ease;
	font-size: 18px;

	&:hover {
		background: rgba(248, 113, 113, 0.25);
	}
`;

const AddButton = styled.button`
	background: transparent;
	border: 1px dashed rgba(120, 180, 180, 0.3);
	color: ${({ theme }) => theme.colors.accent.primary};
	padding: 10px;
	border-radius: 8px;
	cursor: pointer;
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	transition: all 0.15s ease;

	&:hover {
		border-color: rgba(120, 180, 180, 0.5);
		background: rgba(120, 180, 180, 0.05);
	}
`;

const AddDebtorButton = styled.button`
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

const NewDebtorRow = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	padding-top: 8px;
	border-top: 1px solid rgba(120, 180, 180, 0.1);
`;

const NewDebtorInput = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 4px;
	min-width: 0;
`;

const NewDebtorActions = styled.div`
	display: flex;
	align-items: end;
	gap: 6px;
	flex-shrink: 0;
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

const CURRENCIES = {
	dollar: 'USD',
	peso: 'COP',
};

const EXCHANGE_RATE = 4000;

export function ExpenseForm({ onSuccess }) {
	const toast = useToast();
	
	// Form state
	const [category, setCategory] = useState(null);
	const [expense, setExpense] = useState('');
	const [description, setDescription] = useState('');
	const [account, setAccount] = useState(null);
	const [activeCurrency, setActiveCurrency] = useState(CURRENCIES.dollar);
	
	// Debt split state
	const [splitEnabled, setSplitEnabled] = useState(false);
	const [debts, setDebts] = useState([{ debtor: null, amount: '' }]);
	const [newDebtorName, setNewDebtorName] = useState('');
	const [showNewDebtorInput, setShowNewDebtorInput] = useState(false);
	
	// API hooks
	const { accounts, investmentAccounts } = useAllAccounts({
		placeholderData: { accounts: [], investmentAccounts: [] },
	});
	const { categories } = useCategories({ placeholderData: [] });
	const { debtors, refetch: refetchDebtors } = useDebtors({ placeholderData: { debtors: [] } });
	
	const { submitExpense, loading: expenseLoading } = useSubmitExpense({
		onError: () => toast.error('Failed to submit expense'),
		onSuccess: () => {
			toast.success('Expense recorded successfully!');
			clearForm();
			onSuccess?.();
		},
	});
	
	const { submitExpenseWithDebt, loading: debtLoading } = useSubmitExpenseWithDebt({
		onError: () => toast.error('Failed to submit expense with debt'),
		onSuccess: () => {
			toast.success('Expense with debt recorded!');
			clearForm();
			onSuccess?.();
		},
	});
	
	const { createDebtor, loading: creatingDebtor } = useCreateDebtor({
		onError: () => toast.error('Failed to create debtor'),
		onSuccess: (data) => {
			toast.success(`Added ${newDebtorName} as a debtor`);
			setNewDebtorName('');
			setShowNewDebtorInput(false);
			refetchDebtors();
		},
	});
	
	const loading = expenseLoading || debtLoading;
	
	// Options for selects
	const accountOptions = [...accounts, ...investmentAccounts].map((a) => ({
		value: a.name,
		label: a.name,
		id: a.id,
		type: accounts.includes(a) ? 'account' : 'investment_account',
	}));
	
	const categoryOptions = categories.map((cat) => ({
		value: cat.id,
		label: cat.name,
	}));
	
	const debtorOptions = debtors.map((d) => ({
		value: d.id,
		label: d.name,
	}));
	
	// Handlers
	function toggleCurrency() {
		setActiveCurrency((prev) =>
			prev === CURRENCIES.dollar ? CURRENCIES.peso : CURRENCIES.dollar
		);
	}
	
	function clearForm() {
		setCategory(null);
		setExpense('');
		setDescription('');
		setAccount(null);
		setSplitEnabled(false);
		setDebts([{ debtor: null, amount: '' }]);
	}
	
	function addDebtRow() {
		setDebts([...debts, { debtor: null, amount: '' }]);
	}
	
	function removeDebtRow(index) {
		if (debts.length > 1) {
			setDebts(debts.filter((_, i) => i !== index));
		}
	}
	
	function updateDebt(index, field, value) {
		setDebts(debts.map((d, i) => (i === index ? { ...d, [field]: value } : d)));
	}
	
	function handleCreateDebtor() {
		if (!newDebtorName.trim()) {
			toast.warning('Please enter a name');
			return;
		}
		createDebtor({ name: newDebtorName.trim() });
	}
	
	function validate() {
		if (!category) {
			toast.warning('Please select a category');
			return false;
		}
		if (!expense || Number(expense) <= 0) {
			toast.warning('Please enter a valid amount greater than 0');
			return false;
		}
		if (!account) {
			toast.warning('Please select an account');
			return false;
		}
		if (splitEnabled) {
			const validDebts = debts.filter((d) => d.debtor && d.amount);
			if (validDebts.length === 0) {
				toast.warning('Add at least one debtor with an amount');
				return false;
			}
			// Check each debt has amount > 0
			for (const debt of validDebts) {
				if (Number(debt.amount) <= 0) {
					toast.warning('All debt amounts must be greater than 0');
					return false;
				}
			}
		}
		return true;
	}
	
	function handleSubmit() {
		if (!validate()) return;
		
		const originalAmount = Number(expense);
		const isDollar = activeCurrency === CURRENCIES.dollar;
		const convertedAmount = isDollar
			? originalAmount
			: Number((originalAmount / EXCHANGE_RATE).toFixed(2));
		
		const expenseData = {
			category_id: category.value,
			category: category.label,
			expense: convertedAmount,
			description: description,
			method: account?.value || null,
			originalAmount,
			account_id: account?.id || null,
			account_type: account?.type || null,
		};
		
		if (splitEnabled) {
			// Submit with debt
			const validDebts = debts
				.filter((d) => d.debtor && d.amount)
				.map((d) => ({
					debtor_id: d.debtor.value,
					amount: isDollar
						? Number(d.amount)
						: Number((Number(d.amount) / EXCHANGE_RATE).toFixed(2)),
				}));
			
			submitExpenseWithDebt({
				...expenseData,
				debts: validDebts,
			});
		} else {
			submitExpense(expenseData);
		}
	}
	
	return (
		<Card>
			<Form onSubmit={(e) => e.preventDefault()}>
				<FormStack>
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
					
					{/* Debt Split Section */}
					<SplitToggle onClick={() => setSplitEnabled(!splitEnabled)}>
						<ToggleSwitch $active={splitEnabled} />
						<ToggleLabel>Split with someone</ToggleLabel>
					</SplitToggle>
					
					{splitEnabled && (
						<DebtSection>
							{debts.map((debt, index) => (
								<DebtRow key={index}>
									<DebtRowField>
										<SmallLabel>Who owes you?</SmallLabel>
										<SelectComp
											value={debt.debtor}
											options={debtorOptions}
											onChange={(val) => updateDebt(index, 'debtor', val)}
											placeholder="Select person..."
										/>
									</DebtRowField>
									<DebtRowField $flex="0 0 90px">
										<SmallLabel>Amount</SmallLabel>
										<Input
											type="number"
											value={debt.amount}
											onChange={(val) => updateDebt(index, 'amount', val)}
											placeholder="0.00"
										/>
									</DebtRowField>
									{debts.length > 1 && (
										<RemoveButton type="button" onClick={() => removeDebtRow(index)}>
											×
										</RemoveButton>
									)}
								</DebtRow>
							))}
							
							<AddButton type="button" onClick={addDebtRow}>
								+ Add another person
							</AddButton>
							
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
									<NewDebtorActions>
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
									</NewDebtorActions>
								</NewDebtorRow>
							) : (
								<AddDebtorButton type="button" onClick={() => setShowNewDebtorInput(true)}>
									+ Create new debtor
								</AddDebtorButton>
							)}
						</DebtSection>
					)}

					<Button onClick={handleSubmit} disabled={loading}>
						{loading ? 'Submitting...' : 'Submit Expense'}
					</Button>
				</FormStack>
			</Form>
		</Card>
	);
}
