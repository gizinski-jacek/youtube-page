import { myAPIKey } from '../firebase';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import getRandomVideosFromFirestore from './utils/getRandomVideosFromFirestore';
import getYTTrendingVideos from './utils/getYTTrendingVideos';
import getYTVideoStatistics from './utils/getYTVideoStatistics';
import getYTChannelData from './utils/getYTChannelData';
import ContentCardWrapper from './utils/ContentCardWrapper';

const Content = ({ loadVideo }) => {
	const [showLoadBox, setShowLoadBox] = useState(true);
	const [mainContentDisplay, setMainContentDisplay] = useState();
	const [trendingContentDisplay, setTrendingContentDisplay] = useState();

	const handleLoad = async () => {
		const trendingVideos = await getYTTrendingVideos(12, myAPIKey);
		createTrendingDisplayContent(trendingVideos);
		setShowLoadBox(false);
	};

	useEffect(() => {
		(async () => {
			const randomVideos = await getRandomVideosFromFirestore(24);
			createMainDisplayContent(randomVideos);
		})();
	}, []);

	const createMainDisplayContent = async (data) => {
		try {
			const content = await Promise.all(
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
								<ContentCardWrapper
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
							`Promise all for main video statistics and channel data error: ${error}`
						);
					}
				})
			);
			setMainContentDisplay(content);
		} catch (error) {
			console.log(`Promise all for main content error: ${error}`);
		}
	};

	const createTrendingDisplayContent = async (data) => {
		try {
			const content = await Promise.all(
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
								<ContentCardWrapper
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
							`Promise all for trending video statistics and channel data error: ${error}`
						);
					}
				})
			);
			setTrendingContentDisplay(content);
		} catch (error) {
			console.log(`Promise all for trending content error: ${error}`);
		}
	};

	return (
		<div id='content-container'>
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
			<div className='content-display'>
				{mainContentDisplay}
				<div className='trending-content-display'>
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
					{trendingContentDisplay}
				</div>
			</div>
		</div>
	);
};

export default Content;
