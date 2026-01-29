import { usePrivacy } from '../context/PrivacyContext';
import { getPrivateFormatters, HIDDEN_VALUE } from '../utils/formatters';

/**
 * Hook that returns privacy-aware formatters
 * Currency values will be hidden when privacy mode is on
 * Percentages are always shown
 */
export function usePrivateFormatters() {
	const { valuesHidden } = usePrivacy();
	return getPrivateFormatters(valuesHidden);
}

export { HIDDEN_VALUE };
