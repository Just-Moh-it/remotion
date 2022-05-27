import {
	createSmoothSvgPath,
	useAudioData,
	visualizeAudioWaveform,
} from '@remotion/media-utils';
import React from 'react';
import {AbsoluteFill, Audio, useCurrentFrame, useVideoConfig} from 'remotion';
import styled from 'styled-components';
import voice from '../resources/voice-short.mp3';

const FullSize = styled(AbsoluteFill)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Orb = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const VoiceVisualization: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const audioDataVoice = useAudioData(voice);
	const {width, height} = useVideoConfig();

	if (!audioDataVoice) {
		return null;
	}

	const waveform = visualizeAudioWaveform({
		fps,
		frame,
		audioData: audioDataVoice,
		numberOfSamples: 16,
		windowInSeconds: 1 / fps,
	});

	const p = createSmoothSvgPath(
		waveform.map((p, i) => {
			return [
				(i / (waveform.length - 1)) * width * 2 - width / 2,
				p * height + height / 2,
			];
		})
	);

	const filledPath = `${p} L ${width} ${height} L 0 ${height} z`;

	return (
		<div style={{flex: 1}}>
			<Audio src={voice} />
			<FullSize>
				<Orb>
					<svg
						style={{backgroundColor: 'white'}}
						viewBox={`0 0 ${width} ${height}`}
						width={width}
						height={height}
					>
						<path fill="none" stroke="black" strokeWidth={10} d={filledPath} />
					</svg>
				</Orb>
			</FullSize>
		</div>
	);
};

export default VoiceVisualization;
