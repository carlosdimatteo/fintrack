import { useEffect, useReducer } from 'react';
import { useAccounting, useAllAcounts } from '../../hooks/useAPI';
import { PageContainer, Text, Title } from '../Main/Main.styles';
import { FormContainer, FormItemContainer } from './Accounting.styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
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
		onSuccess: function (data) {
			console.log({ data });
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
			accounts: accounts.map((acc) => {
				return { ...acc, id: acc.id, balance: +realBalancesByAccount[acc.id] };
			}),
			investment_accounts: investmentAccounts.map((acc) => {
				return {
					...acc,
					id: acc.id,
					balance: +realBalancesByInvestmentAccount[acc.id],
				};
			}),
		};
		submitAccounting(requestBody);
	}

	useEffect(() => {
		setBalance({ reset: true, resetData: accounts });
		setCapitalBalance({ reset: true, resetData: investmentAccounts });
	}, [accounts, investmentAccounts]);
	return (
		<PageContainer>
			<Title>Accounting</Title>
			{realBalancesByAccount.isReady &&
				realBalancesByInvestmentAccount.isReady &&
				realBalancesByAccount[accounts[accounts.length - 1]?.id] !==
					undefined && (
					<FormContainer>
						{accounts.map((account) => (
							<FormItemContainer key={account.id}>
								<Text>{account.name}</Text>
								<Input
									type="number"
									value={realBalancesByAccount[account.id]}
									onChange={(val) => {
										setBalance({ accountId: account.id, balance: val });
									}}
								/>
							</FormItemContainer>
						))}
						{investmentAccounts.map((account) => (
							<FormItemContainer key={account.id}>
								<Text>{account.name} (investment)</Text>
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
							</FormItemContainer>
						))}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								width: '100%',
							}}
						>
							<Button disabled={loading} onClick={handleSubmit}>
								Submit
							</Button>
						</div>
					</FormContainer>
				)}
		</PageContainer>
	);
}
