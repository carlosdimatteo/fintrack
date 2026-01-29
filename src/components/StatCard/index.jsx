import { StatContainer, StatLabel, StatValue, StatTrend } from './StatCard.styles';

export function StatCard({ label, value, trend, trendValue, size = 'default' }) {
	return (
		<StatContainer $size={size}>
			<StatLabel>{label}</StatLabel>
			<StatValue $size={size}>{value}</StatValue>
			{trendValue && (
				<StatTrend $trend={trend}>
					{trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {trendValue}
				</StatTrend>
			)}
		</StatContainer>
	);
}
