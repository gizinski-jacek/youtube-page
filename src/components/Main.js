import { myAPIKey } from '../firebase';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import getRandomVideosFromFirestore from './utils/getRandomVideosFromFirestore';
import getYTTrendingVideos from './utils/getYTTrendingVideos';
import GridContentsWrapper from './reusables/GridContentsWrapper';

const Main = ({ isHidden, toggleVisibility, loadVideo }) => {
	const [showLoadBox, setShowLoadBox] = useState(true);
	const [mainData, setMainData] = useState();
	const [mainGridContents, setGridContents] = useState();
	const [trendingData, setTrendingData] = useState();
	const [trendingGridContents, setTrendingGridContents] = useState();
	const [visibleArrow, setVisibleArrow] = useState(false);
	const [expandedTrending, setExpandedTrending] = useState(false);

	const handleLoad = async () => {
		const data = await getYTTrendingVideos(12, myAPIKey);
		setTrendingData(data);
		const contents = await GridContentsWrapper(data);
		setTrendingGridContents(contents);
		setShowLoadBox(false);
		setVisibleArrow(true);
	};

	const expandContents = () => {
		setExpandedTrending(true);
		setVisibleArrow(false);
	};

	useEffect(() => {
		(async () => {
			const data = await getRandomVideosFromFirestore(24);
			setMainData(data);
			const contents = await GridContentsWrapper(data, loadVideo);
			setGridContents(contents);
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
