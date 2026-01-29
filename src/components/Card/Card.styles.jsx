import styled, { css } from 'styled-components';

/**
 * Glass Card using gradient border technique (padding-box/border-box)
 * Interior is mostly translucent, color comes from the border shine
 */

export const GlassCard = styled.div`
	position: relative;
	border-radius: 14px;
	padding: ${({ $padding, theme }) => $padding || theme.spacing.lg};
	
	/* Gradient border technique: interior + border gradient */
	border: 1px solid transparent;
	background: 
		linear-gradient(${({ theme }) => theme.colors.card.interior}, ${({ theme }) => theme.colors.card.interior}) padding-box,
		${({ theme }) => theme.colors.card.borderGradient} border-box;
	
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	
	/* Inner highlight + shadow */
	box-shadow: 
		${({ theme }) => theme.colors.card.innerHighlight},
		${({ theme }) => theme.colors.card.shadow};
	
	transition: all ${({ theme }) => theme.transitions.normal};

	${({ $clickable, theme }) =>
		$clickable &&
		css`
			cursor: pointer;
			&:hover {
				background: 
					linear-gradient(${theme.colors.card.interiorHover}, ${theme.colors.card.interiorHover}) padding-box,
					${theme.colors.card.borderGradient} border-box;
			}
			&:active {
				transform: scale(0.98);
			}
		`}
`;

// Simple version with flat border (for nested cards, less prominent)
export const GlassCardSimple = styled.div`
	position: relative;
	border-radius: 12px;
	padding: ${({ $padding, theme }) => $padding || theme.spacing.lg};
	background: ${({ theme }) => theme.colors.card.interior};
	border: 1px solid rgba(120, 180, 180, 0.12);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
	box-shadow: ${({ theme }) => theme.colors.card.innerHighlight};
	transition: all ${({ theme }) => theme.transitions.normal};

	${({ $clickable, theme }) =>
		$clickable &&
		css`
			cursor: pointer;
			&:hover {
				background: ${theme.colors.card.interiorHover};
			}
			&:active {
				transform: scale(0.98);
			}
		`}
`;

// Wrapper not needed with padding-box technique, but keeping for backwards compat
export const CardWrapper = styled.div`
	/* No longer used - gradient border is now inline */
`;

export const CardHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CardTitle = styled.h3`
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
	margin: 0;
`;

export const CardSubtitle = styled.p`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
	margin: 0;
`;

export const CardContent = styled.div`
	color: ${({ theme }) => theme.colors.text.primary};
`;
