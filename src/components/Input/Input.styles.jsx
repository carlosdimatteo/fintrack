import styled from 'styled-components';

export const StyledInput = styled.input`
	padding: 12px 16px;
	display: flex;
	border: 1px solid ${({ theme }) => theme.colors.input.border};
	letter-spacing: 0.02rem;
	border-radius: 10px;
	font-size: 16px;
	font-family: ${({ theme }) => theme.typography.fontFamily};
	height: 48px;
	width: ${({ width }) => (width ? width : '100%')};
	transition: all 0.15s ease;
	box-sizing: border-box;
	background: ${({ theme }) => theme.colors.input.background};
	color: #1a1a1a;

	&::placeholder {
		color: ${({ theme }) => theme.colors.input.placeholder};
	}

	&:focus {
		outline: none;
		box-shadow: none;
		border-color: ${({ theme }) => theme.colors.input.borderFocus};
	}
`;

export const StyledCurrencyButton = styled.button`
	height: 48px;
	border-radius: 10px;
	border: 1px solid ${({ theme }) => theme.colors.button.border};
	background: ${({ theme }) => theme.colors.button.background};
	backdrop-filter: blur(8px);
	min-width: 60px;
	padding: 0 12px;
	cursor: pointer;
	font-weight: 600;
	font-family: ${({ theme }) => theme.typography.fontFamily};
	font-size: 14px;
	color: ${({ theme }) => theme.colors.text.primary};
	transition: all 0.15s ease;

	&:hover {
		background: ${({ theme }) => theme.colors.button.backgroundHover};
	}

	&:active {
		transform: scale(0.96);
	}
`;
