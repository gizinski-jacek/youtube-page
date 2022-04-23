import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import getRandomVideosFromFS from './utils/getRandomVideosFromFS';
import getVideoStatistics from './utils/getVideoStatistics';
import getChannelData from './utils/getChannelData';
import getTrendingVideos from './utils/getTrendingVideos';
import GridContentsWrapper from './reusables/GridContentsWrapper';
import LoadingIcon from './reusables/LoadingIcon';

const MainPage = ({
	setMenuIsThin,
	setMenuIsHidden,
	menuIsHidden,
	menuSetByUser,
	toggleVisibility,
	loadVideo,
	searchResults,
}) => {
	const [mainData, setMainData] = useState();
	const [trendingData, setTrendingData] = useState();
	const [searchData, setSearchData] = useState();
	const [expandedTrending, setExpandedTrending] = useState(false);
	const [visibleArrow, setVisibleArrow] = useState(true);

	const expandContents = () => {
		setExpandedTrending(true);
		setVisibleArrow(false);
	};

	useEffect(() => {
		if (searchResults) {
			(async () => {
				try {
					const mainArray = await Promise.all(
						searchResults.map(async (video) => {
							const [statsData, channelData] = await Promise.all([
								getVideoStatistics(
									video.id.videoId,
									process.env.REACT_APP_API_KEY
								),
								getChannelData(
									video.snippet.channelId,
									process.env.REACT_APP_API_KEY
								),
							]);
							return { video, statsData, channelData };
						})
					);
					setSearchData(mainArray);
				} catch (error) {
					console.log(`Search results error: ${error}`);
				}
			})();
		}
	}, [searchResults]);

	useEffect(() => {
		(async () => {
			try {
				const [mainDatabase, trendingDatabase] = await Promise.all([
					getRandomVideosFromFS(24),
					getTrendingVideos(12, process.env.REACT_APP_API_KEY),
				]);

				const mainArray = await Promise.all(
					mainDatabase.map(async (video) => {
						const [statsData, channelData] = await Promise.all([
							getVideoStatistics(
								video.id.videoId,
								process.env.REACT_APP_API_KEY
							),
							getChannelData(
								video.snippet.channelId,
								process.env.REACT_APP_API_KEY
							),
						]);
						return { video, statsData, channelData };
					})
				);

				const trendingArray = await Promise.all(
					trendingDatabase.map(async (video) => {
						const [statsData, channelData] = await Promise.all([
							getVideoStatistics(
								video.id.videoId,
								process.env.REACT_APP_API_KEY
							),
							getChannelData(
								video.snippet.channelId,
								process.env.REACT_APP_API_KEY
							),
						]);
						return { video, statsData, channelData };
					})
				);

				const [main, trending] = await Promise.all([mainArray, trendingArray]);

				setMainData(main);
				setTrendingData(trending);
			} catch (error) {
				console.log(`Main page content data fetch error: ${error}`);
			}
		})();
	}, []);

	useEffect(() => {
		const container = document.getElementById('main-contents');
		if (container.offsetWidth <= 785) {
			document.documentElement.style.setProperty('--menu-width', '0');
			setMenuIsThin(true);
		}
		if (container.offsetWidth <= 1151 && container.offsetWidth >= 858) {
			document.documentElement.style.setProperty('--menu-width', '72px');
			setMenuIsThin(true);
		}
	}, [setMenuIsThin]);

	useEffect(() => {
		const container = document.getElementById('main-contents');
		const watchForResize = () => {
			if (container.offsetWidth <= 785) {
				document.documentElement.style.setProperty('--menu-width', '0');
				setMenuIsThin(true);
			}
			if (container.offsetWidth <= 1151 && container.offsetWidth >= 858) {
				document.documentElement.style.setProperty('--menu-width', '72px');
				setMenuIsThin(true);
			}
			if (container.offsetWidth >= 1320 && !menuSetByUser) {
				document.documentElement.style.setProperty('--menu-width', '240px');
				setMenuIsThin(false);
				setMenuIsHidden(true);
			}
		};

		window.addEventListener('resize', watchForResize);

		return () => window.removeEventListener('resize', watchForResize);
	}, [menuSetByUser, setMenuIsThin, setMenuIsHidden]);

	return (
		<div id='contents-container'>
			<div
				className={`fade-cover ${menuIsHidden ? 'is-hidden' : ''}`}
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
				{!mainData ? (
					<div className='main-page-loading'>
						<LoadingIcon />
						<h1>Loading data.</h1>
						<h1>
							If this persist for longer than few seconds try refreshing the
							page.
						</h1>
						<h1>
							If that still doesn't help it means app ran out of API tokens, try
							again in 24 hours.
						</h1>
					</div>
				) : null}
				{searchData ? (
					<div id='search-result-contents'>
						<h1 className='search-result-tag'>Search Results</h1>
						<GridContentsWrapper data={searchData} loadVideo={loadVideo} />
					</div>
				) : null}
				{mainData ? (
					<GridContentsWrapper data={mainData} loadVideo={loadVideo} />
				) : null}
				{trendingData ? (
					<div
						id='trending-contents'
						// Fit-content doesn't work here (?). Have to use empty value and set fit-content in css.
						style={{ maxHeight: expandedTrending ? '' : '425px' }}
					>
						<h1 className='trending-tag'>Trending</h1>
						<GridContentsWrapper data={trendingData} loadVideo={loadVideo} />

						<div
							className='expand-trending-btn'
							style={{
								visibility: visibleArrow ? 'visible' : 'hidden',
							}}
							onClick={expandContents}
						>
							<svg focusable='false' viewBox='0 0 24 24'>
								<path d='M12,15.7L5.6,9.4l0.7-0.7l5.6,5.6l5.6-5.6l0.7,0.7L12,15.7z'></path>
							</svg>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default MainPage;
