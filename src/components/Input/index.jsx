import { StyledInput, StyledCurrencyButton } from './Input.styles';

export function CurrencyButton({
	children,
	type,
	disabled,
	onClick,
	className,
}) {
	return (
		<StyledCurrencyButton
			className={className}
			type={type}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</StyledCurrencyButton>
	);
}

export function Input({ placeholder, onChange, value, type }) {
	function handleChange(e) {
		onChange && onChange(e.target.value);
	}
	return (
		<StyledInput
			placeholder={placeholder}
			onChange={(e) => handleChange(e)}
			value={value}
			type={type || 'text'}
		/>
	);
}
