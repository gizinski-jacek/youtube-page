import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dateFormatter from './utils/dateFormatter';
import countFormatter from './utils/countFormatter';

const Video = ({ loadedData, loadVideo }) => {
	const myYTKey = 'AIzaSyD-zyj2Y5Uk1v2ZtpZfeeJXXh-3gFWkBWc';
	const [channelStats, setChannelStats] = useState();
	const [comment, setComment] = useState();
	const [relatedVideoDatabase, setRelatedVideoDatabase] = useState();
	const [relatedContent, setRelatedContent] = useState();

	const handleInput = (e) => {
		const { value } = e.target;
		setComment(value);
	};

	const getVideoStats = (vidId) => {
		return fetch(
			`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${vidId}&key=${myYTKey}`
		)
			.then((response) => response.json())
			.then((data) => data.items[0].statistics)
			.catch((error) => {
				console.log('Video stats fetch error: ' + error);
			});
	};

	const getChannelData = (chanId) => {
		console.log(
			`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${chanId}&key=${myYTKey}`
		);
		return fetch(
			`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${chanId}&key=${myYTKey}`
		)
			.then((response) => response.json())
			.then((data) => data.items[0].snippet)
			.catch((error) => {
				console.log('Channel data fetch error: ' + error);
			});
	};

	useEffect(() => {
		return fetch(
			`https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${loadedData.video.videoData.snippet.channelId}&key=${myYTKey}`
		)
			.then((response) => response.json())
			.then((data) => setChannelStats(data.items[0].statistics))
			.catch((error) => {
				console.log('Channel data fetch error: ' + error);
			});
	}, []);

	// useEffect(() => {
	// 	fetch(
	// 		`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&order=relevance&relatedToVideoId=${loadedData.video.videoData.id.videoId}&type=video&key=${myYTKey}`
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			const trendingArray = data.items.map((item) => {
	// 				return { videoData: item };
	// 			});
	// 			setRelatedVideoDatabase(trendingArray);
	// 			createRelatedDisplayContent(trendingArray);
	// 		});
	// }, []);

	const createRelatedDisplayContent = (database) => {
		const relatedPromise = Promise.all(
			database.map(async (video, index) => {
				console.log(video);
				const videoStats = await getVideoStats(
					video.videoData.id.videoId
				);
				const channelData = await getChannelData(
					video.videoData.snippet.channelId
				);
				return Promise.all([videoStats, channelData]).then(
					([stats, channel]) => {
						return (
							<Link
								to={`watch=${video.videoData.id.videoId}`}
								key={index}
								className='related-card'
								onClick={() =>
									loadVideo({ video, stats, channel })
								}
							>
								<img
									className='related-card-thumbnail'
									src={
										video.videoData.snippet.thumbnails
											.medium.url
									}
									alt='Video thumbnail'
								/>
								<div className='related-card-details'>
									<div className='related-metadata'>
										<h3 className='related-video-title'>
											{video.videoData.snippet.title}
										</h3>
										<div>
											<h3 className='related-channel-name'>
												{
													video.videoData.snippet
														.channelTitle
												}
											</h3>
											<span>
												<h4 className='related-total-views'>
													{countFormatter(
														stats.viewCount,
														1
													)}
												</h4>
												<h4 className='related-upload-date'>
													{dateFormatter(
														video.videoData.snippet
															.publishedAt
													)}
												</h4>
											</span>
											<h5>New</h5>
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
					}
				);
			})
		);
		relatedPromise.then((content) => setRelatedContent(content));
	};

	return (
		<div id='video-page'>
			<div id='video-container'>
				<div className='video'>
					<div className='video-wrapper'>
						<iframe
							src={`https://www.youtube-nocookie.com/embed/${loadedData.video.videoData.id.videoId}`}
							title='YouTube video player'
							frameBorder='0'
							allowFullScreen
						></iframe>
					</div>
				</div>
				<div className='video-metadata'>
					<h2 className='video-title'>
						{loadedData.video.videoData.snippet.title}
					</h2>
					<div className='video-engagement'>
						<span>
							<h4 className='video-total-views'>
								{new Intl.NumberFormat().format(
									loadedData.stats.viewCount
								)}
							</h4>
							<h4 className='video-upload-date'>
								{new Date(
									loadedData.video.videoData.snippet.publishedAt
								).toLocaleDateString(undefined, {
									year: 'numeric',
									month: 'short',
									day: 'numeric',
								})}
							</h4>
						</span>
						<div>
							<div className='video-votes'>
								<span className='video-votes-thumbs'>
									<div className='video-likes'>
										<svg focusable='false'>
											<path d='M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z'></path>
										</svg>
										<h3>{loadedData.stats.likeCount}</h3>
									</div>
									<div className='video-dislikes'>
										<svg focusable='false'>
											<path d='M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z'></path>
										</svg>
										<h3>{loadedData.stats.dislikeCount}</h3>
									</div>
								</span>
								<span className='video-votes-bars'>
									<div
										className='video-likes-bar'
										style={{
											width: `${
												(Number(
													loadedData.stats.likeCount
												) /
													(Number(
														loadedData.stats
															.likeCount
													) +
														Number(
															loadedData.stats
																.dislikeCount
														))) *
												100
											}%`,
										}}
									></div>
									<div className='video-dislikes-bar'></div>
								</span>
							</div>
							<div className='video-share'>
								<svg focusable='false'>
									<path d='M15,5.63L20.66,12L15,18.37V15v-1h-1c-3.96,0-7.14,1-9.75,3.09c1.84-4.07,5.11-6.4,9.89-7.1L15,9.86V9V5.63 M14,3v6 C6.22,10.13,3.11,15.33,2,21c2.78-3.97,6.44-6,12-6v6l8-9L14,3L14,3z'></path>
								</svg>
								<h3>Share</h3>
							</div>
							<div className='video-save'>
								<svg focusable='false'>
									<path d='M22,13h-4v4h-2v-4h-4v-2h4V7h2v4h4V13z M14,7H2v1h12V7z M2,12h8v-1H2V12z M2,16h8v-1H2V16z'></path>
								</svg>
								<h3>Save</h3>
							</div>
							<div className='video-more'>
								<svg focusable='false'>
									<path d='M7.5,12c0,0.83-0.67,1.5-1.5,1.5S4.5,12.83,4.5,12s0.67-1.5,1.5-1.5S7.5,11.17,7.5,12z M12,10.5c-0.83,0-1.5,0.67-1.5,1.5 s0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5S12.83,10.5,12,10.5z M18,10.5c-0.83,0-1.5,0.67-1.5,1.5s0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5 S18.83,10.5,18,10.5z'></path>
								</svg>
							</div>
						</div>
					</div>
					<div>
						<div className='video-channel-data'>
							<div className='video-channel-details'>
								{/* {console.log(loadedData.channel)} */}
								<Link
									to={`https://www.youtube.com/channel/${loadedData.video.videoData.snippet.channelId}`}
								>
									<img
										className='video-channel-picture'
										src={
											loadedData.video.videoData.snippet
												.thumbnails.medium.url
										}
										alt=''
									/>
								</Link>
								<div>
									<Link
										to={`https://www.youtube.com/channel/${loadedData.video.videoData.snippet.channelId}`}
									>
										<h3 className='video-channel-name'>
											{loadedData.channel.title}
										</h3>
									</Link>
									<h4 className='video-channel-subscribers-count'>
										{channelStats
											? countFormatter(
													channelStats.subscriberCount,
													2
											  )
											: null}
									</h4>
								</div>
							</div>
							<div className='video-channel-subscribe'>
								<h3>Subscribe</h3>
							</div>
						</div>
						<p className='video-description'>
							{loadedData.video.videoData.snippet.description}
						</p>
					</div>
				</div>
				<div className='comments-container'>
					<span className='comments-top'>
						<div className='comments-count'>
							<h3>{`${loadedData.stats.commentCount} Comments`}</h3>
						</div>
						<div className='comments-sort'>
							<svg focusable='false'>
								<path d='M21,6H3V5h18V6z M15,11H3v1h12V11z M9,17H3v1h6V17z'></path>
							</svg>
							<h3>Sort By</h3>
						</div>
					</span>
					<div className='add-comment'>
						<img
							className='add-comment-user-picture'
							src='images/profile_placeholder.png'
							alt=''
						/>
						<input
							id='add-comment-input'
							type='text'
							name='add-comment-input'
							value={comment}
							onChange={handleInput}
							placeholder='Commenting publicly as USERNAME'
						/>
					</div>
					<div className='comments-section'>
						<div className='comment'>comment111</div>
						<div className='comment'>comment222</div>
						<div className='comment'>comment333</div>
						<div className='comment'>comment444</div>
						<div className='comment'>comment555</div>
					</div>
				</div>
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
				<div className='related-links'>
					{relatedContent ? relatedContent : null}
				</div>
			</div>
		</div>
	);
};

export default Video;
