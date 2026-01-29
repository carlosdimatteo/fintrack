import styled from 'styled-components';

const getVariantStyles = (variant, theme) => {
	switch (variant) {
		case 'success':
			return `
				background: ${theme.colors.status.successMuted};
				color: ${theme.colors.status.success};
			`;
		case 'danger':
			return `
				background: ${theme.colors.status.dangerMuted};
				color: ${theme.colors.status.danger};
			`;
		case 'warning':
			return `
				background: ${theme.colors.status.warningMuted};
				color: ${theme.colors.status.warning};
			`;
		case 'accent':
			return `
				background: ${theme.colors.accent.primaryMuted};
				color: ${theme.colors.accent.primary};
			`;
		default:
			return `
				background: rgba(255, 255, 255, 0.1);
				color: ${theme.colors.text.secondary};
			`;
	}
};

export const BadgeContainer = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: ${({ $size }) => ($size === 'small' ? '2px 8px' : '4px 12px')};
	border-radius: ${({ theme }) => theme.borderRadius.full};
	font-size: ${({ $size, theme }) =>
		$size === 'small' ? theme.typography.sizes.xs : theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	${({ $variant, theme }) => getVariantStyles($variant, theme)}
`;
