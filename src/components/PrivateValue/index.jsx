import { usePrivacy } from '../../context/PrivacyContext';

const HIDDEN_PLACEHOLDER = '••••••';

export function PrivateValue({ children, placeholder = HIDDEN_PLACEHOLDER }) {
	const { valuesHidden } = usePrivacy();
	
	if (valuesHidden) {
		return placeholder;
	}
	
	return children;
}

// Hook version for more complex cases
export function usePrivateValue(value, placeholder = HIDDEN_PLACEHOLDER) {
	const { valuesHidden } = usePrivacy();
	return valuesHidden ? placeholder : value;
}
