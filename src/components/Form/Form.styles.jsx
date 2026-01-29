import styled from 'styled-components';

export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: ${({ theme }) => theme.spacing.md};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
`;
