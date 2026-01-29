import styled from 'styled-components';
import { ReactComponent as InfoSvg } from '../../assets/icons/info.svg';
import { ReactComponent as WarningSvg } from '../../assets/icons/warning.svg';

const InfoContainer = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 10px;
	padding: 10px 12px;
	background: rgba(120, 180, 180, 0.08);
	border: 1px solid rgba(120, 180, 180, 0.15);
	border-radius: 8px;
	margin: ${({ $margin }) => $margin || '0'};
`;

const IconWrapper = styled.div`
	flex-shrink: 0;
	width: 16px;
	height: 16px;
	margin-top: 1px;
	color: ${({ $color }) => $color || 'rgba(120, 180, 180, 0.8)'};
	
	svg {
		width: 100%;
		height: 100%;
	}
`;

const InfoText = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.secondary};
	line-height: 1.5;
`;

const WarningContainer = styled(InfoContainer)`
	background: rgba(250, 204, 21, 0.08);
	border-color: rgba(250, 204, 21, 0.2);
`;

const WarningText = styled(InfoText)`
	color: #facc15;
`;

export function InfoTip({ children, margin }) {
	return (
		<InfoContainer $margin={margin}>
			<IconWrapper>
				<InfoSvg />
			</IconWrapper>
			<InfoText>{children}</InfoText>
		</InfoContainer>
	);
}

export function WarningTip({ children, margin }) {
	return (
		<WarningContainer $margin={margin}>
			<IconWrapper $color="#facc15">
				<WarningSvg />
			</IconWrapper>
			<WarningText>{children}</WarningText>
		</WarningContainer>
	);
}
