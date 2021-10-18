import { myAPIKey } from '../firebase';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dateFormatter from './utils/dateFormatter';
import countFormatter from './utils/countFormatter';
import getVideoCommentsData from './utils/getVideoCommentsData';
import getYTRelatedVideos from './utils/getYTRelatedVideos';
import getYTVideoData from './utils/getYTVideoData';
import getYTVideoStatistics from './utils/getYTChannelData';
import getYTChannelData from './utils/getYTVideoStatistics';
import getYTChannelStatistics from './utils/getYTChannelStatistics';

const Video = ({ loadedData }) => {
	const [showLoadBox, setShowLoadBox] = useState(true);
	const [currentVideoData, setCurrentVideoData] = useState(loadedData);
	const [channelStats, setChannelStats] = useState();
	const [videoCommentsData, setVideoCommentsData] = useState();
	const [newCommentContent, setNewCommentContent] = useState();
	const [relatedContent, setRelatedContent] = useState();

	const handleInput = (e) => {
		const { value } = e.target;
		setNewCommentContent(value);
	};

	const changeVideo = (vidData) => {
		setRelatedContent(null);
		setShowLoadBox(true);
		setCurrentVideoData(vidData);
	};

	const handleLoad = async () => {
		setShowLoadBox(false);
		const relatedData = await getYTRelatedVideos(
			currentVideoData.video.videoData.id.videoId,
			myAPIKey
		);
		createRelatedDisplayContent(relatedData);
	};

	useEffect(() => {
		if (currentVideoData) {
			(async () => {
				setChannelStats(
					await getYTChannelStatistics(
						currentVideoData.video.videoData.snippet.channelId,
						myAPIKey
					)
				);
				setVideoCommentsData(
					await getVideoCommentsData(
						currentVideoData.video.videoData.id.videoId,
						myAPIKey
					)
				);
			})();
		} else {
			// Looking for a way to fetch all video data on refresh/on direct link load so the
			// video page doesn't crash. Right now throws below error. Looking for a solution.
			//
			// Warning: Can't perform a React state update on an unmounted component.
			// This is a no-op, but it indicates a memory leak in your application.
			// To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
			//
			(async () => {
				const vidId = window.location.pathname.slice(7);
				const vidData = await getYTVideoData(vidId, myAPIKey);
				const vidStats = await getYTVideoStatistics(vidId);
				const chanData = await getYTChannelData(
					vidData[0].snippet.channelId
				);
				setCurrentVideoData({
					video: vidData,
					stats: vidStats,
					channel: chanData,
				});
				console.log({ vidData, vidStats, chanData });
			})();
		}
	}, []);

	const createRelatedDisplayContent = (database) => {
		const relatedPromise = Promise.all(
			database.map(async (video, index) => {
				const videoStats = await getYTVideoStatistics(
					// Sometimes throws undefined error, need to find out why.
					video.videoData.id.videoId,
					myAPIKey
				);
				const channelData = await getYTChannelData(
					video.videoData.snippet.channelId,
					myAPIKey
				);
				return Promise.all([videoStats, channelData]).then(
					([stats, channel]) => {
						return (
							<Link
								to={`watch=${video.videoData.id.videoId}`}
								key={index}
								className='related-card'
								onClick={() =>
									changeVideo({ video, stats, channel })
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

	const currentVideoContent = currentVideoData ? (
		<div id='video-main-container'>
			<div className='video'>
				<div className='video-wrapper'>
					<iframe
						src={`https://www.youtube-nocookie.com/embed/${currentVideoData.video.videoData.id.videoId}`}
						title='YouTube video player'
						frameBorder='0'
						allowFullScreen
					></iframe>
				</div>
			</div>
			<div className='video-metadata'>
				<h2 className='video-title'>
					{currentVideoData.video.videoData.snippet.title}
				</h2>
				<div className='video-engagement'>
					<span>
						<h4 className='video-total-views'>
							{new Intl.NumberFormat().format(
								currentVideoData.stats.viewCount
							)}
						</h4>
						<h4 className='video-upload-date'>
							{new Date(
								currentVideoData.video.videoData.snippet.publishedAt
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
									<h3>
										{countFormatter(
											currentVideoData.stats.likeCount,
											0
										)}
									</h3>
								</div>
								<div className='video-dislikes'>
									<svg focusable='false'>
										<path d='M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z'></path>
									</svg>
									<h3>
										{countFormatter(
											currentVideoData.stats.dislikeCount,
											0
										)}
									</h3>
								</div>
							</span>
							<span className='video-votes-bars'>
								<div
									className='video-likes-bar'
									style={{
										width: `${
											(Number(
												currentVideoData.stats.likeCount
											) /
												(Number(
													currentVideoData.stats
														.likeCount
												) +
													Number(
														currentVideoData.stats
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
							<Link
								to={`https://www.youtube.com/channel/${currentVideoData.video.videoData.snippet.channelId}`}
							>
								<img
									className='video-channel-picture'
									src={
										currentVideoData.video.videoData.snippet
											.thumbnails.medium.url ||
										`https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fprofile_placeholder.png?alt=media&token=d1bc2f1c-9c82-4f41-b255-1bf9413fa641`
									}
									alt=''
								/>
							</Link>
							<div>
								<Link
									to={`https://www.youtube.com/channel/${currentVideoData.video.videoData.snippet.channelId}`}
								>
									<h3 className='video-channel-name'>
										{currentVideoData.channel.title}
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
						<button id='video-channel-subscribe'>Subscribe</button>
					</div>
					<p className='video-description'>
						{currentVideoData.video.videoData.snippet.description}
					</p>
				</div>
			</div>
			<div className='comments-controls'>
				<span className='comments-top'>
					<div className='comments-count'>
						<h3>{`${currentVideoData.stats.commentCount} Comments`}</h3>
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
						src={`https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fprofile_placeholder.png?alt=media&token=d1bc2f1c-9c82-4f41-b255-1bf9413fa641`}
						alt=''
					/>
					<input
						id='add-comment-input'
						type='text'
						name='add-comment-input'
						value={newCommentContent}
						onChange={handleInput}
						placeholder='Commenting publicly as USERNAME'
					/>
				</div>
			</div>
		</div>
	) : null;

	const currentVideoComments = videoCommentsData?.map((comment) => {
		return (
			<div key={comment.id} className='comment-main'>
				<img
					className='comment-user-picture'
					src={
						comment.snippet.topLevelComment.snippet
							.authorProfileImageUrl ||
						`https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fprofile_placeholder.png?alt=media&token=d1bc2f1c-9c82-4f41-b255-1bf9413fa641`
					}
					alt='Video thumbnail'
				/>
				<div className='comment-metadata'>
					<span className='comment-header'>
						<h4 className='comment-user-display-name'>
							{
								comment.snippet.topLevelComment.snippet
									.authorDisplayName
							}
						</h4>
						<h5 className='comment-post-date'>
							{
								comment.snippet.topLevelComment.snippet
									.publishedAt
							}
						</h5>
					</span>
					<p className='comment-content'>
						{comment.snippet.topLevelComment.snippet.textOriginal}
					</p>
					<span className='comment-engagement'>
						<div className='comment-like-count'>
							<svg focusable='false'>
								<path d='M12.42,14A1.54,1.54,0,0,0,14,12.87l1-4.24C15.12,7.76,15,7,14,7H10l1.48-3.54A1.17,1.17,0,0,0,10.24,2a1.49,1.49,0,0,0-1.08.46L5,7H1v7ZM9.89,3.14A.48.48,0,0,1,10.24,3a.29.29,0,0,1,.23.09S9,6.61,9,6.61L8.46,8H14c0,.08-1,4.65-1,4.65a.58.58,0,0,1-.58.35H6V7.39ZM2,8H5v5H2Z'></path>
							</svg>
							<h4>
								{countFormatter(
									comment.snippet.topLevelComment.snippet
										.likeCount,
									0
								)}
							</h4>
						</div>
						<div className='comment-dislike-count'>
							<svg focusable='false'>
								<path d='M3.54,2A1.55,1.55,0,0,0,2,3.13L1,7.37C.83,8.24,1,9,2,9H6L4.52,12.54A1.17,1.17,0,0,0,5.71,14a1.49,1.49,0,0,0,1.09-.46L11,9h4V2ZM6.07,12.86a.51.51,0,0,1-.36.14.28.28,0,0,1-.22-.09l0-.05L6.92,9.39,7.5,8H2a1.5,1.5,0,0,1,0-.41L3,3.35A.58.58,0,0,1,3.54,3H10V8.61ZM14,8H11l0-5h3Z'></path>
							</svg>
						</div>
						<div className='comment-reply-btn'>Reply</div>
					</span>
				</div>
			</div>
		);
	});

	return (
		<div id='video-page'>
			<div id='video-column-container'>
				{currentVideoContent}
				<div className='comments-container'>{currentVideoComments}</div>
			</div>
			<div id='related-videos'>
				<div
					className='relative-container'
					style={{ display: showLoadBox ? 'block' : 'none' }}
				>
					<div className='load-related-videos'>
						<h3>
							Press button below to load related videos. This
							action uses a lot of API tokens and after few uses
							will reach the daily quota which will result in no
							videos being loaded anymore.
						</h3>
						<button
							id='load-related-videos-btn'
							onClick={handleLoad}
						>
							Load Videos
						</button>
					</div>
				</div>
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
