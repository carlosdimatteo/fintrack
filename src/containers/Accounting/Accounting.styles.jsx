import styled from 'styled-components';
export const AccountingContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	max-height: 100%;
	overflow-y: auto;
	padding: 2rem;
	box-sizing: border-box;
`;

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;

	gap: 1rem;
`;

export const FormItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	background: ${({ theme: { gradient } }) => gradient.main.background};
	padding: 1rem;
	justify-content: center;
	border-radius: 10px;
	box-sizing: border-box;
`;
