import { app, myAPIKey } from './firebase';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Menu from './components/Menu';
import MenuVideo from './components/MenuVideo';
import Content from './components/Content';
import Video from './components/Video';
import dateFormatter from './components/utils/dateFormatter';
import countFormatter from './components/utils/countFormatter';
import getYTVideoStatistics from './components/utils/getYTChannelData';
import getYTChannelData from './components/utils/getYTVideoStatistics';

const App = () => {
	const [menuIsThin, setMenuIsThin] = useState(false);
	const [menuIsCollapsed, setMenuIsCollapsed] = useState(true);
	const [searchInput, setSearchInput] = useState();
	const [loadedVideoData, setLoadedVideoData] = useState();
	const [trendingVideoDatabase, setTrendingVideoDatabase] = useState();
	const [mainContentDisplay, setMainContentDisplay] = useState();
	const [trendingContentDisplay, setTrendingContentDisplay] = useState();

	const toggleMenuWidth = () => {
		setMenuIsThin((prevState) => !prevState);
		if (menuIsThin) {
			document.documentElement.style.setProperty('--menu-width', '240px');
		} else {
			document.documentElement.style.setProperty('--menu-width', '70px');
		}
	};

	const handleInput = (e) => {
		const { value } = e.target;
		setSearchInput(value);
	};

	const loadVideo = (vidData) => {
		setLoadedVideoData(vidData);
	};

	const collapseMenu = () => {
		setMenuIsCollapsed((prevState) => !prevState);
	};

	useEffect(() => {
		getDocs(collection(getFirestore(), 'mainVideosDatabase'))
			.then((data) => {
				const mainArray = [];
				const allArray = [];
				data.forEach((doc) => {
					allArray.push(doc.data());
				});
				for (let i = 0; i < 24; i++) {
					const used = [];
					let random = Math.trunc(Math.random() * allArray.length);
					while (used.includes(random)) {
						random = Math.trunc(Math.random() * allArray.length);
					}
					used.push(random);
					mainArray.push(allArray[random]);
				}
				createMainDisplayContent(mainArray);
			})
			.then(() => {
				fetch(
					`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=12&key=${myAPIKey}`
				)
					.then((response) => response.json())
					.then((data) => {
						const trendingArray = data.items.map((item) => {
							return {
								videoData: {
									...item,
									id: { videoId: item.id },
								},
							};
						});
						setTrendingVideoDatabase(trendingArray);
						createTrendingDisplayContent(trendingArray);
					});
			});
	}, []);

	const createMainDisplayContent = (database) => {
		const mainPromise = Promise.all(
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
								className='content-card'
								onClick={() =>
									loadVideo({ video, stats, channel })
								}
							>
								<img
									className='card-thumbnail'
									src={
										video.videoData.snippet.thumbnails
											.medium.url
									}
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
												{
													video.videoData.snippet
														.channelTitle
												}
											</h3>
											<span>
												<h4 className='total-views'>
													{countFormatter(
														stats.viewCount,
														1
													)}
												</h4>
												<h4 className='upload-date'>
													{dateFormatter(
														video.videoData.snippet
															.publishedAt
													)}
												</h4>
											</span>
										</div>
									</div>
								</div>
							</Link>
						);
					}
				);
			})
		);
		mainPromise.then((content) => setMainContentDisplay(content));
	};

	const createTrendingDisplayContent = (database) => {
		const trendingPromise = Promise.all(
			database.map(async (video, index) => {
				const videoStats = await getYTVideoStatistics(
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
								className='content-card'
								onClick={() =>
									loadVideo({ video, stats, channel })
								}
							>
								<img
									className='card-thumbnail'
									src={
										video.videoData.snippet.thumbnails
											.medium.url
									}
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
												{
													video.videoData.snippet
														.channelTitle
												}
											</h3>
											<span>
												<h4 className='total-views'>
													{countFormatter(
														stats.viewCount,
														1
													)}
												</h4>
												<h4 className='upload-date'>
													{dateFormatter(
														video.videoData.snippet
															.publishedAt
													)}
												</h4>
											</span>
										</div>
									</div>
								</div>
							</Link>
						);
					}
				);
			})
		);
		trendingPromise.then((content) => setTrendingContentDisplay(content));
	};

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/'>
					<Nav
						hamAction={toggleMenuWidth}
						input={searchInput}
						handle={handleInput}
					/>
					<Menu isThin={menuIsThin} />
					<Content
						content={mainContentDisplay}
						trending={trendingContentDisplay}
					/>
				</Route>
				<Route exact path='/watch=([\w-]{11,})'>
					<Nav
						hamAction={collapseMenu}
						input={searchInput}
						handle={handleInput}
					/>
					<MenuVideo
						isCollapsed={menuIsCollapsed}
						collapse={collapseMenu}
					/>
					<Video
						loadedData={loadedVideoData}
						data={trendingVideoDatabase}
					/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
