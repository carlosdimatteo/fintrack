import styled, { css } from 'styled-components';

export const ListItemContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 14px 16px;
	gap: 14px;
	transition: all ${({ theme }) => theme.transitions.fast};
	position: relative;
	/* Transparent background - no color here */
	background: transparent;

	${({ $selected }) =>
		$selected &&
		css`
			/* Subtle glow on left and right edges */
			box-shadow: 
				inset 3px 0 8px -3px rgba(120, 180, 180, 0.4),
				inset -3px 0 8px -3px rgba(120, 180, 180, 0.4);
		`}

	${({ $clickable }) =>
		$clickable &&
		css`
			cursor: pointer;
			&:hover {
				background: rgba(255, 255, 255, 0.03);
			}
			&:active {
				background: rgba(255, 255, 255, 0.05);
			}
		`}
`;

export const ListItemIcon = styled.div`
	width: 28px;
	height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.colors.text.secondary};
	flex-shrink: 0;

	svg {
		width: 22px;
		height: 22px;
		opacity: 0.8;
	}
`;

export const ListItemContent = styled.div`
	flex: 1;
	min-width: 0;
`;

export const ListItemTitle = styled.div`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.primary};
`;

export const ListItemSubtitle = styled.div`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.muted};
	margin-top: 2px;
`;

export const ListItemValue = styled.div`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ $color, theme }) => {
		if ($color === 'success') return theme.colors.status.success;
		if ($color === 'danger') return theme.colors.status.danger;
		return theme.colors.text.primary;
	}};
	flex-shrink: 0;
`;

/* Very subtle divider - almost invisible */
export const ListDivider = styled.div`
	height: 1px;
	background: rgba(255, 255, 255, 0.04);
	margin: 0 16px;
`;
