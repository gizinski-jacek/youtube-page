import { Link } from 'react-router-dom';
import countFormatter from './countFormatter';
import dateFormatter from './dateFormatter';

const ContentCardWrapper = (video, index, loadVideo, stats, channel) => {
	return (
		<Link
			to={`watch=${video.videoData.id.videoId}`}
			key={index}
			className='content-card'
			onClick={() => loadVideo({ video, stats, channel })}
		>
			<img
				className='card-thumbnail'
				src={video.videoData.snippet.thumbnails.medium.url}
				alt='Video thumbnail'
			/>
			<div className='card-details'>
				<img
					className='channel-picture'
					src={
						channel.thumbnails.default.url ||
						`https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fprofile_placeholder.png?alt=media&token=d1bc2f1c-9c82-4f41-b255-1bf9413fa641`
					}
					alt=''
				/>
				<div className='metadata'>
					<h3 className='video-title'>
						{video.videoData.snippet.title}
					</h3>
					<div>
						<h3 className='channel-name'>
							{video.videoData.snippet.channelTitle}
						</h3>
						<span>
							<h4 className='total-views'>
								{countFormatter(stats.viewCount, 1)}
							</h4>
							<h4 className='upload-date'>
								{dateFormatter(
									video.videoData.snippet.publishedAt
								)}
							</h4>
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ContentCardWrapper;
