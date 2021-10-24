import { myAPIKey } from '../firebase';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import getRandomVideosFromFirestore from './utils/getRandomVideosFromFirestore';
import getYTTrendingVideos from './utils/getYTTrendingVideos';
import getYTVideoStatistics from './utils/getYTVideoStatistics';
import getYTChannelData from './utils/getYTChannelData';
import VideoDataWrapper from './reusables/VideoDataWrapper';

const Main = ({ isHidden, toggleVisibility, loadVideo }) => {
	const [showLoadBox, setShowLoadBox] = useState(true);
	const [mainGridContents, setGridContents] = useState();
	const [trendingGridContents, setTrendingGridContents] = useState();
	const [visibleArrow, setVisibleArrow] = useState(false);
	const [expandedTrending, setExpandedTrending] = useState(false);

	const handleLoad = async () => {
		const trendingVideos = await getYTTrendingVideos(12, myAPIKey);
		setTrendingGridContents(await createGridContents(trendingVideos));
		setShowLoadBox(false);
		setVisibleArrow(true);
	};

	const expandContents = () => {
		setExpandedTrending(true);
		setVisibleArrow(false);
	};

	useEffect(() => {
		(async () => {
			const randomVideos = await getRandomVideosFromFirestore(24);
			setGridContents(await createGridContents(randomVideos));
		})();
	}, []);

	const createGridContents = async (data) => {
		try {
			const contents = await Promise.all(
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
			return contents;
		} catch (error) {
			console.log(`Promise all for grid contents error: ${error}`);
		}
	};

	return (
		<div id='contents-container'>
			<div
				className={`cover-fade ${isHidden ? 'is-hidden' : ''}`}
				onClick={toggleVisibility}
			/>
			<div id='category-filter'>
				<ul>
					<NavLink activeClassName='active' exact to='/'>
						<li>All</li>
					</NavLink>
					<li>Playlists</li>
					<li>Music</li>
					<li>Jazz</li>
					<li>Live</li>
					<li>Computers</li>
					<li>Javascript</li>
					<li>Piano</li>
					<li>HTML5</li>
					<li>Unboxing</li>
					<li>Apple</li>
					<li>CSS</li>
					<li>Editing</li>
					<li>Sales</li>
					<li>Recently uploaded</li>
					<li>Watched</li>
					<li>New to you</li>
				</ul>
			</div>
			<div id='main-contents'>
				{mainGridContents}
				<div
					id='trending-contents'
					// 'fit-content' doesn't work here (?)
					style={{ maxHeight: expandedTrending ? '' : '380px' }}
				>
					<h2 className='trending-tag'>Trending</h2>
					<div
						className='load-trending-videos'
						style={{ display: showLoadBox ? 'flex' : 'none' }}
					>
						<h3>
							Press the button to load trending videos. This
							action uses a lot of API tokens and after few uses
							will reach the daily quota which will result in no
							videos being loaded anymore.
						</h3>
						<button
							id='load-trending-videos-btn'
							onClick={handleLoad}
						>
							Load Videos
						</button>
					</div>
					{trendingGridContents}
					<div
						className='expand-trending-btn'
						style={{
							visibility: visibleArrow ? 'visible' : 'hidden',
						}}
					>
						<svg focusable='false' onClick={expandContents}>
							<path d='M12,15.7L5.6,9.4l0.7-0.7l5.6,5.6l5.6-5.6l0.7,0.7L12,15.7z'></path>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
