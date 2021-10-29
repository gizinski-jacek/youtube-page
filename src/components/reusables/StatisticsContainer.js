import { Link } from 'react-router-dom';
import countFormatter from '../utils/countFormatter';

const StatisticsContainer = ({ videoData, statsData }) => {
	return videoData && statsData ? (
		<div className='video-metadata'>
			<h1 className='video-title'>{videoData.video.snippet.title}</h1>
			<div className='video-engagement'>
				<span className='video-engagement-start'>
					<h2 className='video-total-views'>
						{new Intl.NumberFormat().format(
							videoData.stats.viewCount
						)}
					</h2>
					<h2 className='video-upload-date'>
						{new Date(
							videoData.video.snippet.publishedAt
						).toLocaleDateString(undefined, {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})}
					</h2>
				</span>
				<div className='video-engagement-end'>
					<div className='video-votes'>
						<span className='video-votes-thumbs'>
							<div className='video-likes'>
								<svg focusable='false' viewBox='0 0 24 24'>
									<path d='M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z'></path>
								</svg>
								<h2>
									{countFormatter(
										videoData.stats.likeCount,
										0
									)}
								</h2>
							</div>
							<div className='video-dislikes'>
								<svg focusable='false' viewBox='0 0 24 24'>
									<path d='M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z'></path>
								</svg>
								<h2>
									{countFormatter(
										videoData.stats.dislikeCount,
										0
									)}
								</h2>
							</div>
						</span>
						<span className='video-votes-bars'>
							<div
								className='video-likes-bar'
								style={{
									width: `${
										(Number(videoData.stats.likeCount) /
											(Number(videoData.stats.likeCount) +
												Number(
													videoData.stats.dislikeCount
												))) *
										100
									}%`,
								}}
							></div>
							<div className='video-dislikes-bar'></div>
						</span>
					</div>
					<div className='video-share'>
						<svg focusable='false' viewBox='0 0 24 24'>
							<path d='M15,5.63L20.66,12L15,18.37V15v-1h-1c-3.96,0-7.14,1-9.75,3.09c1.84-4.07,5.11-6.4,9.89-7.1L15,9.86V9V5.63 M14,3v6 C6.22,10.13,3.11,15.33,2,21c2.78-3.97,6.44-6,12-6v6l8-9L14,3L14,3z'></path>
						</svg>
						<h2>Share</h2>
					</div>
					<div className='video-save'>
						<svg focusable='false' viewBox='0 0 24 24'>
							<path d='M22,13h-4v4h-2v-4h-4v-2h4V7h2v4h4V13z M14,7H2v1h12V7z M2,12h8v-1H2V12z M2,16h8v-1H2V16z'></path>
						</svg>
						<h2>Save</h2>
					</div>
					<div className='video-more'>
						<svg focusable='false' viewBox='0 0 24 24'>
							<path d='M7.5,12c0,0.83-0.67,1.5-1.5,1.5S4.5,12.83,4.5,12s0.67-1.5,1.5-1.5S7.5,11.17,7.5,12z M12,10.5c-0.83,0-1.5,0.67-1.5,1.5 s0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5S12.83,10.5,12,10.5z M18,10.5c-0.83,0-1.5,0.67-1.5,1.5s0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5 S18.83,10.5,18,10.5z'></path>
						</svg>
					</div>
				</div>
			</div>
			<div>
				<div className='video-channel-data'>
					<div className='video-channel-details'>
						<Link
							to={`https://www.youtube.com/channel/${videoData.video.snippet.channelId}`}
							className='video-channel-picture-link'
						>
							<img
								className='video-channel-picture'
								src={
									videoData.video.snippet.thumbnails.medium
										.url ||
									`https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fprofile_placeholder.png?alt=media&token=d1bc2f1c-9c82-4f41-b255-1bf9413fa641`
								}
								alt=''
							/>
						</Link>
						<div>
							<Link
								to={`https://www.youtube.com/channel/${videoData.video.snippet.channelId}`}
								className='video-channel-name-link'
							>
								<h2 className='video-channel-name'>
									{videoData.channel.title}
								</h2>
							</Link>
							<h3 className='video-channel-subscribers-count'>
								{statsData
									? `${countFormatter(
											statsData.subscriberCount,
											2
									  )} subscribers`
									: null}
							</h3>
						</div>
					</div>
					<button id='channel-subscribe-btn'>Subscribe</button>
				</div>
				<p className='video-description'>
					{videoData.video.snippet.description}
				</p>
			</div>
		</div>
	) : null;
};

export default StatisticsContainer;
