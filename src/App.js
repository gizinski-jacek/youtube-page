import { app, myAPIKey } from './firebase';
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
import getRandomVideosFromFirestore from './components/utils/getRandomVideosFromFirestore';
import getYTTrendingVideos from './components/utils/getYTTrendingVideos';
import getYTVideoStatistics from './components/utils/getYTVideoStatistics';
import getYTChannelData from './components/utils/getYTChannelData';
import ContentCardWrapper from './components/utils/ContentCardWrapper';

const App = () => {
	const [menuIsThin, setMenuIsThin] = useState(false);
	const [menuIsCollapsed, setMenuIsCollapsed] = useState(true);
	const [searchInput, setSearchInput] = useState();
	const [loadedVideoData, setLoadedVideoData] = useState();
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

	const collapseMenu = () => {
		setMenuIsCollapsed((prevState) => !prevState);
	};

	const loadVideo = (vidData) => {
		setLoadedVideoData(vidData);
	};

	useEffect(() => {
		getRandomVideosFromFirestore(24)
			.then((randomData) => {
				createMainDisplayContent(randomData);
			})
			.then(async () => {
				const trending = await getYTTrendingVideos(12, myAPIKey);
				createTrendingDisplayContent(trending);
			});
	}, []);

	const createMainDisplayContent = (data) => {
		const mainPromise = Promise.all(
			data.map(async (video, index) => {
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
							<ContentCardWrapper
								video={video}
								index={index}
								loadVideo={loadVideo}
								stats={stats}
								channel={channel}
							/>
						);
					}
				);
			})
		);
		mainPromise.then((content) => setMainContentDisplay(content));
	};

	const createTrendingDisplayContent = (data) => {
		const trendingPromise = Promise.all(
			data.map(async (video, index) => {
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
							<ContentCardWrapper
								video={video}
								index={index}
								loadVideo={loadVideo}
								stats={stats}
								channel={channel}
							/>
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
					<Video loadedData={loadedVideoData} />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
