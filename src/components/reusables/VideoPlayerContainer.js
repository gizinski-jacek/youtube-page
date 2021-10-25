const VideoPlayerContainer = ({ videoId }) => {
	return (
		<div className='video'>
			<div className='video-wrapper'>
				<iframe
					src={`https://www.youtube-nocookie.com/embed/${videoId}`}
					title='YouTube video player'
					frameBorder='0'
					allowFullScreen
				/>
			</div>
		</div>
	);
};

export default VideoPlayerContainer;
