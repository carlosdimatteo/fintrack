import { TabsContainer, TabButton } from './Tabs.styles';

export function Tabs({ tabs, activeTab, onChange }) {
	return (
		<TabsContainer>
			{tabs.map((tab) => (
				<TabButton
					key={tab.value}
					$active={activeTab === tab.value}
					onClick={() => onChange(tab.value)}
				>
					{tab.label}
				</TabButton>
			))}
		</TabsContainer>
	);
}
