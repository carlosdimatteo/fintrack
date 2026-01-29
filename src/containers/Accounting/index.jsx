import { useEffect, useReducer } from 'react';
import { useAccounting, useAllAcounts } from '../../hooks/useAPI';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import {
	PageWrapper,
	PageHeader,
	PageTitle,
	SectionTitle,
	FormField,
	FieldLabel,
	FormStack,
} from '../../components/Layout';
import { useNavigate } from 'react-router-dom';

function accountByBalanceReducer(
	balancesByAccount,
	{ accountId, balance, reset, resetData },
) {
	if (reset) {
		const resetted = resetData.reduce((acc, account) => {
			return {
				...acc,
				[account.id]: account.balance,
			};
		}, {});
		resetted.isReady = true;
		return resetted;
	} else {
		return {
			...balancesByAccount,
			[accountId]: balance,
		};
	}
}

export function Accounting() {
	const navigate = useNavigate();
	const { loading, submitAccounting } = useAccounting({
		onSuccess: function () {
			navigate('/', { replace: true });
		},
	});
	const { accounts, investmentAccounts } = useAllAcounts({
		placeholderData: {
			accounts: [],
			investmentAccounts: [],
		},
	});
	const [realBalancesByAccount, setBalance] = useReducer(
		accountByBalanceReducer,
		{ isReady: false },
	);
	const [realBalancesByInvestmentAccount, setCapitalBalance] = useReducer(
		accountByBalanceReducer,
		{ isReady: false },
	);

	function handleSubmit() {
		const requestBody = {
			accounts: accounts.map((acc) => ({
				...acc,
				id: acc.id,
				balance: +realBalancesByAccount[acc.id],
			})),
			investment_accounts: investmentAccounts.map((acc) => ({
				...acc,
				id: acc.id,
				balance: +realBalancesByInvestmentAccount[acc.id],
			})),
		};
		submitAccounting(requestBody);
	}

	useEffect(() => {
		setBalance({ reset: true, resetData: accounts });
		setCapitalBalance({ reset: true, resetData: investmentAccounts });
	}, [accounts, investmentAccounts]);

	const isReady =
		realBalancesByAccount.isReady &&
		realBalancesByInvestmentAccount.isReady &&
		realBalancesByAccount[accounts[accounts.length - 1]?.id] !== undefined;

	return (
		<PageWrapper>
			<PageHeader>
				<PageTitle>Accounting</PageTitle>
			</PageHeader>

			{isReady && (
				<FormStack>
					{/* Fiat Accounts */}
					<Card>
						<SectionTitle>Fiat Accounts</SectionTitle>
						<FormStack>
							{accounts.map((account) => (
								<FormField key={account.id}>
									<FieldLabel>{account.name}</FieldLabel>
									<Input
										type="number"
										value={realBalancesByAccount[account.id]}
										onChange={(val) => {
											setBalance({ accountId: account.id, balance: val });
										}}
									/>
								</FormField>
							))}
						</FormStack>
					</Card>

					{/* Investment Accounts */}
					<Card>
						<SectionTitle>Investment Accounts</SectionTitle>
						<FormStack>
							{investmentAccounts.map((account) => (
								<FormField key={account.id}>
									<FieldLabel>{account.name}</FieldLabel>
									<Input
										type="number"
										value={realBalancesByInvestmentAccount[account.id]}
										onChange={(val) => {
											setCapitalBalance({
												accountId: account.id,
												balance: val,
											});
										}}
									/>
								</FormField>
							))}
						</FormStack>
					</Card>

					<Button disabled={loading} onClick={handleSubmit}>
						{loading ? 'Submitting...' : 'Update Balances'}
					</Button>
				</FormStack>
			)}
		</PageWrapper>
	);
}
