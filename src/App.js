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
	};

	useEffect(() => {
		if (document.getElementById('content-display').offsetWidth <= 1140) {
			document.documentElement.style.setProperty('--menu-width', '70px');
			setMenuIsThin(true);
		}
		window.addEventListener('resize', () => {
			console.log(document.getElementById('content-display').offsetWidth);
			if (
				document.getElementById('content-display').offsetWidth <=
					1140 &&
				!menuIsThin
			) {
				document.documentElement.style.setProperty(
					'--menu-width',
					'70px'
				);
				setMenuIsThin(true);
			}
			if (
				document.getElementById('content-display').offsetWidth >=
					1320 &&
				menuIsThin
			) {
				document.documentElement.style.setProperty(
					'--menu-width',
					'240px'
				);
				setMenuIsThin(false);
			}
		});

		return () => window.removeEventListener('resize');
	}, []);

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
						hamAction={toggleMenuWidth}
						input={searchInput}
						handle={handleInput}
					/>
					<Menu isThin={menuIsThin} />

					<Content loadVideo={loadVideo} />
				</Route>
				<Route exact path='/watch=([\w-]{11,})'>
					<Nav
						hamAction={toggleMenuVisibility}
						input={searchInput}
						handle={handleInput}
					/>
					<MenuVideo
						isCollapsed={menuIsCollapsed}
						toggleMenu={toggleMenuVisibility}
					/>
					<Video
						isFaded={menuIsCollapsed}
						toggleMenu={toggleMenuVisibility}
						loadedData={loadedVideoData}
					/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
