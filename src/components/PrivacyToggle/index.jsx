import styled from 'styled-components';
import { usePrivacy } from '../../context/PrivacyContext';
import { ReactComponent as EyeOpen } from '../../assets/icons/eye-open.svg';
import { ReactComponent as EyeClosed } from '../../assets/icons/eye-closed.svg';

const ToggleButton = styled.button`
	background: transparent;
	border: none;
	color: ${({ theme }) => theme.colors.text.secondary};
	cursor: pointer;
	padding: 6px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.15s ease;
	
	&:hover {
		background: rgba(120, 180, 180, 0.1);
		color: ${({ theme }) => theme.colors.text.primary};
	}
	
	svg {
		width: 20px;
		height: 20px;
	}
`;

export function PrivacyToggle() {
	const { valuesHidden, toggleHidden } = usePrivacy();
	
	return (
		<ToggleButton onClick={toggleHidden} title={valuesHidden ? 'Show values' : 'Hide values'}>
			{valuesHidden ? <EyeClosed /> : <EyeOpen />}
		</ToggleButton>
	);
}
