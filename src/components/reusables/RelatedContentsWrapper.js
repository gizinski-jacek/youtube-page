import { myAPIKey } from '../../firebase';
import getVideoStatistics from '../utils/getVideoStatistics';
import getChannelData from '../utils/getChannelData';
import RelatedDataWrapper from './RelatedDataWrapper';

const RelatedContentsWrapper = async (data, loadVideo) => {
	try {
		return await Promise.all(
			data.map(async (video, index) => {
				const videoStats = getVideoStatistics(
					video.videoData.id.videoId,
					myAPIKey
				);
				const channelData = getChannelData(
					video.videoData.snippet.channelId,
					myAPIKey
				);
				try {
					const [stats, channel] = await Promise.all([
						videoStats,
						channelData,
					]);
					if (stats && channel) {
						return (
							<RelatedDataWrapper
								key={index}
								video={video}
								stats={stats}
								channel={channel}
								loadVideo={loadVideo}
							/>
						);
					}
				} catch (error) {
					console.log(
						`Promise all for related video statistics and channel data error: ${error}`
					);
				}
			})
		);
	} catch (error) {
		console.log(`Promise all for related content error: ${error}`);
	}
};

export default RelatedContentsWrapper;
