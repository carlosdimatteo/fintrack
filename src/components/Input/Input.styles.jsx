import styled from 'styled-components';

export const StyledInput = styled.input`
	padding: 6px 12px;
	display: flex;
	border: 1px solid transparent;
	letter-spacing: 0.1rem;
	border-radius: 10px;
	font-size: 15px;
	height: 50px;
	min-height: 35px;
	width: ${({ width }) => (width ? width : '100%')};
	transition: border 0.15s ease 0s;
	box-sizing: border-box;
	:focus {
		outline: none;
		box-shadow: none;
		border: 1.5px solid rgb(100, 153, 255);
	}
`;

export const StyledCurrencyButton = styled.button`
	height: 50px;
	border-radius: 10px;
	border: 1px solid transparent;
	min-width: 50px;
	cursor: pointer;
	font-weight: bold;
`;
