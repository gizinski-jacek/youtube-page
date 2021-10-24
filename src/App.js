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
		const contentWidth =
			document.getElementById('content-display').offsetWidth;
		if (contentWidth <= 1156) {
			document.documentElement.style.setProperty('--menu-width', '72px');
			setReplaceMenu(true);
			setMenuIsThin(true);
		}
	}, []);

	useEffect(() => {
		const contentWidth = document.getElementById('content-display');
		const handleMenuResize = () => {
			if (contentWidth.offsetWidth <= 1156) {
				document.documentElement.style.setProperty(
					'--menu-width',
					'72px'
				);
				setReplaceMenu(true);
				setMenuIsThin(true);
			}
			if (contentWidth.offsetWidth >= 1325 && !menuSetByUser) {
				document.documentElement.style.setProperty(
					'--menu-width',
					'240px'
				);
				setReplaceMenu(false);
				setMenuIsHidden(true);
				setMenuIsThin(false);
			}
		};

		contentWidth.addEventListener('resize', handleMenuResize);

		return () =>
			contentWidth.removeEventListener('resize', handleMenuResize);
	}, [menuIsThin, menuSetByUser]);

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/'>
					<Nav
						hamAction={
							replaceMenu ? toggleMenuVisibility : toggleMenuWidth
						}
						input={searchInput}
						handle={handleInput}
					/>
					<Menu isThin={menuIsThin} />
					<MenuVideo
						isHidden={menuIsHidden}
						toggleVisibility={toggleMenuVisibility}
					/>
					<Content
						isHidden={menuIsHidden}
						toggleVisibility={toggleMenuVisibility}
						loadVideo={loadVideo}
					/>
				</Route>
				<Route exact path='/watch=([\w-]{11,})'>
					<Nav
						hamAction={toggleMenuVisibility}
						input={searchInput}
						handle={handleInput}
					/>
					<MenuVideo
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
