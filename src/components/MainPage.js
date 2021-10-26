import { myAPIKey } from '../firebase';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import getRandomVideosFromFS from './utils/getRandomVideosFromFS';
import getVideoStatistics from './utils/getVideoStatistics';
import getChannelData from './utils/getChannelData';
import getTrendingVideos from './utils/getTrendingVideos';
import GridContentsWrapper from './reusables/GridContentsWrapper';

const MainPage = ({ isHidden, toggleVisibility, loadVideo }) => {
	const [mainData, setMainData] = useState();
	const [trendingData, setTrendingData] = useState();
	const [showLoadBox, setShowLoadBox] = useState(true);
	const [expandedTrending, setExpandedTrending] = useState(false);
	const [visibleArrow, setVisibleArrow] = useState(false);

	const handleLoad = async () => {
		const data = await getTrendingVideos(12, myAPIKey);
		const array = await Promise.all(
			data.map(async (video) => {
				const [statsData, channelData] = await Promise.all([
					getVideoStatistics(video.videoData.id.videoId, myAPIKey),
					getChannelData(video.videoData.snippet.channelId, myAPIKey),
				]);
				return { video, statsData, channelData };
			})
		);
		setTrendingData(array);
		setShowLoadBox(false);
		setVisibleArrow(true);
	};

	const expandContents = () => {
		setExpandedTrending(true);
		setVisibleArrow(false);
	};

	useEffect(() => {
		(async () => {
			const data = await getRandomVideosFromFS(24);
			const array = await Promise.all(
				data.map(async (video) => {
					const [statsData, channelData] = await Promise.all([
						getVideoStatistics(
							video.videoData.id.videoId,
							myAPIKey
						),
						getChannelData(
							video.videoData.snippet.channelId,
							myAPIKey
						),
					]);
					return { video, statsData, channelData };
				})
			);
			setMainData(array);
		})();
	}, []);

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
				{mainData ? (
					<GridContentsWrapper
						data={mainData}
						loadVideo={loadVideo}
					/>
				) : null}
				<div
					id='trending-contents'
					// Fit-content doesn't work here (?). Have to use empty value and set fit-content in css.
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
					{trendingData ? (
						<GridContentsWrapper
							data={trendingData}
							loadVideo={loadVideo}
						/>
					) : null}
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

export default MainPage;
