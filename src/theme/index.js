/**
 * Fintrack Theme
 * Dark glass-morphism theme
 * Key principle: Translucent surfaces with color only at edges (border shine)
 */

export const colors = {
	// Base - not pure black so glass cards show transparency
	background: '#101418',
	backgroundAlt: '#0c0f12',

	// Glass card - mostly translucent, color at edges only
	card: {
		// Interior fill - mostly transparent, very subtle tint
		interior: 'rgba(20, 28, 30, 0.75)',
		interiorHover: 'rgba(28, 36, 38, 0.8)',
		// Gradient border (135deg: bright → dim → medium for organic light)
		borderGradient: `linear-gradient(135deg, 
			rgba(140, 220, 220, 0.5) 0%, 
			rgba(120, 180, 180, 0.08) 40%, 
			rgba(120, 200, 200, 0.3) 100%
		)`,
		// Inner highlight (light reflection at top)
		innerHighlight: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
		// Drop shadow
		shadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
	},

	// Teal accent
	accent: {
		primary: '#7a9e9f',
		primaryMuted: 'rgba(122, 158, 159, 0.12)',
		secondary: '#5a8384',
	},

	// Text - high contrast
	text: {
		primary: '#E6ECEC',
		secondary: 'rgba(230, 236, 236, 0.9)',
		muted: 'rgba(230, 236, 236, 0.6)',
		inverse: '#0a0a0a',
	},

	// Status colors
	status: {
		success: '#4ade80',
		successMuted: 'rgba(74, 222, 128, 0.12)',
		danger: '#f87171',
		dangerMuted: 'rgba(248, 113, 113, 0.12)',
		warning: '#fbbf24',
		warningMuted: 'rgba(251, 191, 36, 0.12)',
	},

	// Input
	input: {
		background: 'rgba(255, 255, 255, 0.95)',
		backgroundDark: 'rgba(20, 28, 30, 0.5)',
		border: 'rgba(120, 180, 180, 0.2)',
		borderFocus: '#7a9e9f',
		placeholder: 'rgba(0, 0, 0, 0.4)',
	},

	// Tabs container - more transparent with border shine
	tabs: {
		containerBg: 'rgba(20, 30, 32, 0.6)',
		// Gradient border for container
		containerBorderGradient: `linear-gradient(135deg,
			rgba(140, 220, 220, 0.35) 0%,
			rgba(120, 180, 180, 0.05) 50%,
			rgba(120, 200, 200, 0.25) 100%
		)`,
		// Active pill - diagonal gradient
		activeGradient: 'linear-gradient(135deg, rgba(200, 225, 225, 0.95), rgba(160, 190, 190, 0.88))',
		activeText: '#1a2828',
		// Inactive
		inactive: 'transparent',
		inactiveText: 'rgba(230, 236, 236, 0.5)',
	},

	// Button - flat border, no gradient border
	button: {
		background: 'rgba(40, 60, 62, 0.4)',
		backgroundHover: 'rgba(50, 75, 78, 0.5)',
		border: 'rgba(120, 180, 180, 0.25)',
	},

	// List items - transparent, minimal styling
	list: {
		background: 'transparent',
		backgroundHover: 'rgba(120, 180, 180, 0.06)',
		// Subtle right edge shine for some items
		edgeShine: 'linear-gradient(90deg, transparent 98%, rgba(120, 180, 180, 0.15) 100%)',
	},
};

export const spacing = {
	xs: '0.25rem', // 4px
	sm: '0.5rem', // 8px
	md: '1rem', // 16px
	lg: '1.5rem', // 24px
	xl: '2rem', // 32px
	xxl: '3rem', // 48px
};

export const borderRadius = {
	sm: '8px',
	md: '12px',
	lg: '16px',
	xl: '20px',
	xxl: '24px',
	full: '9999px',
};

export const typography = {
	fontFamily: "'Barlow', sans-serif",
	sizes: {
		xs: '0.75rem', // 12px
		sm: '0.875rem', // 14px
		base: '1rem', // 16px
		lg: '1.125rem', // 18px
		xl: '1.25rem', // 20px
		'2xl': '1.5rem', // 24px
		'3xl': '2rem', // 32px
		'4xl': '2.5rem', // 40px
	},
	weights: {
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
	},
};

export const shadows = {
	sm: '0 2px 8px rgba(0, 0, 0, 0.2)',
	md: '0 4px 16px rgba(0, 0, 0, 0.3)',
	lg: '0 8px 32px rgba(0, 0, 0, 0.4)',
	glow: '0 0 20px rgba(107, 154, 156, 0.2)',
};

export const transitions = {
	fast: '0.15s ease',
	normal: '0.2s ease',
	slow: '0.3s ease',
};

// Glass effect mixin values
export const glass = {
	blur: '12px',
	background: colors.card.background,
	border: `1px solid ${colors.card.border}`,
};

// Full theme object for styled-components ThemeProvider
const theme = {
	colors,
	spacing,
	borderRadius,
	typography,
	shadows,
	transitions,
	glass,
	// Legacy support for existing components
	gradient: {
		main: {
			background: colors.card.background,
		},
	},
};

export default theme;
