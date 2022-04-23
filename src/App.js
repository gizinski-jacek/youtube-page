import { app } from './firebase';
import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import MainPage from './components/MainPage';
import VideoPage from './components/VideoPage';
import searchForVideo from './components/utils/searchForVideo';

const App = () => {
	const [menuSetByUser, setMenuSetByUser] = useState(false);
	const [menuIsThin, setMenuIsThin] = useState(false);
	const [menuIsHidden, setMenuIsHidden] = useState(true);
	const [loadedVideoData, setLoadedVideoData] = useState();
	const [inputValue, setInputValue] = useState('');
	const [searchResults, setSearchResults] = useState();

	const handleQuery = async ({ key, type }) => {
		if (type === 'click' || (type === 'keypress' && key === 'Enter')) {
			setSearchResults(
				await searchForVideo(inputValue, process.env.REACT_APP_API_KEY)
			);
		}
	};

	const toggleMenuWidth = () => {
		if (menuIsThin) {
			document.documentElement.style.setProperty('--menu-width', '240px');
		} else {
			document.documentElement.style.setProperty('--menu-width', '72px');
		}
		setMenuIsThin((prevState) => !prevState);
		setMenuSetByUser((prevState) => !prevState);
	};

	const handleChange = ({ target: { value } }) => {
		setInputValue(value);
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
						inputValue={inputValue}
						handleChange={handleChange}
						handleQuery={handleQuery}
					/>
					<Menu isThin={menuIsThin} />
					<Menu isHidden={menuIsHidden} />
					<MainPage
						setMenuIsThin={setMenuIsThin}
						setMenuIsHidden={setMenuIsHidden}
						menuIsHidden={menuIsHidden}
						menuSetByUser={menuSetByUser}
						toggleVisibility={toggleMenuVisibility}
						loadVideo={loadVideo}
						searchResults={searchResults}
					/>
				</Route>
				<Route exact path='/watch=([\w-]{11,})'>
					<Navbar
						hamAction={toggleMenuVisibility}
						inputValue={inputValue}
						handleChange={handleChange}
						handleQuery={handleQuery}
					/>
					<Menu isHidden={menuIsHidden} />
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
