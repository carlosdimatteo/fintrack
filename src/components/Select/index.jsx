import Select from 'react-select';

const getSelectStyles = (theme) => ({
	control: (styles, { isFocused }) => ({
		...styles,
		height: '48px',
		minHeight: '48px',
		width: '100%',
		borderRadius: '10px',
		border: `1px solid ${isFocused ? theme.colors.input.borderFocus : theme.colors.input.border}`,
		backgroundColor: theme.colors.input.background,
		fontFamily: theme.typography.fontFamily,
		fontSize: '16px',
		boxShadow: 'none',
		'&:hover': {
			borderColor: theme.colors.input.borderFocus,
		},
	}),
	option: (styles, { isSelected, isFocused }) => ({
		...styles,
		color: '#1a1a1a',
		backgroundColor: isSelected
			? 'rgba(120, 180, 180, 0.3)'
			: isFocused
				? 'rgba(120, 180, 180, 0.1)'
				: 'white',
		fontFamily: 'Barlow',
		fontSize: '15px',
		padding: '12px 16px',
		cursor: 'pointer',
	}),
	menu: (styles) => ({
		...styles,
		borderRadius: '10px',
		overflow: 'hidden',
		boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
	}),
	menuList: (styles) => ({
		...styles,
		padding: 0,
	}),
	singleValue: (styles) => ({
		...styles,
		color: '#1a1a1a',
	}),
	placeholder: (styles) => ({
		...styles,
		color: 'rgba(0, 0, 0, 0.4)',
	}),
	indicatorSeparator: () => ({
		display: 'none',
	}),
});

export function SelectComp({ onChange, defaultValue, value, options, placeholder }) {
	return (
		<Select
			onChange={onChange}
			defaultValue={defaultValue}
			value={value}
			onFocus={(e) => (e.target.readOnly = true)}
			options={options}
			placeholder={placeholder || 'Select...'}
			styles={getSelectStyles({
				colors: {
					input: {
						border: 'rgba(120, 180, 180, 0.2)',
						borderFocus: '#7a9e9f',
						background: 'rgba(255, 255, 255, 0.95)',
					},
				},
				typography: {
					fontFamily: "'Barlow', sans-serif",
				},
			})}
		/>
	);
}
