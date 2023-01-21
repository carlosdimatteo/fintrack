import { useEffect, useState } from 'react';
import { Input } from '../../components/Input';
import { Title, MainContainer } from './Main.styles';
import { Button } from '../../components/Button';
import { appendExpenseRowToSheet } from '../../api/google-sheets';

export function Main() {
	const [username, setUsername] = useState('');
	useEffect(() => {
		console.log('loaded');
	}, []);

	/**  function handleApiSubmit() {
		appendExpenseRowToSheet()
			.then((data) => {
				succesfully appended mostrar al usuario que esta cuca y reiniciar los inputs 
			})
			.catch((error) => {
				console.log({ error });
        darle feedback al usuario de que la verga no sirvio y con un mensaje de error pa ver que cono pasa 
			});
	} */

	return (
		<MainContainer>
			<Title>{`Track your expense`}</Title>
			<Input
				placeholder="Input the value"
				value={username}
				onChange={setUsername}
			/>
			<Button
				onClick={() => {
					console.log('clicked');
				}}
			>
				TRACK!!!
			</Button>
		</MainContainer>
	);
}
