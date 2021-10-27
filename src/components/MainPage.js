import { myAPIKey } from '../firebase';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import getRandomVideosFromFS from './utils/getRandomVideosFromFS';
import getVideoStatistics from './utils/getVideoStatistics';
import getChannelData from './utils/getChannelData';
import getTrendingVideos from './utils/getTrendingVideos';
import GridContentsWrapper from './reusables/GridContentsWrapper';

const MainPage = ({
	setMenuIsThin,
	setMenuIsHidden,
	menuIsHidden,
	menuSetByUser,
	toggleVisibility,
	loadVideo,
}) => {
	const [mainData, setMainData] = useState();
	const [trendingData, setTrendingData] = useState();
	const [expandedTrending, setExpandedTrending] = useState(false);
	const [visibleArrow, setVisibleArrow] = useState(true);

	const expandContents = () => {
		setExpandedTrending(true);
		setVisibleArrow(false);
	};

	useEffect(() => {
		(async () => {
			try {
				const [mainDatabase, trendingDatabase] = await Promise.all([
					getRandomVideosFromFS(24),
					getTrendingVideos(12, myAPIKey),
				]);

				const mainArray = await Promise.all(
					mainDatabase.map(async (video) => {
						const [statsData, channelData] = await Promise.all([
							getVideoStatistics(video.id.videoId, myAPIKey),
							getChannelData(video.snippet.channelId, myAPIKey),
						]);
						return { video, statsData, channelData };
					})
				);

				const trendingArray = await Promise.all(
					trendingDatabase.map(async (video) => {
						const [statsData, channelData] = await Promise.all([
							getVideoStatistics(video.id.videoId, myAPIKey),
							getChannelData(video.snippet.channelId, myAPIKey),
						]);
						return { video, statsData, channelData };
					})
				);

				const [main, trending] = await Promise.all([
					mainArray,
					trendingArray,
				]);

				setMainData(main);
				setTrendingData(trending);
			} catch (error) {
				console.log(`Main page content data fetch error: ${error}`);
			}
		})();
	}, []);

	useEffect(() => {
		const container = document.getElementById('main-contents');
		if (container.offsetWidth <= 1156) {
			document.documentElement.style.setProperty('--menu-width', '72px');
			setMenuIsThin(true);
		}
	}, [setMenuIsThin]);

	useEffect(() => {
		const container = document.getElementById('main-contents');
		const watchForResize = () => {
			if (container.offsetWidth <= 1156) {
				document.documentElement.style.setProperty(
					'--menu-width',
					'72px'
				);
				setMenuIsThin(true);
			}
			if (container.offsetWidth >= 1325 && !menuSetByUser) {
				document.documentElement.style.setProperty(
					'--menu-width',
					'240px'
				);
				setMenuIsHidden(true);
				setMenuIsThin(false);
			}
		};

		window.addEventListener('resize', watchForResize);

		return () => window.removeEventListener('resize', watchForResize);
	}, [menuSetByUser, setMenuIsThin, setMenuIsHidden]);

	return (
		<div id='contents-container'>
			<div
				className={`cover-fade ${menuIsHidden ? 'is-hidden' : ''}`}
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
