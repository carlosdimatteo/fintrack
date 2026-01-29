import styled from 'styled-components';

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	width: 100%;
	box-sizing: border-box;
	background: ${({ theme }) => theme.colors.background};
`;

export const PageContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	max-width: 100%;
	flex: 1;
	box-sizing: border-box;
	overflow-y: auto;
	overflow-x: hidden;
	max-height: calc(100vh - 64px);
`;

export const Title = styled.h1`
	font-size: ${({ theme }) => theme.typography.sizes['2xl']};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
	margin: 0;
`;

export const Text = styled.div`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
	line-height: 1.4;
`;

export const PageContainer = styled.div`
	display: flex;
	width: 100%;
	max-width: 500px;
	flex-direction: column;
	padding: ${({ theme }) => theme.spacing.lg};
	padding-bottom: 100px;
	box-sizing: border-box;
	align-items: center;
`;
