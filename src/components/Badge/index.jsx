import { BadgeContainer } from './Badge.styles';

export function Badge({ children, variant = 'default', size = 'default' }) {
	return (
		<BadgeContainer $variant={variant} $size={size}>
			{children}
		</BadgeContainer>
	);
}
