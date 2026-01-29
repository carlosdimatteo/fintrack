import styled from 'styled-components';

export const ProgressContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing.sm};
`;

export const ProgressLabel = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

export const ProgressValue = styled.span`
	color: ${({ theme }) => theme.colors.text.muted};
`;

export const ProgressTrack = styled.div`
	width: 100%;
	height: ${({ $size }) => ($size === 'small' ? '4px' : '6px')};
	background: rgba(120, 180, 180, 0.1);
	border-radius: ${({ theme }) => theme.borderRadius.full};
	overflow: hidden;
`;

export const ProgressFill = styled.div`
	height: 100%;
	width: ${({ $percentage }) => $percentage}%;
	border-radius: ${({ theme }) => theme.borderRadius.full};
	transition: width 0.5s ease;
	/* Teal gradient for all progress bars */
	background: linear-gradient(90deg, 
		rgba(90, 150, 150, 0.8) 0%, 
		rgba(120, 180, 180, 0.9) 50%,
		rgba(140, 200, 200, 1) 100%
	);
`;
