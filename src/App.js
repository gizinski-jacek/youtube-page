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

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAdnvug1Oyy1XOUxGHVKVGfp55ndCeVd1k',
	authDomain: 'clone-328013.firebaseapp.com',
	projectId: 'youtube-clone-328013',
	storageBucket: 'youtube-clone-328013.appspot.com',
	messagingSenderId: '374259457026',
	appId: '1:374259457026:web:80d5874bc952a461619b1b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const myYTKey = 'AIzaSyD-zyj2Y5Uk1v2ZtpZfeeJXXh-3gFWkBWc';

const App = () => {
	const [menuIsThin, setMenuIsThin] = useState(false);
	const [menuIsCollapsed, setMenuIsCollapsed] = useState(true);
	const [searchInput, setSearchInput] = useState();
	const [loadedVideoData, setLoadedVideoData] = useState();
	const [mainVideoDatabase, setMainVideoDatabase] = useState();
	const [trendingVideoDatabase, setTrendingVideoDatabase] = useState();
	const [mainContentDisplay, setMainContentDisplay] = useState();
	const [trendingContentDisplay, setTrendingContentDisplay] = useState();

	const profile_placeholder =
		'https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fprofile_placeholder.png?alt=media&token=d1bc2f1c-9c82-4f41-b255-1bf9413fa641';

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

	// const queryRandomVideosAndAddToDB = async () => {
	// 	await fetch(
	// 		`https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=relevance&maxResults=50&q=technology%20gadgets%20programming%20computer%20music%20video%20movie%20gaming%20sport&key=${myYTKey}`
	// 		// `https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=relevance&maxResults=50&q=computer%20music%20video%20movie%20gaming%20sport%20technology%20gadgets%20programming&key=${myYTKey}`
	// 	)
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			data.items.forEach((videoData) => {
	// 				addDoc(collection(getFirestore(), 'mainVideosDatabase'), {
	// 					videoData,
	// 					timestamp: serverTimestamp(),
	// 				});
	// 			});
	// 		})
	// 		.catch((error) => {
	// 			console.log('Random video data fetch error: ' + error);
	// 		});
	// };

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
				setMainVideoDatabase(mainArray);
				createMainDisplayContent(mainArray);
			})
			.then(() => {
				fetch(
					`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=12&key=${myYTKey}`
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

	const getVideoStats = (vidId) => {
		return fetch(
			`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${vidId}&key=${myYTKey}`
		)
			.then((response) => response.json())
			.then((data) => data.items[0].statistics)
			.catch((error) => {
				console.log('Video stats fetch error: ' + error);
			});
	};

	const getChannelData = (chanId) => {
		return fetch(
			`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${chanId}&key=${myYTKey}`
		)
			.then((response) => response.json())
			.then((data) => data.items[0].snippet)
			.catch((error) => {
				console.log('Channel data fetch error: ' + error);
			});
	};

	const createMainDisplayContent = (database) => {
		const mainPromise = Promise.all(
			database.map(async (video, index) => {
				const videoStats = await getVideoStats(
					// Sometimes throws undefined error, need to find out why.
					video.videoData.id.videoId
				);
				const channelData = await getChannelData(
					video.videoData.snippet.channelId
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
										src={channel.thumbnails.default.url}
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
				const videoStats = await getVideoStats(
					video.videoData.id.videoId
				);
				const channelData = await getChannelData(
					video.videoData.snippet.channelId
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
										src={channel.thumbnails.default.url}
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
