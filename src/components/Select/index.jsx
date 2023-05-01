import Select from 'react-select';
import { StyledDiv } from './Select.styles';

const options = [
	{ value: 'Alojamiento', label: 'Alojamiento' },
	{ value: 'Comida', label: 'Comida' },
	{ value: 'Viajes', label: 'Viajes' },
	{ value: 'Bienestar', label: 'Bienestar' },
	{ value: 'Salud', label: 'Salud' },
	{
		value: 'Ocio y Entretenimiento (salidas y eventos)',
		label: 'Ocio y Entretenimiento',
	},
	{ value: 'Transporte (taxis)', label: 'Transporte' },
	{ value: 'Bienes materiales (shopping)', label: 'Bienes Materiales' },
	{ value: 'Prestamos', label: 'Prestamos e Inversiones' },
];

const colorStyles = {
	control: (styles) => ({
		...styles,
		height: '45px',
		width: 'calc(400px * .7);',
		borderRadius: '10px',
		border: '1px solid transparent',
		margin: '10px 0 30px 0',
		fontFamily: 'Barlow',
	}),
	option: (styles, { data }) => {
		return { ...styles, color: '#070606', height: '50%' };
	},
};

export function SelectComp({ onChange, defaultValue, value }) {
	return (
		<StyledDiv>
			<Select
				onChange={onChange}
				defaultValue={defaultValue}
				value={value}
				onFocus={(e) => (e.target.readOnly = true)}
				options={options}
				styles={colorStyles}
			/>
		</StyledDiv>
	);
}
