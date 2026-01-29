import {
	ListItemContainer,
	ListItemContent,
	ListItemTitle,
	ListItemSubtitle,
	ListItemValue,
	ListItemIcon,
	ListDivider,
} from './ListItem.styles';

export { ListDivider };

export function ListItem({
	icon,
	title,
	subtitle,
	value,
	valueColor,
	onClick,
	selected,
	children,
}) {
	return (
		<ListItemContainer $clickable={!!onClick} $selected={selected} onClick={onClick}>
			{icon && <ListItemIcon>{icon}</ListItemIcon>}
			<ListItemContent>
				<ListItemTitle>{title}</ListItemTitle>
				{subtitle && <ListItemSubtitle>{subtitle}</ListItemSubtitle>}
				{children}
			</ListItemContent>
			{value && <ListItemValue $color={valueColor}>{value}</ListItemValue>}
		</ListItemContainer>
	);
}
