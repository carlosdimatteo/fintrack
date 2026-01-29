import styled from 'styled-components';

export const TabsContainer = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 4px;
	padding: 5px 6px;
	border-radius: 12px;
	
	/* Gradient border technique for container */
	border: 1px solid transparent;
	background: 
		linear-gradient(${({ theme }) => theme.colors.tabs.containerBg}, ${({ theme }) => theme.colors.tabs.containerBg}) padding-box,
		${({ theme }) => theme.colors.tabs.containerBorderGradient} border-box;
	
	backdrop-filter: blur(8px);
	-webkit-backdrop-filter: blur(8px);
`;

export const TabButton = styled.button`
	position: relative;
	padding: 10px 22px;
	border: none;
	border-radius: 8px;
	font-family: ${({ theme }) => theme.typography.fontFamily};
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	cursor: pointer;
	transition: all ${({ theme }) => theme.transitions.fast};

	/* Active: diagonal gradient */
	background: ${({ $active, theme }) =>
		$active ? theme.colors.tabs.activeGradient : theme.colors.tabs.inactive};
	color: ${({ $active, theme }) =>
		$active ? theme.colors.tabs.activeText : theme.colors.tabs.inactiveText};

	/* Active gets subtle shadow */
	box-shadow: ${({ $active }) =>
		$active ? '0 2px 8px rgba(0, 0, 0, 0.2)' : 'none'};

	&:hover {
		color: ${({ $active, theme }) =>
			$active ? theme.colors.tabs.activeText : theme.colors.text.primary};
		background: ${({ $active, theme }) =>
			$active ? theme.colors.tabs.activeGradient : 'rgba(120, 180, 180, 0.06)'};
	}

	&:active {
		transform: scale(0.97);
	}
`;
