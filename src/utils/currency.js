/**
 * Currency utilities
 * 
 * This module centralizes all currency-related logic.
 * The EXCHANGE_RATE can later be replaced with an API call.
 */

export const CURRENCIES = {
	USD: 'USD',
	COP: 'COP',
};

// Default exchange rate - this will eventually come from an API
let EXCHANGE_RATE = 4000;

/**
 * Set the exchange rate (for future API integration)
 */
export function setExchangeRate(rate) {
	EXCHANGE_RATE = rate;
}

/**
 * Get the current exchange rate
 */
export function getExchangeRate() {
	return EXCHANGE_RATE;
}

/**
 * Convert an amount to USD based on the source currency
 * @param {number} amount - The amount to convert
 * @param {string} currency - The source currency (USD or COP)
 * @returns {number} The amount in USD
 */
export function convertToUSD(amount, currency) {
	const num = Number(amount);
	if (currency === CURRENCIES.USD) return num;
	return Number((num / EXCHANGE_RATE).toFixed(2));
}

/**
 * Convert an amount from USD to COP
 * @param {number} amount - The amount in USD
 * @returns {number} The amount in COP
 */
export function convertToCOP(amount) {
	return Number((Number(amount) * EXCHANGE_RATE).toFixed(0));
}

/**
 * Toggle between USD and COP
 * @param {string} currentCurrency - Current currency
 * @returns {string} The other currency
 */
export function toggleCurrency(currentCurrency) {
	return currentCurrency === CURRENCIES.USD ? CURRENCIES.COP : CURRENCIES.USD;
}

/**
 * Check if the currency is USD
 * @param {string} currency 
 * @returns {boolean}
 */
export function isUSD(currency) {
	return currency === CURRENCIES.USD;
}
