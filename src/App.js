import { app } from './firebase';
import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import MenuCollapsing from './components/MenuCollapsing';
import MenuSliding from './components/MenuSliding';
import Main from './components/Main';
import Video from './components/Video';

const App = () => {
	const [menuSetByUser, setMenuSetByUser] = useState(false);
	const [menuIsThin, setMenuIsThin] = useState(false);
	const [menuIsHidden, setMenuIsHidden] = useState(true);
	const [replaceMenu, setReplaceMenu] = useState(false);
	const [loadedVideoData, setLoadedVideoData] = useState();
	const [searchInput, setSearchInput] = useState();

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
		setSearchInput(value);
	};

	const toggleMenuVisibility = () => {
		setMenuIsHidden((prevState) => !prevState);
	};

	const loadVideo = (vidData) => {
		setLoadedVideoData(vidData);
	};

	useEffect(() => {
		const contentsWidth =
			document.getElementById('main-contents').offsetWidth;
		if (contentsWidth <= 1156) {
			document.documentElement.style.setProperty('--menu-width', '72px');
			setReplaceMenu(true);
			setMenuIsThin(true);
		}
	}, []);

	useEffect(() => {
		const contentsWidth = document.getElementById('main-contents');
		const handleMenuResize = () => {
			if (contentsWidth.offsetWidth <= 1156) {
				document.documentElement.style.setProperty(
					'--menu-width',
					'72px'
				);
				setReplaceMenu(true);
				setMenuIsThin(true);
			}
			if (contentsWidth.offsetWidth >= 1325 && !menuSetByUser) {
				document.documentElement.style.setProperty(
					'--menu-width',
					'240px'
				);
				setReplaceMenu(false);
				setMenuIsHidden(true);
				setMenuIsThin(false);
			}
		};

		contentsWidth.addEventListener('resize', handleMenuResize);

		return () =>
			contentsWidth.removeEventListener('resize', handleMenuResize);
	}, [menuIsThin, menuSetByUser]);

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/'>
					<Navbar
						hamAction={
							replaceMenu ? toggleMenuVisibility : toggleMenuWidth
						}
						input={searchInput}
						handle={handleInput}
					/>
					<MenuCollapsing isThin={menuIsThin} />
					<MenuSliding
						isHidden={menuIsHidden}
						toggleVisibility={toggleMenuVisibility}
					/>
					<Main
						isHidden={menuIsHidden}
						toggleVisibility={toggleMenuVisibility}
						loadVideo={loadVideo}
					/>
				</Route>
				<Route exact path='/watch=([\w-]{11,})'>
					<Navbar
						hamAction={toggleMenuVisibility}
						input={searchInput}
						handle={handleInput}
					/>
					<MenuSliding
						isHidden={menuIsHidden}
						toggleVisibility={toggleMenuVisibility}
					/>
					<Video
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
