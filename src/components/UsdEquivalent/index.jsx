import { CURRENCIES, convertToUSD } from '../../utils/currency';
import { Hint, RateMeta } from './UsdEquivalent.styles';

/**
 * Shows a subtle "≈ $X.XX USD" and the rate when the user is entering a non-USD amount.
 * Renders nothing when currency is USD, amount is empty/invalid, or rate is not yet available.
 */
export function UsdEquivalent({ amount, currency, conversionRate }) {
	if (currency === CURRENCIES.USD) return null;
	const num = Number(amount);
	if (!amount || Number.isNaN(num) || num <= 0) return null;
	if (conversionRate == null) return null;
	const usd = convertToUSD(num, currency, conversionRate);
	const rateFormatted = Number(conversionRate).toLocaleString();
	return (
		<Hint>
			≈ ${usd.toFixed(2)} USD <RateMeta>(1 USD = {rateFormatted} {currency})</RateMeta>
		</Hint>
	);
}
