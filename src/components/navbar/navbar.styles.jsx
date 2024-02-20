import styled from 'styled-components';

export const NavContainer = styled.div`
	display: flex;
	background: ${({ theme: { gradient } }) => gradient.main.background};
	border-radius: 8px;
	border-radius: 5px;
	max-width: 50rem;
	justify-content: space-between;
	box-sizing: border-box;

	width: max-content;
	max-width: 100%;
	position: absolute;
	bottom: 0;
	scrollbar-color: gray transparent;
	align-items: center;
	@media screen and (max-width: 758px) {
		overflow-x: scroll;
	}
`;

export const NavItem = styled.div`
	padding: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
	text-underline-offset: 12px;
`;
