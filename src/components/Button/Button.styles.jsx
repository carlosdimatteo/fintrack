import styled from 'styled-components';

export const StyledButton = styled.button`
	background: ${({ theme }) => theme.colors.tabs.activeGradient};
	border-radius: 12px;
	border: none;
	padding: 0 24px;
	min-width: 120px;
	letter-spacing: 0.05rem;
	font-weight: 600;
	font-family: ${({ theme }) => theme.typography.fontFamily};
	font-size: 15px;
	box-sizing: border-box;
	width: 100%;
	height: 48px;
	color: ${({ theme }) => theme.colors.tabs.activeText};
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
	transition: all 0.15s ease;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

	&:active {
		transform: scale(0.97);
	}

	&:hover {
		opacity: 0.9;
	}
`;
