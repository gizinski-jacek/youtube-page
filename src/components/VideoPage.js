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
	const [relatedContents, setRelatedContents] = useState();

	const handleInput = (e) => {
		const { value } = e.target;
		setNewCommentValue(value);
	};

	const loadVideo = (vidData) => {
		setRelatedContents(null);
		setRelatedData(null);
		setShowLoadBox(true);
		setVideoData(vidData);
	};

	const handleLoad = async () => {
		const data = await getRelatedVideos(
			videoData.video.videoData.id.videoId,
			myAPIKey
		);
		setRelatedData(data);
		const contents = RelatedContentsWrapper(data, loadVideo);
		// Shouldn't store this in state but I don't know proper way to do this right now.
		setRelatedContents(contents);
		setShowLoadBox(false);
	};

	useEffect(() => {
		if (videoData) {
			(async () => {
				setStatsData(
					await getChannelStatistics(
						videoData.video.videoData.snippet.channelId,
						myAPIKey
					)
				);
			})();
			(async () => {
				setCommentsData(
					await getCommentsData(
						videoData.video.videoData.id.videoId,
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
				const vidData = await getVideoData(vidId, myAPIKey);
				const vidStats = await getVideoStatistics(vidId);
				const chanData = await getChannelData(
					vidData[0].snippet.channelId
				);
				setVideoData({
					video: vidData,
					stats: vidStats,
					channel: chanData,
				});
				console.log({ vidData, vidStats, chanData });
			})();
		}
	}, []);

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
							videoId={videoData.video.videoData.id.videoId}
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
					{relatedContents}
				</div>
			</div>
		</div>
	);
};

export default VideoPage;
