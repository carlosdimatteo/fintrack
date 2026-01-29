import styled from 'styled-components';

export const StatContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing.xs};
`;

export const StatLabel = styled.div`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

export const StatValue = styled.div`
	font-size: ${({ $size, theme }) =>
		$size === 'large' ? theme.typography.sizes['4xl'] : theme.typography.sizes['2xl']};
	font-weight: ${({ theme }) => theme.typography.weights.bold};
	color: ${({ theme }) => theme.colors.text.primary};
	letter-spacing: -0.02em;
`;

export const StatTrend = styled.div`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ $trend, theme }) =>
		$trend === 'up'
			? theme.colors.status.success
			: $trend === 'down'
				? theme.colors.status.danger
				: theme.colors.text.secondary};
`;
