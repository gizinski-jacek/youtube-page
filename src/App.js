import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Menu from './components/Menu';
import MenuVideo from './components/MenuVideo';
import Content from './components/Content';
import Video from './components/Video';
import videos from './components/data/videos';
import trending from './components/data/trending';

const App = () => {
	const [menuIsThin, setMenuIsThin] = useState(false);
	const [menuIsCollapsed, setMenuIsCollapsed] = useState(false);
	const [videoData, setVideoData] = useState();
	const [searchInput, setSearchInput] = useState();
	const [loadedVideo, setLoadedVideo] = useState();

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
		setMenuIsCollapsed(true);
		setLoadedVideo(vidData);
	};

	const collapseMenu = () => {
		setMenuIsCollapsed((prevState) => !prevState);
	};

	const contentDisplay = videos.map((vid, index) => {
		return (
			<Link
				to={`/v=${vid.id}`}
				key={index}
				className='content-card'
				onClick={() => loadVideo(vid)}
			>
				<img
					className='card-thumbnail'
					src={`https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`}
					alt='Video thumbnail'
				/>
				<div className='card-details'>
					<img
						className='channel-picture'
						src={'/images/profile_placeholder.png'}
						alt=''
					/>
					<div className='metadata'>
						<h3 className='video-title'>title</h3>
						<div>
							<h3 className='channel-name'>channel-name</h3>
							<span>
								<h3 className='total-views'>total-views</h3>
								<h3 className='upload-date'>upload-date</h3>
							</span>
						</div>
					</div>
				</div>
			</Link>
		);
	});

	const trendingContentDisplay = trending.map((vid, index) => {
		return (
			<Link
				to={`/v=${vid.id}`}
				key={index}
				className='content-card'
				onClick={() => loadVideo(vid)}
			>
				<img
					className='card-thumbnail'
					src={`https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`}
					alt='Video thumbnail'
				/>
				<div className='card-details'>
					<img
						className='channel-picture'
						src={'/images/profile_placeholder.png'}
						alt=''
					/>
					<div className='metadata'>
						<h3 className='video-title'>
							title title title title title title title title
						</h3>
						<div>
							<span className='channel-name'>channel-name</span>
							<span>
								<span className='total-views'>total-views</span>
								<span className='upload-date'>upload-date</span>
							</span>
						</div>
					</div>
				</div>
			</Link>
		);
	});

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
						content={contentDisplay}
						trending={trendingContentDisplay}
					/>
				</Route>
				<Route exact path='/v=([\w-]{11,})'>
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
						data={loadedVideo}
						related={videos}
						link={loadVideo}
					/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
