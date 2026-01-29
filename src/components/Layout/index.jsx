import styled from 'styled-components';
import { PrivacyToggle } from '../PrivacyToggle';

/**
 * Shared layout components to avoid duplication across containers
 */

export const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 100%;
	padding: ${({ theme }) => theme.spacing.md};
	padding-bottom: 80px;
	box-sizing: border-box;
	gap: ${({ theme }) => theme.spacing.lg};
	overflow-x: hidden;
`;

export const PageHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const TitleRow = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
`;

const PageTitleStyled = styled.h1`
	font-size: ${({ theme }) => theme.typography.sizes['2xl']};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ theme }) => theme.colors.text.primary};
	margin: 0;
`;

export function PageTitle({ children, showPrivacyToggle = true }) {
	return (
		<TitleRow>
			<PageTitleStyled>{children}</PageTitleStyled>
			{showPrivacyToggle && <PrivacyToggle />}
		</TitleRow>
	);
}

export const SectionTitle = styled.h2`
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.secondary};
	margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
`;

export const FormField = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 100%;
`;

export const FieldLabel = styled.label`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.secondary};
`;

export const InputRow = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	width: 100%;
`;

export const FormStack = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${({ theme }) => theme.spacing.md};
`;

export const LoadingText = styled.div`
	text-align: center;
	color: ${({ theme }) => theme.colors.text.muted};
	padding: ${({ theme }) => theme.spacing.xl};
`;
