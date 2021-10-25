import { Link } from 'react-router-dom';
import countFormatter from '../utils/countFormatter';
import dateFormatter from '../utils/dateFormatter';

const RelatedDataWrapper = ({ video, stats, channel, loadVideo }) => {
	return (
		<div className='related-card'>
			<Link
				to={`watch=${video.videoData.id.videoId}`}
				className='related-card-thumbnail-link'
				onClick={() =>
					loadVideo({
						video,
						stats,
						channel,
					})
				}
			>
				<img
					className='related-card-thumbnail'
					src={video.videoData.snippet.thumbnails.medium.url}
					alt='Video thumbnail'
				/>
			</Link>
			<div className='related-card-details'>
				<Link
					to={`watch=${video.videoData.id.videoId}`}
					className='related-metadata-link'
					onClick={() =>
						loadVideo({
							video,
							stats,
							channel,
						})
					}
				>
					<div className='related-metadata'>
						<h3 className='related-video-title'>
							{video.videoData.snippet.title}
						</h3>
						<h4 className='related-channel-name'>
							{video.videoData.snippet.channelTitle}
						</h4>
						<span>
							<h4 className='related-total-views'>
								{countFormatter(stats.viewCount, 1)}
							</h4>
							<h4 className='related-upload-date'>
								{dateFormatter(
									video.videoData.snippet.publishedAt
								)}
							</h4>
						</span>
						<h5>New</h5>
					</div>
				</Link>
			</div>
			<div className='related-card-more'>
				<svg focusable='false'>
					<path d='M12,16.5c0.83,0,1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5S11.17,16.5,12,16.5z M10.5,12 c0,0.83,0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5s-0.67-1.5-1.5-1.5S10.5,11.17,10.5,12z M10.5,6c0,0.83,0.67,1.5,1.5,1.5 s1.5-0.67,1.5-1.5S12.83,4.5,12,4.5S10.5,5.17,10.5,6z'></path>
				</svg>
			</div>
		</div>
	);
};

export default RelatedDataWrapper;
