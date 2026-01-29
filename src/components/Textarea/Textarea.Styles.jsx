import styled from 'styled-components';

export const StyledTextarea = styled.textarea`
	display: block;
	padding: 12px 16px;
	border: 1px solid ${({ theme }) => theme.colors.input.border};
	letter-spacing: 0.02rem;
	border-radius: 10px;
	font-size: 16px;
	font-family: ${({ theme }) => theme.typography.fontFamily};
	min-height: 80px;
	width: 100%;
	resize: none;
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