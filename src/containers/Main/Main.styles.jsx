import styled from 'styled-components';

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: auto;
	margin: auto;
	box-sizing: border-box;
`;

export const PageContent = styled.div`
	display: flex;

	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	gap: 2rem;
	box-sizing: border-box;
	overflow-y: auto;
	max-height: calc(100vh - 4rem);
	@media screen and (max-width: 758px) {
		padding: 6px 6px 0px 6px;
	}
`;

export const Title = styled.div`
	font-size: 2rem;
	line-height: 4rem;
`;

export const Text = styled.div`
	line-height: 1.2rem;
`;

export const PageContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	max-height: 100%;
	overflow-y: auto;
	padding: 1rem 2rem 0rem 2rem;
	box-sizing: border-box;
	align-items: center;
`;
