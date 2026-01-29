import {
	GlassCard,
	GlassCardSimple,
	CardHeader,
	CardTitle,
	CardSubtitle,
	CardContent,
} from './Card.styles';

export { GlassCard, GlassCardSimple, CardHeader, CardTitle, CardSubtitle, CardContent };

/**
 * Card with gradient border shine effect
 * Use `simple` prop for nested/less prominent cards
 */
export function Card({ children, padding, className, onClick, simple, ...props }) {
	const Component = simple ? GlassCardSimple : GlassCard;
	
	return (
		<Component
			$padding={padding}
			$clickable={!!onClick}
			className={className}
			onClick={onClick}
			{...props}
		>
			{children}
		</Component>
	);
}
