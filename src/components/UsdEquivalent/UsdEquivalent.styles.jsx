import styled from 'styled-components';

export const Hint = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm || '0.875rem'};
	color: ${({ theme }) => theme.colors.text.muted || 'inherit'};
	opacity: 0.85;
`;

export const RateMeta = styled.span`
	opacity: 0.8;
	font-size: 0.8em;
`;
