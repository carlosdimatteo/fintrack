/**
 * Formatting utilities for displaying data
 */

/**
 * Format a number as USD currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
}

/**
 * Format a date string for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date (e.g., "Jan 28, 2026")
 */
export function formatDate(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

/**
 * Format a date string with time
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date with time (e.g., "Jan 28, 2026 at 2:30 PM")
 */
export function formatDateTime(dateString) {
	const date = new Date(dateString);
	const dateStr = date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
	});
	const timeStr = date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	});
	return `${dateStr}, ${timeStr}`;
}

/**
 * Format a percentage value with sign
 * @param {number} value - The percentage value
 * @returns {string} Formatted percentage (e.g., "+5.25%" or "-3.50%")
 */
export function formatPercent(value) {
	const sign = value >= 0 ? '+' : '';
	return `${sign}${value.toFixed(2)}%`;
}

/**
 * Format a number with sign prefix
 * @param {number} amount - The amount
 * @returns {string} Amount with + or - prefix
 */
export function formatSignedCurrency(amount) {
	const sign = amount >= 0 ? '+' : '';
	return `${sign}${formatCurrency(amount)}`;
}

// Hidden placeholder for privacy mode
export const HIDDEN_VALUE = '••••••';

/**
 * Get privacy-aware formatters
 * @param {boolean} isHidden - Whether values should be hidden
 * @returns {object} Object with formatter functions
 */
export function getPrivateFormatters(isHidden) {
	if (isHidden) {
		return {
			currency: () => HIDDEN_VALUE,
			signedCurrency: () => HIDDEN_VALUE,
			// Percentages are NOT hidden
			percent: formatPercent,
			date: formatDate,
			dateTime: formatDateTime,
		};
	}
	
	return {
		currency: formatCurrency,
		signedCurrency: formatSignedCurrency,
		percent: formatPercent,
		date: formatDate,
		dateTime: formatDateTime,
	};
}
