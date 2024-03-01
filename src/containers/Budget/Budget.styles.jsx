import styled from 'styled-components';

export const BudgetContainer = styled.div`
	flex-direction: column;
	display: flex;
	align-items: center;
	overflow-y: auto;
	max-height: 100%;
	width: 100%;
	padding: 2rem;
	box-sizing: border-box;
	overflow-x: hidden;
	@media screen and (max-width: 758px) {
		padding: 6px;
	}
`;

export const BudgetTitle = styled.h1`
	font-size: 2rem;
`;

export const BudgetList = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	width: 100%;
	max-height: 100%;
	padding-top: 12px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	flex-wrap: wrap;
	@media screen and (max-width: 758px) {
		gap: 12px;
	}
	box-sizing: border-box;
`;

export const BudgetItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin: 1rem;
	padding: 0.5rem;
	background: ${({ theme: { gradient } }) => gradient.main.background};
	border-radius: 10px;
	width: ${({ fullWidth }) => (fullWidth ? '100%' : '20rem')};
	min-height: 3rem;
	height: max-content;
	box-sizing: border-box;
	@media screen and (max-width: 758px) {
		overflow-x: auto;
		width: ${({ fullWidth }) => (fullWidth ? '100%' : '10rem')};
		margin: 0;
	}
	box-sizing: border-box;
`;

export const BudgetItemTitle = styled.span`
	font-size: 1.1rem;
	width: 100%;
	text-align: left;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow-x: hidden;
	overflow-y: hidden;
	display: flex;
`;

export const BudgetAmount = styled.span`
	width: 100%;
	font-size: 1rem;
	font-weight: 500;
	color: ${({ color }) => {
		return color || 'white';
	}};
	text-align: right;
`;
