import {
	ProgressContainer,
	ProgressTrack,
	ProgressFill,
	ProgressLabel,
	ProgressValue,
} from './ProgressBar.styles';

export function ProgressBar({
	value,
	max = 100,
	label,
	showValue = true,
	size = 'default',
}) {
	const percentage = Math.min((value / max) * 100, 100);

	return (
		<ProgressContainer>
			{(label || showValue) && (
				<ProgressLabel>
					<span>{label}</span>
					{showValue && (
						<ProgressValue>
							{value} / {max}
						</ProgressValue>
					)}
				</ProgressLabel>
			)}
			<ProgressTrack $size={size}>
				<ProgressFill $percentage={percentage} $size={size} />
			</ProgressTrack>
		</ProgressContainer>
	);
}
