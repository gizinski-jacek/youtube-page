import { Link } from 'react-router-dom';
import countFormatter from './countFormatter';
import dateFormatter from './dateFormatter';

const ContentCardWrapper = ({ video, loadVideo, stats, channel }) => {
	const moreMenu = () => {
		console.log('reminder');
	};

	return (
		<div className='content-card'>
			<Link
				to={`watch=${video.videoData.id.videoId}`}
				className='whole-card-link'
				onClick={() => loadVideo({ video, stats, channel })}
			/>
			<img
				className='card-thumbnail'
				src={video.videoData.snippet.thumbnails.medium.url}
				alt='Video thumbnail'
			/>
			<div className='card-details'>
				<a
					href={`https://www.youtube.com/channel/${video.videoData.snippet.channelId}`}
					className='channel-picture-link'
				>
					<img
						className='channel-picture'
						src={
							channel.thumbnails.default.url ||
							`https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fprofile_placeholder.png?alt=media&token=d1bc2f1c-9c82-4f41-b255-1bf9413fa641`
						}
						alt=''
					/>
				</a>
				<div className='metadata'>
					<h3 className='video-title'>
						{video.videoData.snippet.title}
					</h3>
					<a
						href={`https://www.youtube.com/channel/${video.videoData.snippet.channelId}`}
						className='channel-name-link'
					>
						<h3 className='channel-name'>
							{video.videoData.snippet.channelTitle}
						</h3>
					</a>
					<span>
						<h4 className='total-views'>
							{countFormatter(stats?.viewCount, 1)}
						</h4>
						<h4 className='upload-date'>
							{dateFormatter(video.videoData.snippet.publishedAt)}
						</h4>
					</span>
				</div>
				<div className='trending-card-more' onClick={moreMenu}>
					<svg focusable='false'>
						<path d='M12,16.5c0.83,0,1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5S11.17,16.5,12,16.5z M10.5,12 c0,0.83,0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5s-0.67-1.5-1.5-1.5S10.5,11.17,10.5,12z M10.5,6c0,0.83,0.67,1.5,1.5,1.5 s1.5-0.67,1.5-1.5S12.83,4.5,12,4.5S10.5,5.17,10.5,6z'></path>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default ContentCardWrapper;
