import styled from 'styled-components';

export const MainContainer = styled.div`
	display: flex;
	padding: 2rem;
	flex-direction: column;
	align-items: center;
	gap: 4rem;
	box-sizing: border-box;
	max-width: 50rem;
	height: 100vh;
	@media screen and (max-width: 758px) {
		padding: 4px;
	}
	position: relative;
`;

export const Title = styled.div`
	font-size: 2rem;
	line-height: 4rem;
`;

export const Text = styled.div`
	line-height: 1.2rem;
`;
