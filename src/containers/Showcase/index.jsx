import { useState } from 'react';
import styled from 'styled-components';
import { Card, CardTitle, CardSubtitle } from '../../components/Card';
import { Tabs } from '../../components/Tabs';
import { ListItem, ListDivider } from '../../components/ListItem';
import { StatCard } from '../../components/StatCard';
import { Badge } from '../../components/Badge';
import { ProgressBar } from '../../components/ProgressBar';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

const ShowcaseContainer = styled.div`
	min-height: 100vh;
	background: ${({ theme }) => theme.colors.background};
	padding: ${({ theme }) => theme.spacing.lg};
	padding-bottom: 6rem;
`;

const Section = styled.section`
	margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
	font-size: ${({ theme }) => theme.typography.sizes['2xl']};
	color: ${({ theme }) => theme.colors.text.primary};
	margin-bottom: ${({ theme }) => theme.spacing.lg};
	font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const SectionSubtitle = styled.h3`
	font-size: ${({ theme }) => theme.typography.sizes.lg};
	color: ${({ theme }) => theme.colors.text.secondary};
	margin-bottom: ${({ theme }) => theme.spacing.md};
	margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	gap: ${({ theme }) => theme.spacing.md};
`;

const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: ${({ theme }) => theme.spacing.md};
	align-items: center;
`;

const ColorSwatch = styled.div`
	width: 60px;
	height: 60px;
	border-radius: ${({ theme }) => theme.borderRadius.md};
	background: ${({ $color }) => $color};
`;

const ColorLabel = styled.div`
	font-size: ${({ theme }) => theme.typography.sizes.xs};
	color: ${({ theme }) => theme.colors.text.muted};
	margin-top: 4px;
	text-align: center;
`;

const ColorItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

// Icons matching reference style
const ShoppingIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
		<path d="M20 7h-4V5a4 4 0 00-8 0v2H4a1 1 0 00-1 1v11a3 3 0 003 3h12a3 3 0 003-3V8a1 1 0 00-1-1zM10 5a2 2 0 014 0v2h-4V5z" />
	</svg>
);

const GymIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
		<path d="M6.5 6.5h-2a1 1 0 00-1 1v9a1 1 0 001 1h2m11-11h2a1 1 0 011 1v9a1 1 0 01-1 1h-2M6.5 12h11M6.5 6.5v11m11-11v11" />
	</svg>
);

const CarIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
		<path d="M5 11l1.5-4.5a2 2 0 011.9-1.5h7.2a2 2 0 011.9 1.5L19 11M5 11v6a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-6M5 11h14" />
		<circle cx="7.5" cy="14" r="1" />
		<circle cx="16.5" cy="14" r="1" />
	</svg>
);

const LaundryIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
		<rect x="4" y="2" width="16" height="20" rx="2" />
		<circle cx="12" cy="13" r="5" />
		<path d="M8 6h2M14 6h2" />
	</svg>
);

const GroceryIcon = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
		<path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 7h14.6M10 21a1 1 0 100-2 1 1 0 000 2zM18 21a1 1 0 100-2 1 1 0 000 2z" />
	</svg>
);

export function Showcase() {
	const [activeTab, setActiveTab] = useState('income');
	const [periodTab, setPeriodTab] = useState('month');

	return (
		<ShowcaseContainer>
			{/* Colors */}
			<Section>
				<SectionTitle>Color Palette</SectionTitle>

				<SectionSubtitle>Brand Colors</SectionSubtitle>
				<Row>
					<ColorItem>
						<ColorSwatch $color="#7a9e9f" />
						<ColorLabel>Accent</ColorLabel>
					</ColorItem>
					<ColorItem>
						<ColorSwatch $color="#5a8384" />
						<ColorLabel>Secondary</ColorLabel>
					</ColorItem>
					<ColorItem>
						<ColorSwatch $color="rgba(122, 158, 159, 0.12)" />
						<ColorLabel>Muted</ColorLabel>
					</ColorItem>
				</Row>

				<SectionSubtitle>Status Colors</SectionSubtitle>
				<Row>
					<ColorItem>
						<ColorSwatch $color="#4ade80" />
						<ColorLabel>Success</ColorLabel>
					</ColorItem>
					<ColorItem>
						<ColorSwatch $color="#f87171" />
						<ColorLabel>Danger</ColorLabel>
					</ColorItem>
					<ColorItem>
						<ColorSwatch $color="#fbbf24" />
						<ColorLabel>Warning</ColorLabel>
					</ColorItem>
				</Row>

				<SectionSubtitle>Backgrounds</SectionSubtitle>
				<Row>
					<ColorItem>
						<ColorSwatch $color="#0a0a0a" />
						<ColorLabel>BG</ColorLabel>
					</ColorItem>
					<ColorItem>
						<ColorSwatch $color="linear-gradient(180deg, rgba(32, 36, 38, 0.95) 0%, rgba(20, 24, 26, 0.98) 100%)" />
						<ColorLabel>Card</ColorLabel>
					</ColorItem>
				</Row>
			</Section>

			{/* Glass Cards */}
			<Section>
				<SectionTitle>Glass Cards</SectionTitle>

				<SectionSubtitle>Card with Gradient Border (default)</SectionSubtitle>
				<Card>
					<CardTitle>Monthly Savings</CardTitle>
					<CardSubtitle>January 2026</CardSubtitle>
					<div style={{ marginTop: '1rem', position: 'relative' }}>
						<StatCard label="Saved This Month" value="$25,999.00" size="large" />
					</div>
				</Card>

				<SectionSubtitle>Simple Card (no border wrapper)</SectionSubtitle>
				<Card simple>
					<CardTitle>Investment Portfolio</CardTitle>
					<CardSubtitle>Total value across all accounts</CardSubtitle>
					<div style={{ marginTop: '1rem', position: 'relative' }}>
						<StatCard
							label="Total Value"
							value="$142,350.00"
							trend="up"
							trendValue="+12.5%"
							size="large"
						/>
					</div>
				</Card>

				<SectionSubtitle>Clickable Card</SectionSubtitle>
				<Card onClick={() => alert('Card clicked!')}>
					<CardTitle>Click Me</CardTitle>
					<CardSubtitle>This card has hover and click effects</CardSubtitle>
				</Card>
			</Section>

			{/* Tabs */}
			<Section>
				<SectionTitle>Tabs</SectionTitle>

				<SectionSubtitle>Two Options (Income/Outcome style)</SectionSubtitle>
				<Tabs
					tabs={[
						{ label: 'Income', value: 'income' },
						{ label: 'Outcome', value: 'outcome' },
					]}
					activeTab={activeTab}
					onChange={setActiveTab}
				/>

				<SectionSubtitle>Multiple Options (Period selector)</SectionSubtitle>
				<Tabs
					tabs={[
						{ label: 'Day', value: 'day' },
						{ label: 'Week', value: 'week' },
						{ label: 'Month', value: 'month' },
						{ label: 'Year', value: 'year' },
					]}
					activeTab={periodTab}
					onChange={setPeriodTab}
				/>

				<SectionSubtitle>Inside a Card</SectionSubtitle>
				<Card>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
						<span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Saved This Month</span>
						<Tabs
							tabs={[
								{ label: 'Income', value: 'income' },
								{ label: 'Outcome', value: 'outcome' },
							]}
							activeTab={activeTab}
							onChange={setActiveTab}
						/>
					</div>
					<StatCard label="" value="$25,999.00" size="large" />
					<div style={{ marginTop: '1rem' }}>
						<Tabs
							tabs={[
								{ label: 'Day', value: 'day' },
								{ label: 'Week', value: 'week' },
								{ label: 'Month', value: 'month' },
								{ label: 'Year', value: 'year' },
							]}
							activeTab={periodTab}
							onChange={setPeriodTab}
						/>
					</div>
				</Card>
			</Section>

			{/* List Items */}
			<Section>
				<SectionTitle>List Items</SectionTitle>

				<SectionSubtitle>Expense List Style (like reference)</SectionSubtitle>
				<Card padding="8px 0">
					<ListItem
						icon={<ShoppingIcon />}
						title="Shopping"
						subtitle="$450 this week"
						value="$300.00"
						onClick={() => {}}
					/>
					<ListItem
						icon={<GroceryIcon />}
						title="Grocery"
						subtitle="Just Now"
						value="$125"
						onClick={() => {}}
					/>
					<ListItem
						icon={<GymIcon />}
						title="Gym"
						subtitle="Renewed, 2024-03-09"
						value="$185"
						onClick={() => {}}
					/>
					<ListItem
						icon={<LaundryIcon />}
						title="Laundry"
						subtitle="Durable, 2024-04-18"
						value="$45"
						onClick={() => {}}
					/>
					<ListItem
						icon={<CarIcon />}
						title="Car repair"
						subtitle="Durable, 2024-04-15"
						value="$125"
						onClick={() => {}}
					/>
				</Card>

				<SectionSubtitle>With Value Colors</SectionSubtitle>
				<Card padding="8px 0">
					<ListItem
						icon={<ShoppingIcon />}
						title="Investment Return"
						subtitle="Fidelity"
						value="+$1,250.00"
						valueColor="success"
						onClick={() => {}}
					/>
					<ListItem
						icon={<CarIcon />}
						title="Trading Loss"
						subtitle="Binance"
						value="-$320.00"
						valueColor="danger"
						onClick={() => {}}
					/>
				</Card>

				<SectionSubtitle>With Subtle Dividers</SectionSubtitle>
				<Card padding="8px 0">
					<ListItem icon={<GymIcon />} title="Regular Item" subtitle="Not selected" value="$100" onClick={() => {}} />
					<ListDivider />
					<ListItem icon={<ShoppingIcon />} title="Selected Item" subtitle="Currently active" value="$200" selected onClick={() => {}} />
					<ListDivider />
					<ListItem icon={<GroceryIcon />} title="Regular Item" subtitle="Not selected" value="$150" onClick={() => {}} />
				</Card>
			</Section>

			{/* Stat Cards */}
			<Section>
				<SectionTitle>Stat Cards</SectionTitle>

				<Grid>
					<Card>
						<StatCard label="Total Spent" value="$1,520.00" />
					</Card>
					<Card>
						<StatCard label="Car repair" value="$125.00" />
					</Card>
				</Grid>

				<SectionSubtitle>With Trends</SectionSubtitle>
				<Grid>
					<Card>
						<StatCard label="This Month" value="$8,500" trend="up" trendValue="+12%" />
					</Card>
					<Card>
						<StatCard label="Expenses" value="$3,200" trend="down" trendValue="-5%" />
					</Card>
				</Grid>

				<SectionSubtitle>Large Size</SectionSubtitle>
				<Card>
					<StatCard
						label="Saved This Month"
						value="$25,999.00"
						trend="up"
						trendValue="+8.3% from last month"
						size="large"
					/>
				</Card>
			</Section>

			{/* Badges */}
			<Section>
				<SectionTitle>Badges</SectionTitle>

				<Row>
					<Badge>Default</Badge>
					<Badge variant="accent">Accent</Badge>
					<Badge variant="success">Success</Badge>
					<Badge variant="danger">Danger</Badge>
					<Badge variant="warning">Warning</Badge>
				</Row>

				<SectionSubtitle>Small Badges</SectionSubtitle>
				<Row>
					<Badge size="small">Default</Badge>
					<Badge size="small" variant="accent">
						Accent
					</Badge>
					<Badge size="small" variant="success">
						+12%
					</Badge>
					<Badge size="small" variant="danger">
						-5%
					</Badge>
				</Row>
			</Section>

			{/* Progress Bars */}
			<Section>
				<SectionTitle>Progress Bars</SectionTitle>

				<Card>
					<ProgressBar value={75} max={100} label="Savings Goal" />
				</Card>

				<div style={{ marginTop: '1rem' }}>
					<Card>
						<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
							<ProgressBar value={8500} max={15000} label="Savings Goal" />
							<ProgressBar value={3200} max={8000} label="Investment Goal" />
							<ProgressBar value={4500} max={5000} label="Budget Used" />
							<ProgressBar value={5200} max={5000} label="Over Budget" />
						</div>
					</Card>
				</div>

				<SectionSubtitle>Small Progress Bars</SectionSubtitle>
				<Card>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						<ProgressBar value={60} max={100} label="Food" size="small" />
						<ProgressBar value={85} max={100} label="Transport" size="small" />
						<ProgressBar value={100} max={100} label="Entertainment" size="small" />
					</div>
				</Card>
			</Section>

			{/* Buttons */}
			<Section>
				<SectionTitle>Buttons (Current)</SectionTitle>
				<Row>
					<Button>SUBMIT</Button>
					<Button disabled>DISABLED</Button>
				</Row>
			</Section>

			{/* Inputs */}
			<Section>
				<SectionTitle>Inputs (Current)</SectionTitle>
				<Card>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
						<Input type="text" value="" onChange={() => {}} placeholder="Enter amount..." />
						<Input type="number" value="1500" onChange={() => {}} />
					</div>
				</Card>
			</Section>

			{/* Full Example Card */}
			<Section>
				<SectionTitle>Example: Dashboard Card</SectionTitle>

				<Card>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<CardTitle>Current Balance</CardTitle>
						<Tabs
							tabs={[
								{ label: 'Day', value: 'day' },
								{ label: 'Week', value: 'week' },
								{ label: 'Month', value: 'month' },
							]}
							activeTab="month"
							onChange={() => {}}
						/>
					</div>
					<div style={{ marginTop: '1.5rem' }}>
						<StatCard label="Current Balance" value="$1,520.00" size="large" />
					</div>
					<div
						style={{
							marginTop: '2rem',
							height: '120px',
							background: 'rgba(255,255,255,0.03)',
							borderRadius: '12px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: 'rgba(255,255,255,0.3)',
						}}
					>
						[Chart Placeholder]
					</div>
				</Card>
			</Section>

			{/* Example: Full Reference Layout */}
			<Section>
				<SectionTitle>Example: Reference Layout</SectionTitle>

				{/* Top stat */}
				<Card>
					<div style={{ marginBottom: '0.5rem', color: 'rgba(230,236,236,0.5)', fontSize: '14px' }}>Total Spent</div>
					<div style={{ fontSize: '2rem', fontWeight: 700, position: 'relative' }}>$1,520.00</div>
				</Card>

				{/* Category cards row - using simple cards for nested effect */}
				<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
					<Card simple padding="16px">
						<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
							<ShoppingIcon />
							<div>
								<div style={{ fontWeight: 600 }}>Shopping</div>
								<div style={{ fontSize: '12px', color: 'rgba(230,236,236,0.4)' }}>$450 this week</div>
							</div>
						</div>
					</Card>
					<Card simple padding="16px">
						<div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'space-between' }}>
							<CarIcon />
							<div style={{ textAlign: 'right' }}>
								<div style={{ fontSize: '12px', color: 'rgba(230,236,236,0.4)' }}>Car repair</div>
								<div style={{ fontWeight: 600 }}>$125.00</div>
							</div>
						</div>
					</Card>
				</div>

				{/* Expense list */}
				<div style={{ marginTop: '16px' }}>
					<Card padding="8px 0">
						<ListItem icon={<GymIcon />} title="Gym" subtitle="Renewed, 2024-03-09" value="$185" onClick={() => {}} />
						<ListItem icon={<LaundryIcon />} title="Laundry" subtitle="Durable, 2024-04-18" value="$45" onClick={() => {}} />
						<ListItem icon={<CarIcon />} title="Car repair" subtitle="Durable, 2024-04-15" value="$125" onClick={() => {}} />
					</Card>
				</div>
			</Section>

			{/* Savings Card Example - matching reference exactly */}
			<Section>
				<SectionTitle>Example: Savings Dashboard</SectionTitle>
				<Card>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
						<div>
							<div style={{ fontSize: '14px', color: 'rgba(230,236,236,0.5)', marginBottom: '8px' }}>Saved This Month</div>
							<div style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.02em', position: 'relative' }}>$25,999.00</div>
						</div>
						<Tabs
							tabs={[
								{ label: 'Income', value: 'income' },
								{ label: 'Outcome', value: 'outcome' },
							]}
							activeTab={activeTab}
							onChange={setActiveTab}
						/>
					</div>
					<div style={{ marginTop: '1.5rem' }}>
						<Tabs
							tabs={[
								{ label: 'Day', value: 'day' },
								{ label: 'Week', value: 'week' },
								{ label: 'Month', value: 'month' },
								{ label: 'Year', value: 'year' },
							]}
							activeTab={periodTab}
							onChange={setPeriodTab}
						/>
					</div>
					{/* Chart placeholder */}
					<div
						style={{
							marginTop: '1.5rem',
							height: '120px',
							position: 'relative',
							display: 'flex',
							alignItems: 'flex-end',
							justifyContent: 'center',
							padding: '16px 0',
						}}
					>
						<svg viewBox="0 0 200 60" style={{ width: '100%', height: '100%' }}>
							<path
								d="M0 50 Q30 45, 50 40 T100 35 T150 25 T200 20"
								fill="none"
								stroke="rgba(230,236,236,0.3)"
								strokeWidth="1.5"
							/>
							<circle cx="180" cy="22" r="5" fill="none" stroke="rgba(230,236,236,0.8)" strokeWidth="2" />
							<circle cx="180" cy="22" r="2" fill="rgba(230,236,236,0.8)" />
						</svg>
					</div>
				</Card>
			</Section>

			{/* Manage Cards Button Example */}
			<Section>
				<SectionTitle>Example: Button Card</SectionTitle>
				<Card>
					<div style={{ 
						display: 'flex', 
						alignItems: 'center', 
						justifyContent: 'center',
						padding: '8px 0',
						position: 'relative'
					}}>
						<span style={{ color: 'rgba(230,236,236,0.9)', fontWeight: 500 }}>Manage Cards</span>
					</div>
				</Card>
			</Section>
		</ShowcaseContainer>
	);
}
