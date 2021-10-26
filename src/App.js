import { app } from './firebase';
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import MenuCollapsing from './components/MenuCollapsing';
import MenuSliding from './components/MenuSliding';
import MainPage from './components/MainPage';
import VideoPage from './components/VideoPage';

const App = () => {
	const [menuSetByUser, setMenuSetByUser] = useState(false);
	const [menuIsThin, setMenuIsThin] = useState(false);
	const [menuIsHidden, setMenuIsHidden] = useState(true);
	const [replaceMenu, setReplaceMenu] = useState(false);
	const [loadedVideoData, setLoadedVideoData] = useState();
	const [searchValue, setSearchValue] = useState();

	const toggleMenuWidth = () => {
		if (menuIsThin) {
			document.documentElement.style.setProperty('--menu-width', '240px');
		} else {
			document.documentElement.style.setProperty('--menu-width', '72px');
		}
		setMenuIsThin((prevState) => !prevState);
		setMenuSetByUser(true);
	};

	const handleInput = (e) => {
		const { value } = e.target;
		setSearchValue(value);
	};

	const toggleMenuVisibility = () => {
		setMenuIsHidden((prevState) => !prevState);
	};

	const loadVideo = (vidData) => {
		setLoadedVideoData(vidData);
	};

	useEffect(() => {
		const container = document.getElementById('main-contents');
		if (container.offsetWidth <= 1156) {
			document.documentElement.style.setProperty('--menu-width', '72px');
			setReplaceMenu(true);
			setMenuIsThin(true);
		}
	}, []);

	useEffect(() => {
		const container = document.getElementById('main-contents');
		const watchForResize = () => {
			if (container.offsetWidth <= 1156) {
				document.documentElement.style.setProperty(
					'--menu-width',
					'72px'
				);
				setReplaceMenu(true);
				setMenuIsThin(true);
			}
			if (container.offsetWidth >= 1325 && !menuSetByUser) {
				document.documentElement.style.setProperty(
					'--menu-width',
					'240px'
				);
				setReplaceMenu(false);
				setMenuIsHidden(true);
				setMenuIsThin(false);
			}
		};

		container.addEventListener('resize', watchForResize);
		return () => container.removeEventListener('resize', watchForResize);
	}, [menuIsThin, menuSetByUser]);

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/'>
					<Navbar
						hamAction={
							replaceMenu ? toggleMenuVisibility : toggleMenuWidth
						}
						input={searchValue}
						handle={handleInput}
					/>
					<MenuCollapsing isThin={menuIsThin} />
					<MenuSliding
						isHidden={menuIsHidden}
						toggleVisibility={toggleMenuVisibility}
					/>
					<MainPage
						isHidden={menuIsHidden}
						toggleVisibility={toggleMenuVisibility}
						loadVideo={loadVideo}
					/>
				</Route>
				<Route exact path='/watch=([\w-]{11,})'>
					<Navbar
						hamAction={toggleMenuVisibility}
						input={searchValue}
						handle={handleInput}
					/>
					<MenuSliding
						isHidden={menuIsHidden}
						toggleVisibility={toggleMenuVisibility}
					/>
					<VideoPage
						isHidden={menuIsHidden}
						toggleVisibility={toggleMenuVisibility}
						loadedData={loadedVideoData}
					/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
