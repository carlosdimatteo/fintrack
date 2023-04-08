import { useState } from 'react';
import Axios from "axios";
import { MainContainer, Text } from './Main.styles';
import { Form } from '../../components/Form'
import { Input, CurrencyButton } from '../../components/Input';
import { StyledDiv } from '../../components/Input/Input.styles';
import { SelectComp } from '../../components/Select'
import { Textarea } from '../../components/Textarea';
import { Button } from '../../components/Button';

export function Main() {
	const [category, setCategory] = useState('');
	const [expense, setExpense] = useState('');
	const [description, setDescription] = useState('');
	const currencies = {
			dollar: "USD",
			peso: "COP",
	}
	const [activeCurrency, setActiveCurrency] = useState(currencies.dollar)
	const [text, setText] = useState('')

	function actualCurrency() {
		if (activeCurrency === currencies.dollar) setActiveCurrency(currencies.peso) 
		if (activeCurrency === currencies.peso) setActiveCurrency(currencies.dollar)
	}

	const options = [
		{label: 'Alojamiento', value: 'alojamiento'},
		{label: 'Comida', value: 'comida'},
		{label: 'Viajes', value: 'viajes'},
		{label: 'Bienestar', value: 'bienestar'},
		{label: 'Salud', value: 'salud'},
		{label: 'Ocio y entretenimiento', value: 'ocio y entretenimiento'},
		{label: 'Transporte', value: 'transporte'},
		{label: 'Bienes materiales', value: 'bienes materiales'},
		{label: 'Prestamos e Inversiones', value: 'prestamos e inversiones'},
		] 

	function clearInput() {
		setCategory()
		setExpense('')
		setDescription('')
		setText(null)
	}

	function checkForm() {
		if (category === "" && expense === "") alert ("Please select category and input total expense")
		else if (category === "") alert ("Please select category")
		else if (expense === "") alert("Please input total expense")
		else postData()
	}

	const postData = () => {
		Axios.post("/api/submit", {
			category: category,
			expense: activeCurrency === currencies.dollar ? expense : ((expense/4800).toFixed(2)),
			description: description
		}).then(res => console.log('Posting data', res))
			.catch(err => console.log(err))
		
	clearInput()
	}

	return (
		<MainContainer>
			<Form
				onSubmit={(e) => {
					e.preventDefault()
				}}
			>
			<Text>Category</Text>
			<SelectComp
				onChange={(e)=>{setCategory(e.value)}}	
				defaultValue={text}
				value={text}
				options={options}						
			/>
			<Text>Amount</Text>
			<StyledDiv>
				<Input
					value={expense}
					onChange={setExpense}
				/>
				<CurrencyButton
					onClick={(e) => {
						e.preventDefault()
						console.log("Currency")
						actualCurrency()	
					}}	
				>
				{activeCurrency}		
				</CurrencyButton>				
			</StyledDiv>
			
			<Text>Description</Text>
			<Textarea
				value={description}
				onChange={setDescription}
			/>
			<Button
					onClick={(e) => {
						e.preventDefault()
						checkForm()
					}
						
					}	
			>SUBMIT</Button>
			</Form>
		</MainContainer>
	);
}
