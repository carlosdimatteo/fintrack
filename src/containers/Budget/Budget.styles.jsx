import styled from 'styled-components';

/**
 * Budget-specific styles
 * Common layout components imported from components/Layout
 */

/* Overview Card Styles */
export const OverviewContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const RemainingRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
`;

export const RemainingLabel = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.muted};
`;

export const RemainingValue = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes['2xl']};
	font-weight: ${({ theme }) => theme.typography.weights.bold};
	color: ${({ theme }) => theme.colors.accent.primary};
`;

export const SpentTotalRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const SpentTotal = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	color: ${({ theme }) => theme.colors.text.muted};
`;

export const SpentValue = styled.span`
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ $status }) => {
		if ($status === 'over') return '#f87171';
		if ($status === 'warning') return '#fbbf24';
		return '#E6ECEC';
	}};
`;

/* Category Grid */
export const CategoryGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
	width: 100%;
	box-sizing: border-box;
`;

export const CategoryCard = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
	padding: 10px 12px;
	min-width: 0;
	box-sizing: border-box;
	border: 1px solid transparent;
	background: 
		linear-gradient(${({ theme }) => theme.colors.card.interior}, ${({ theme }) => theme.colors.card.interior}) padding-box,
		${({ theme }) => theme.colors.card.borderGradient} border-box;
	border-radius: 12px;
`;

export const CategoryName = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	font-weight: ${({ theme }) => theme.typography.weights.medium};
	color: ${({ theme }) => theme.colors.text.primary};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	min-width: 0;
`;

export const CategoryAmounts = styled.div`
	display: flex;
	align-items: baseline;
	gap: 4px;
	flex-wrap: wrap;
	min-width: 0;
`;

export const CategorySpent = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.base};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
	color: ${({ $status }) => {
		if ($status === 'over') return '#f87171';
		if ($status === 'warning') return '#fbbf24';
		return '#E6ECEC';
	}};
`;

export const CategoryTotal = styled.span`
	font-size: ${({ theme }) => theme.typography.sizes.sm};
	color: ${({ theme }) => theme.colors.text.muted};
`;
