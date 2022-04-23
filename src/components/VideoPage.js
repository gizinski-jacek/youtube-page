import { useEffect, useState } from 'react';
import getChannelStatistics from './utils/getChannelStatistics';
import getCommentsData from './utils/getCommentsData';
import getVideoData from './utils/getVideoData';
import getVideoStatistics from './utils/getVideoStatistics';
import getChannelData from './utils/getChannelData';
import getRelatedVideos from './utils/getRelatedVideos';
import VideoPlayerContainer from './reusables/VideoPlayerContainer';
import StatisticsContainer from './reusables/StatisticsContainer';
import CommentsContainer from './reusables/CommentsContainer';
import RelatedVideosContainer from './reusables/RelatedVideosContainer';
import LoadingIcon from './reusables/LoadingIcon';

const VideoPage = ({ isHidden, toggleVisibility, loadedData }) => {
	const [browserIsWide, setBrowserIsWide] = useState(false);
	const [showLoadBox, setShowLoadBox] = useState(true);
	const [videoData, setVideoData] = useState(loadedData);
	const [statsData, setStatsData] = useState();
	const [commentsData, setCommentsData] = useState();
	const [newCommentValue, setNewCommentValue] = useState();
	const [relatedData, setRelatedData] = useState();

	const handleInput = (e) => {
		const { value } = e.target;
		setNewCommentValue(value);
	};

	const loadVideo = (vidData) => {
		setRelatedData(null);
		setShowLoadBox(true);
		setVideoData(vidData);
	};

	const handleLoad = async () => {
		try {
			const data = await getRelatedVideos(
				videoData.video.id.videoId,
				process.env.REACT_APP_API_KEY
			);
			const array = await Promise.all(
				data.map(async (video) => {
					const [statsData, channelData] = await Promise.all([
						getVideoStatistics(video.id.videoId, process.env.REACT_APP_API_KEY),
						getChannelData(
							video.snippet.channelId,
							process.env.REACT_APP_API_KEY
						),
					]);
					return { video, statsData, channelData };
				})
			);
			setRelatedData(array);
		} catch (error) {
			console.log(`Related data fetch error: ${error}`);
		}
		setShowLoadBox(false);
	};

	useEffect(() => {
		if (videoData) {
			(async () => {
				setStatsData(
					await getChannelStatistics(
						videoData.video.snippet.channelId,
						process.env.REACT_APP_API_KEY
					)
				);
			})();
			(async () => {
				setCommentsData(
					await getCommentsData(
						videoData.video.id.videoId,
						process.env.REACT_APP_API_KEY
					)
				);
			})();
		} else {
			(async () => {
				try {
					const vidId = window.location.pathname.slice(7);
					const [vidData, vidStats] = await Promise.all([
						await getVideoData(vidId, process.env.REACT_APP_API_KEY),
						await getVideoStatistics(vidId, process.env.REACT_APP_API_KEY),
					]);
					const chanData = await getChannelData(
						vidData[0].snippet.channelId,
						process.env.REACT_APP_API_KEY
					);
					setVideoData({
						video: {
							...vidData[0],
							id: {
								videoId: vidData[0].id,
								kind: vidData[0].kind,
							},
						},
						stats: vidStats,
						channel: chanData,
					});
				} catch (error) {
					console.log(`Promise all for video page data error: ${error}`);
				}
			})();
		}
	}, [videoData]);

	useEffect(() => {
		const container = document.getElementById('video-page');
		if (container.offsetWidth <= 1025) {
			setBrowserIsWide(true);
		}
		if (container.offsetWidth >= 1026) {
			setBrowserIsWide(false);
		}
	}, []);

	useEffect(() => {
		const container = document.getElementById('video-page');
		const watchForResize = () => {
			if (container.offsetWidth <= 1025) {
				setBrowserIsWide(true);
			}
			if (container.offsetWidth >= 1026) {
				setBrowserIsWide(false);
			}
		};

		window.addEventListener('resize', watchForResize);

		return () => window.removeEventListener('resize', watchForResize);
	}, []);

	return (
		<div id='video-page'>
			{!videoData ? (
				<div className='video-page-loading'>
					<LoadingIcon />
					<h1>Loading data.</h1>
					<h1>
						If this persist for longer than few seconds try refreshing the page.
					</h1>
					<h1>
						If that still doesn't help it means app ran out of API tokens, try
						again in 24 hours.
					</h1>
				</div>
			) : null}
			<div
				className={`fade-cover ${isHidden ? 'is-hidden' : ''}`}
				onClick={toggleVisibility}
			/>
			{videoData ? (
				<>
					<div id='video-main-container'>
						<VideoPlayerContainer videoId={videoData.video.id.videoId} />
						{statsData ? (
							<StatisticsContainer
								videoData={videoData}
								statsData={statsData}
							/>
						) : null}
						{browserIsWide ? (
							videoData && statsData ? (
								<RelatedVideosContainer
									showLoadBox={showLoadBox}
									handleLoad={handleLoad}
									relatedData={relatedData}
									loadVideo={loadVideo}
								/>
							) : null
						) : null}
						<div id='comments-section-container'>
							{commentsData ? (
								<CommentsContainer
									videoData={videoData}
									newCommentValue={newCommentValue}
									handleInput={handleInput}
									commentsData={commentsData}
								/>
							) : null}
						</div>
					</div>
					{browserIsWide ? null : videoData && statsData ? (
						<RelatedVideosContainer
							showLoadBox={showLoadBox}
							handleLoad={handleLoad}
							relatedData={relatedData}
							loadVideo={loadVideo}
						/>
					) : null}
				</>
			) : null}
		</div>
	);
};

export default VideoPage;
