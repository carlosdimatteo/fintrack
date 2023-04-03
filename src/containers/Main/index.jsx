import { useState } from 'react';
import Axios from "axios";
import { Input } from '../../components/Input';
import { Title, MainContainer } from './Main.styles';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form'


export function Main() {
	const [category, setCategory] = useState('');
	const [expense, setExpense] = useState('');
	const [description, setDescription] = useState('');

	const postData = (e) => {
		e.preventDefault()
		console.log('clicked')

		Axios.post("/api/submit", {
			category: category,
			expense: expense,
			description: description
		}).then(res => console.log('Posting data', res))
			.catch(err => console.log(err))

	}

	return (
		<MainContainer>
			<Title>{`Track your expense`}</Title>
			<Form
				onSubmit={postData}
			>
				<label>Category</label>
			<Input
				placeholder="Input the value"
				value={category}
				onChange={setCategory}
			/>
			<label>Amount</label>
			<Input
				placeholder="Input the value"
				value={expense}
				onChange={setExpense}
			/>
			<label>Description</label>
			<Input
				placeholder="Input the value"
				value={description}
				onChange={setDescription}
			/>
			<Button>TRACK!!!</Button>
			</Form>
		</MainContainer>
	);
}
