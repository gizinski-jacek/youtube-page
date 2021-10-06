import { Link, NavLink } from 'react-router-dom';

const Video = ({ data, related, link }) => {
	const relatedContentDisplay = related.map((vid, index) => {
		return (
			<Link
				to={`/v=${vid.id}`}
				key={index}
				className='related-card'
				onClick={() => link(vid)}
			>
				<img
					className='related-card-thumbnail'
					src={`https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`}
					alt='Video thumbnail'
				/>
				<div className='related-card-details'>
					<div className='related-metadata'>
						<h3 className='related-video-title'>
							title title title title title title title title
							title title title title title title title title
							title title title title title title title title
						</h3>
						<div>
							<span className='related-channel-name'>
								channel-name
							</span>
							<span>
								<span className='related-total-views'>
									total-views
								</span>
								<span className='related-upload-date'>
									upload-date
								</span>
							</span>
							<h4>New</h4>
						</div>
					</div>
				</div>
				<div className='related-card-more'>
					<svg focusable='false'>
						<path d='M12,16.5c0.83,0,1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5S11.17,16.5,12,16.5z M10.5,12 c0,0.83,0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5s-0.67-1.5-1.5-1.5S10.5,11.17,10.5,12z M10.5,6c0,0.83,0.67,1.5,1.5,1.5 s1.5-0.67,1.5-1.5S12.83,4.5,12,4.5S10.5,5.17,10.5,6z'></path>
					</svg>
				</div>
			</Link>
		);
	});

	return (
		<div id='video-page'>
			<div id='video-container'>
				<div className='video'>
					<div className='video-wrapper'>
						<iframe
							src={`https://www.youtube-nocookie.com/embed/${data.id}`}
							title='YouTube video player'
							frameBorder='0'
							allowFullScreen
						></iframe>
					</div>
				</div>
				<div className='video-details'>title etc</div>
			</div>
			<div id='related-videos'>
				<div id='related-filter'>
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
				<div className='related-links'>{relatedContentDisplay}</div>
			</div>
		</div>
	);
};

export default Video;
