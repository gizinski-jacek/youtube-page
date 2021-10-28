import { NavLink } from 'react-router-dom';
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
