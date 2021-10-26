import VideoDataWrapper from './VideoDataWrapper';

const GridContentsWrapper = ({ data, loadVideo }) => {
	const contents = data.map((item, index) => {
		if (item.video && item.statsData && item.channelData) {
			return (
				<VideoDataWrapper
					key={index}
					video={item.video}
					stats={item.statsData}
					channel={item.channelData}
					loadVideo={loadVideo}
				/>
			);
		}
		return null;
	});

	return contents;
};

export default GridContentsWrapper;
