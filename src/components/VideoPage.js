import { myAPIKey } from '../firebase';
import { NavLink } from 'react-router-dom';
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
import RelatedContentsWrapper from './reusables/RelatedContentsWrapper';

const VideoPage = ({ isHidden, toggleVisibility, loadedData }) => {
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
				myAPIKey
			);
			const array = await Promise.all(
				data.map(async (video) => {
					const [statsData, channelData] = await Promise.all([
						getVideoStatistics(video.id.videoId, myAPIKey),
						getChannelData(video.snippet.channelId, myAPIKey),
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
						myAPIKey
					)
				);
			})();
			(async () => {
				setCommentsData(
					await getCommentsData(videoData.video.id.videoId, myAPIKey)
				);
			})();
		} else {
			(async () => {
				try {
					const vidId = window.location.pathname.slice(7);
					const [vidData, vidStats] = await Promise.all([
						await getVideoData(vidId, myAPIKey),
						await getVideoStatistics(vidId, myAPIKey),
					]);
					console.log(vidData);
					const chanData = await getChannelData(
						vidData[0].snippet.channelId,
						myAPIKey
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
					console.log(
						`Promise all for video page data error: ${error}`
					);
				}
			})();
		}
	}, [videoData]);

	return (
		<div id='video-page'>
			<div
				className={`cover-fade ${isHidden ? 'is-hidden' : ''}`}
				onClick={toggleVisibility}
			/>
			<div id='video-column-container'>
				<div id='video-main-container'>
					{videoData ? (
						<VideoPlayerContainer
							videoId={videoData.video.id.videoId}
						/>
					) : null}
					{videoData && statsData ? (
						<StatisticsContainer
							videoData={videoData}
							statsData={statsData}
						/>
					) : null}
					{videoData && commentsData ? (
						<CommentsContainer
							videoData={videoData}
							newCommentValue={newCommentValue}
							handleInput={handleInput}
							commentsData={commentsData}
						/>
					) : null}
				</div>
			</div>
			<div id='related-videos'>
				<div
					className='load-related-videos'
					style={{ display: showLoadBox ? 'flex' : 'none' }}
				>
					<h3>
						Press the button to load related videos. This action
						uses a lot of API tokens and after few uses will reach
						the daily quota which will result in no videos being
						loaded anymore.
					</h3>
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
		</div>
	);
};

export default VideoPage;
