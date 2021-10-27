import { app } from './firebase';
import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import MenuCollapsing from './components/MenuCollapsing';
import MenuSliding from './components/MenuSliding';
import MainPage from './components/MainPage';
import VideoPage from './components/VideoPage';
import {
	addDoc,
	collection,
	getFirestore,
	serverTimestamp,
} from '@firebase/firestore';

const App = () => {
	const [menuSetByUser, setMenuSetByUser] = useState(false);
	const [menuIsThin, setMenuIsThin] = useState(false);
	const [menuIsHidden, setMenuIsHidden] = useState(true);
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

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/'>
					<Navbar
						hamAction={
							menuIsThin && !menuSetByUser
								? toggleMenuVisibility
								: toggleMenuWidth
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
						setMenuIsThin={setMenuIsThin}
						setMenuIsHidden={setMenuIsHidden}
						menuIsHidden={menuIsHidden}
						menuSetByUser={menuSetByUser}
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
