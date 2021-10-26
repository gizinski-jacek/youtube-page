import RelatedDataWrapper from './RelatedDataWrapper';

const RelatedContentsWrapper = ({ data, loadVideo }) => {
	const contents = data.map((item, index) => {
		if (item.video && item.statsData && item.channelData) {
			return (
				<RelatedDataWrapper
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

export default RelatedContentsWrapper;
