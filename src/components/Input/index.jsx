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
		const val = e.target.value;
		if (type === 'number' && val !== '') {
			// eslint-disable-next-line no-useless-escape
			let sanitizedValue = val.replace(/[^0-9\.]/gi, '');
			if (sanitizedValue.length > 1 && sanitizedValue[0] === '0') {
				sanitizedValue = sanitizedValue.slice(1);
			}
			onChange(sanitizedValue);
		} else {
			onChange(e.target.value);
		}
	}

	/**
	 * sanitize on key down if type is number
	 */
	function handleKeyDown(event) {
		if (type === 'number') {
			const inputHasDecimalPoint = value.toString()?.includes('.');
			if (inputHasDecimalPoint && event.key === '.') {
				event.preventDefault();
			}
		}
	}
	return (
		<StyledInput
			placeholder={placeholder}
			onChange={(e) => handleChange(e)}
			value={value}
			onKeyDown={handleKeyDown}
		/>
	);
}
