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
		setShowLoadBox(false);
		const relatedData = await getYTTrendingVideos(12, myAPIKey);
		createTrendingDisplayContent(relatedData);
	};

	useEffect(() => {
		getRandomVideosFromFirestore(24).then((randomData) => {
			createMainDisplayContent(randomData);
		});
	}, []);

	const createMainDisplayContent = (data) => {
		Promise.all(
			data.map((video, index) => {
				const videoStats = getYTVideoStatistics(
					video.videoData.id.videoId,
					myAPIKey
				);
				const channelData = getYTChannelData(
					video.videoData.snippet.channelId,
					myAPIKey
				);
				return Promise.all([videoStats, channelData])
					.then(([stats, channel]) => {
						return (
							<ContentCardWrapper
								key={index}
								video={video}
								loadVideo={loadVideo}
								stats={stats}
								channel={channel}
							/>
						);
					})
					.catch((error) => {
						console.log(
							`Promise all for main video statistics and channel data error: ${error}`
						);
					});
			})
		)
			.then((content) => setMainContentDisplay(content))
			.catch((error) => {
				console.log(`Promise all for main content error: ${error}`);
			});
	};

	const createTrendingDisplayContent = (data) => {
		Promise.all(
			data.map((video, index) => {
				const videoStats = getYTVideoStatistics(
					video.videoData.id.videoId,
					myAPIKey
				);
				const channelData = getYTChannelData(
					video.videoData.snippet.channelId,
					myAPIKey
				);
				return Promise.all([videoStats, channelData])
					.then(([stats, channel]) => {
						return (
							<ContentCardWrapper
								key={index}
								video={video}
								loadVideo={loadVideo}
								stats={stats}
								channel={channel}
							/>
						);
					})
					.catch((error) => {
						console.log(
							`Promise all for trending video statistics and channel data error: ${error}`
						);
					});
			})
		)
			.then((content) => setTrendingContentDisplay(content))
			.catch((error) => {
				console.log(`Promise all for trending content error: ${error}`);
			});
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
						className='relative-trending-container'
						style={{ display: showLoadBox ? 'block' : 'none' }}
					>
						<div className='load-trending-videos'>
							<h3>
								Press the button to load trending videos. This
								action uses a lot of API tokens and after few
								uses will reach the daily quota which will
								result in no videos being loaded anymore.
							</h3>
							<button
								id='load-trending-videos-btn'
								onClick={handleLoad}
							>
								Load Videos
							</button>
						</div>
					</div>
					{trendingContentDisplay}
				</div>
			</div>
		</div>
	);
};

export default Content;
