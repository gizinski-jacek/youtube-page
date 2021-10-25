import { myAPIKey } from '../../firebase';
import getYTVideoStatistics from '../utils/getYTVideoStatistics';
import getYTChannelData from '../utils/getYTChannelData';
import VideoDataWrapper from './VideoDataWrapper';

const GridContentsWrapper = async (data, loadVideo) => {
	try {
		return await Promise.all(
			data.map(async (video, index) => {
				const videoStats = getYTVideoStatistics(
					video.videoData.id.videoId,
					myAPIKey
				);
				const channelData = getYTChannelData(
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
							<VideoDataWrapper
								key={index}
								video={video}
								loadVideo={loadVideo}
								stats={stats}
								channel={channel}
							/>
						);
					}
				} catch (error) {
					console.log(
						`Promise all for video statistics and channel data error: ${error}`
					);
				}
			})
		);
	} catch (error) {
		console.log(`Promise all for grid contents error: ${error}`);
	}
};

export default GridContentsWrapper;
