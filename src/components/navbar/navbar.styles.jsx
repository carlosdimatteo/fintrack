import styled from 'styled-components';

export const NavContainer = styled.div`
	display: flex;
	background: ${({ theme }) => theme.colors.card.interior};
	border-top: 1px solid rgba(120, 180, 180, 0.1);
	justify-content: space-around;
	box-sizing: border-box;
	width: 100%;
	align-items: center;
	height: 60px;
	padding: 0 4px;
	flex-shrink: 0;
`;

export const PositionContainer = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	z-index: 100;
`;

export const NavItem = styled.div`
	flex: 1;
	max-width: 72px;
	padding: 8px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.15s ease;
	color: ${({ active, theme }) =>
		active ? theme.colors.accent.primary : theme.colors.text.primary};

	&:active {
		transform: scale(0.9);
	}

	svg {
		transition: all 0.15s ease;
	}
`;
