import { app } from './firebase';
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Menu from './components/Menu';
import MenuVideo from './components/MenuVideo';
import Content from './components/Content';
import Video from './components/Video';

const App = () => {
	const [menuSetByUser, setMenuSetByUser] = useState(false);
	const [menuIsThin, setMenuIsThin] = useState(false);
	const [menuIsCollapsed, setMenuIsCollapsed] = useState(true);
	const [searchInput, setSearchInput] = useState();
	const [loadedVideoData, setLoadedVideoData] = useState();

	const toggleMenuWidth = () => {
		if (menuIsThin) {
			document.documentElement.style.setProperty('--menu-width', '240px');
		} else {
			document.documentElement.style.setProperty('--menu-width', '70px');
		}
		setMenuIsThin((prevState) => !prevState);
		setMenuSetByUser(true);
	};

	useEffect(() => {
		const contentWidth =
			document.getElementById('content-display').offsetWidth;
		if (contentWidth <= 1150) {
			document.documentElement.style.setProperty('--menu-width', '70px');
			setMenuIsThin(true);
		}
	}, []);

	useEffect(() => {
		const handleMenuResize = () => {
			const contentWidth =
				document.getElementById('content-display').offsetWidth;
			if (contentWidth <= 1150 && !menuIsThin) {
				document.documentElement.style.setProperty(
					'--menu-width',
					'70px'
				);
				setMenuIsThin(true);
			}
			if (contentWidth >= 1321 && menuIsThin && !menuSetByUser) {
				document.documentElement.style.setProperty(
					'--menu-width',
					'240px'
				);
				setMenuIsThin(false);
			}
		};

		window.addEventListener('resize', handleMenuResize);

		return () => window.removeEventListener('resize', handleMenuResize);
	}, [menuIsThin]);

	const handleInput = (e) => {
		const { value } = e.target;
		setSearchInput(value);
	};

	const toggleMenuVisibility = () => {
		setMenuIsCollapsed((prevState) => !prevState);
	};

	const loadVideo = (vidData) => {
		setLoadedVideoData(vidData);
	};

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/'>
					<Nav
						toggleWidth={toggleMenuWidth}
						input={searchInput}
						handle={handleInput}
					/>
					<Menu isThin={menuIsThin} />

					<Content loadVideo={loadVideo} />
				</Route>
				<Route exact path='/watch=([\w-]{11,})'>
					<Nav
						toggleVisibility={toggleMenuVisibility}
						input={searchInput}
						handle={handleInput}
					/>
					<MenuVideo
						isCollapsed={menuIsCollapsed}
						toggleVisibility={toggleMenuVisibility}
					/>
					<Video
						isFaded={menuIsCollapsed}
						toggleVisibility={toggleMenuVisibility}
						loadedData={loadedVideoData}
					/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
