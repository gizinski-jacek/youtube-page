import { NavLink } from 'react-router-dom';
import LoadingIcon from './LoadingIcon';
import RelatedContentsWrapper from './RelatedContentsWrapper';

const RelatedVideosContainer = ({
	showLoadBox,
	handleLoad,
	relatedData,
	loadVideo,
}) => {
	return (
		<div id='related-videos-container'>
			<div
				className='load-related-videos'
				style={{ display: showLoadBox ? 'flex' : 'none' }}
			>
				<h2>
					Press the button to load related videos. This action uses a
					lot of API tokens and after few uses will reach the daily
					quota which will result in no videos being loaded anymore.
				</h2>
				<button id='load-related-videos-btn' onClick={handleLoad}>
					Load Videos
				</button>
			</div>
			<div
				id='related-filter'
				style={{ visibility: showLoadBox ? 'hidden' : 'visible' }}
			>
				<ul>
					<NavLink activeClassName='active' to='/'>
						<li>All</li>
					</NavLink>
					<li>Playlists</li>
					<li>Music</li>
					<li>Live</li>
					<li>Computers</li>
					<li>Sales</li>
					<li>Recently uploaded</li>
				</ul>
			</div>
			{!relatedData && !showLoadBox ? (
				<div className='video-related-loading'>
					<LoadingIcon />
					<h2>Loading data.</h2>
					<h2>
						If this persist for longer than few seconds try
						refreshing the page.
					</h2>
					<h2>
						If that still doesn't help it means app ran out of API
						tokens, try again in 24 hours.
					</h2>
				</div>
			) : null}
			<div
				className='related-links'
				style={{ visibility: showLoadBox ? 'hidden' : 'visible' }}
			>
				{relatedData ? (
					<RelatedContentsWrapper
						data={relatedData}
						loadVideo={loadVideo}
					/>
				) : null}
			</div>
		</div>
	);
};

export default RelatedVideosContainer;
