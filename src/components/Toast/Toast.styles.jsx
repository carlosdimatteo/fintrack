import styled, { keyframes, css } from 'styled-components';

const slideIn = keyframes`
	from {
		transform: translateY(-100%);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
`;

const slideOut = keyframes`
	from {
		transform: translateY(0);
		opacity: 1;
	}
	to {
		transform: translateY(-100%);
		opacity: 0;
	}
`;

export const ToastContainer = styled.div`
	position: fixed;
	top: 16px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 1000;
	display: flex;
	flex-direction: column;
	gap: 8px;
	pointer-events: none;
	max-width: calc(100vw - 32px);
`;

export const ToastItem = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 14px 18px;
	border-radius: 12px;
	pointer-events: auto;
	min-width: 280px;
	max-width: 400px;
	
	/* Glass effect */
	backdrop-filter: blur(16px);
	-webkit-backdrop-filter: blur(16px);
	box-shadow: 
		0 8px 32px rgba(0, 0, 0, 0.4),
		inset 0 1px 0 rgba(255, 255, 255, 0.05);
	
	/* Animation */
	animation: ${({ $exiting }) => $exiting 
		? css`${slideOut} 0.2s ease-out forwards`
		: css`${slideIn} 0.25s ease-out`
	};
	
	/* Variant colors */
	${({ $variant }) => {
		switch ($variant) {
			case 'success':
				return css`
					background: linear-gradient(
						135deg,
						rgba(74, 222, 128, 0.2) 0%,
						rgba(34, 90, 60, 0.3) 100%
					);
					border: 1px solid rgba(74, 222, 128, 0.3);
				`;
			case 'error':
				return css`
					background: linear-gradient(
						135deg,
						rgba(248, 113, 113, 0.2) 0%,
						rgba(100, 40, 40, 0.3) 100%
					);
					border: 1px solid rgba(248, 113, 113, 0.3);
				`;
			case 'warning':
				return css`
					background: linear-gradient(
						135deg,
						rgba(251, 191, 36, 0.2) 0%,
						rgba(100, 80, 20, 0.3) 100%
					);
					border: 1px solid rgba(251, 191, 36, 0.3);
				`;
			default: // info
				return css`
					background: linear-gradient(
						135deg,
						rgba(120, 180, 180, 0.2) 0%,
						rgba(40, 70, 70, 0.3) 100%
					);
					border: 1px solid rgba(120, 180, 180, 0.3);
				`;
		}
	}}
`;

export const ToastIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 24px;
	flex-shrink: 0;
	
	${({ $variant }) => {
		switch ($variant) {
			case 'success':
				return css`color: #4ade80;`;
			case 'error':
				return css`color: #f87171;`;
			case 'warning':
				return css`color: #fbbf24;`;
			default:
				return css`color: #7a9e9f;`;
		}
	}}
`;

export const ToastMessage = styled.div`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.primary};
	flex: 1;
`;
