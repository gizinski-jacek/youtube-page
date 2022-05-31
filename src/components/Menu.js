import { NavLink } from 'react-router-dom';
import Footer from './Footer';
import SignInBtn from './reusables/SignInBtn';

const Menu = ({ isThin, isHidden }) => {
	return (
		<div
			id={isHidden === undefined ? 'menu-collapsing' : 'menu-sliding'}
			className={`${isThin ? 'is-thin' : ''}${isHidden ? 'is-hidden' : ''}`}
		>
			<div className='section'>
				<ul>
					<NavLink exact to='/' activeClassName='active'>
						<li>
							<svg focusable='false' viewBox='0 0 24 24'>
								<path d='M12,4.33l7,6.12V20H15V14H9v6H5V10.45l7-6.12M12,3,4,10V21h6V15h4v6h6V10L12,3Z'></path>
							</svg>
							<h2>Home</h2>
						</li>
					</NavLink>
					<li>
						<svg focusable='false' viewBox='0 0 24 24'>
							<path d='M9.8,9.8l-3.83,8.23l8.23-3.83l3.83-8.23L9.8,9.8z M13.08,12.77c-0.21,0.29-0.51,0.48-0.86,0.54 c-0.07,0.01-0.15,0.02-0.22,0.02c-0.28,0-0.54-0.08-0.77-0.25c-0.29-0.21-0.48-0.51-0.54-0.86c-0.06-0.35,0.02-0.71,0.23-0.99 c0.21-0.29,0.51-0.48,0.86-0.54c0.35-0.06,0.7,0.02,0.99,0.23c0.29,0.21,0.48,0.51,0.54,0.86C13.37,12.13,13.29,12.48,13.08,12.77z M12,3c4.96,0,9,4.04,9,9s-4.04,9-9,9s-9-4.04-9-9S7.04,3,12,3 M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2 L12,2z'></path>
						</svg>
						<h2>Explore</h2>
					</li>
					<li>
						<svg focusable='false' viewBox='0 0 24 24'>
							<path d='M10,18v-6l5,3L10,18z M17,3H7v1h10V3z M20,6H4v1h16V6z M22,9H2v12h20V9z M3,10h18v10H3V10z'></path>
						</svg>
						<h2>Subscriptions</h2>
					</li>
				</ul>
			</div>
			<div className='section'>
				<ul>
					<li>
						<svg focusable='false' viewBox='0 0 24 24'>
							<path d='M11,7l6,3.5L11,14V7L11,7z M18,20H4V6H3v15h15V20z M21,18H6V3h15V18z M7,17h13V4H7V17z'></path>
						</svg>
						<h2>Library</h2>
					</li>
					<li>
						<svg focusable='false' viewBox='0 0 24 24'>
							<path d='M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M22,12c0,5.51-4.49,10-10,10S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,6.86C5.22,3.86,8.51,2,12,2C17.51,2,22,6.49,22,12z'></path>
						</svg>
						<h2>History</h2>
					</li>
				</ul>
			</div>
			<div className='subscriptions'>
				<h2>Sign in to like videos, comment and subscribe.</h2>
				<SignInBtn />
			</div>
			<div className='best-of-yt'>
				<h2 className='section-title'>Best of YouTube</h2>
				<ul>
					<li>
						<img src='./images/channels-music.jpg' alt='Music icon' />
						<h2>Music</h2>
					</li>
					<li>
						<img src='./images/channels-sport.jpg' alt='Sport icon' />
						<h2>Sport</h2>
					</li>
					<li>
						<img src='./images/channels-gaming.jpg' alt='Gaming icon' />
						<h2>Gaming</h2>
					</li>
					<li>
						<img src='./images/channels-movies.jpg' alt='Movies icon' />
						<h2>Movies</h2>
					</li>
					<li>
						<img src='./images/channels-news.jpg' alt='News icon' />
						<h2>News</h2>
					</li>
					<li>
						<img src='./images/channels-live.jpg' alt='Live icon' />
						<h2>Live</h2>
					</li>
					<li>
						<img src='./images/channels-360-videos.jpg' alt='360 video icon' />
						<h2>360&#176; Video</h2>
					</li>
				</ul>
			</div>
			<div className='browse-channels'>
				<div>
					<svg focusable='false' viewBox='0 0 24 24'>
						<path d='M17,13h-4v4h-2v-4H7v-2h4V7h2v4h4V13z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9c4.96,0,9-4.04,9-9S16.96,3,12,3 M12,2 c5.52,0,10,4.48,10,10s-4.48,10-10,10C6.48,22,2,17.52,2,12S6.48,2,12,2L12,2z'></path>
					</svg>
					Browse channels
				</div>
			</div>
			<div className='more-from-yt'>
				<h2 className='section-title'>More from YouTube</h2>
				<ul>
					<li>
						<svg focusable='false' viewBox='0 0 24 24'>
							<path d='M10,9.35,15,12l-5,2.65ZM12,6a54.36,54.36,0,0,0-7.56.38A1.53,1.53,0,0,0,3.38,7.44,24.63,24.63,0,0,0,3,12a24.63,24.63,0,0,0,.38,4.56,1.53,1.53,0,0,0,1.06,1.06A54.36,54.36,0,0,0,12,18a54.36,54.36,0,0,0,7.56-.38,1.53,1.53,0,0,0,1.06-1.06A24.63,24.63,0,0,0,21,12a24.63,24.63,0,0,0-.38-4.56,1.53,1.53,0,0,0-1.06-1.06A54.36,54.36,0,0,0,12,6h0m0-1s6.25,0,7.81.42a2.51,2.51,0,0,1,1.77,1.77A25.87,25.87,0,0,1,22,12a25.87,25.87,0,0,1-.42,4.81,2.51,2.51,0,0,1-1.77,1.77C18.25,19,12,19,12,19s-6.25,0-7.81-.42a2.51,2.51,0,0,1-1.77-1.77A25.87,25.87,0,0,1,2,12a25.87,25.87,0,0,1,.42-4.81A2.51,2.51,0,0,1,4.19,5.42C5.75,5,12,5,12,5Z'></path>
						</svg>
						<h2>YouTube Premium</h2>
					</li>
					<li>
						<svg focusable='false' viewBox='0 0 24 24'>
							<path d='M14,12c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2S14,10.9,14,12z M8.48,8.45L7.77,7.75C6.68,8.83,6,10.34,6,12 s0.68,3.17,1.77,4.25l0.71-0.71C7.57,14.64,7,13.39,7,12S7.57,9.36,8.48,8.45z M16.23,7.75l-0.71,0.71C16.43,9.36,17,10.61,17,12 s-0.57,2.64-1.48,3.55l0.71,0.71C17.32,15.17,18,13.66,18,12S17.32,8.83,16.23,7.75z M5.65,5.63L4.95,4.92C3.13,6.73,2,9.24,2,12 s1.13,5.27,2.95,7.08l0.71-0.71C4.02,16.74,3,14.49,3,12S4.02,7.26,5.65,5.63z M19.05,4.92l-0.71,0.71C19.98,7.26,21,9.51,21,12 s-1.02,4.74-2.65,6.37l0.71,0.71C20.87,17.27,22,14.76,22,12S20.87,6.73,19.05,4.92z'></path>
						</svg>
						<h2>Live</h2>
					</li>
				</ul>
				<ul>
					<li>
						<svg focusable='false' viewBox='0 0 24 24'>
							<path d='M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,8c-2.21,0-4,1.79-4,4s1.79,4,4,4s4-1.79,4-4 S14.21,8,12,8L12,8z M13.22,3l0.55,2.2l0.13,0.51l0.5,0.18c0.61,0.23,1.19,0.56,1.72,0.98l0.4,0.32l0.5-0.14l2.17-0.62l1.22,2.11 l-1.63,1.59l-0.37,0.36l0.08,0.51c0.05,0.32,0.08,0.64,0.08,0.98s-0.03,0.66-0.08,0.98l-0.08,0.51l0.37,0.36l1.63,1.59l-1.22,2.11 l-2.17-0.62l-0.5-0.14l-0.4,0.32c-0.53,0.43-1.11,0.76-1.72,0.98l-0.5,0.18l-0.13,0.51L13.22,21h-2.44l-0.55-2.2l-0.13-0.51 l-0.5-0.18C9,17.88,8.42,17.55,7.88,17.12l-0.4-0.32l-0.5,0.14l-2.17,0.62L3.6,15.44l1.63-1.59l0.37-0.36l-0.08-0.51 C5.47,12.66,5.44,12.33,5.44,12s0.03-0.66,0.08-0.98l0.08-0.51l-0.37-0.36L3.6,8.56l1.22-2.11l2.17,0.62l0.5,0.14l0.4-0.32 C8.42,6.45,9,6.12,9.61,5.9l0.5-0.18l0.13-0.51L10.78,3H13.22 M14,2h-4L9.26,4.96c-0.73,0.27-1.4,0.66-2,1.14L4.34,5.27l-2,3.46 l2.19,2.13C4.47,11.23,4.44,11.61,4.44,12s0.03,0.77,0.09,1.14l-2.19,2.13l2,3.46l2.92-0.83c0.6,0.48,1.27,0.87,2,1.14L10,22h4 l0.74-2.96c0.73-0.27,1.4-0.66,2-1.14l2.92,0.83l2-3.46l-2.19-2.13c0.06-0.37,0.09-0.75,0.09-1.14s-0.03-0.77-0.09-1.14l2.19-2.13 l-2-3.46L16.74,6.1c-0.6-0.48-1.27-0.87-2-1.14L14,2L14,2z'></path>
						</svg>
						<h2>Settings</h2>
					</li>
					<li>
						<svg focusable='false' viewBox='0 0 24 24'>
							<path d='M13.18,4l0.24,1.2L13.58,6h0.82H19v7h-5.18l-0.24-1.2L13.42,11H12.6H6V4H13.18 M14,3H5v18h1v-9h6.6l0.4,2h7V5h-5.6L14,3 L14,3z'></path>
						</svg>
						<h2>Report history</h2>
					</li>
					<li>
						<svg focusable='false' viewBox='0 0 24 24'>
							<path d='M15.36,9.96c0,1.09-0.67,1.67-1.31,2.24c-0.53,0.47-1.03,0.9-1.16,1.6L12.85,14h-1.75l0.03-0.28 c0.14-1.17,0.8-1.76,1.47-2.27c0.52-0.4,1.01-0.77,1.01-1.49c0-0.51-0.23-0.97-0.63-1.29c-0.4-0.31-0.92-0.42-1.42-0.29 c-0.59,0.15-1.05,0.67-1.19,1.34L10.32,10H8.57l0.06-0.42c0.2-1.4,1.15-2.53,2.42-2.87c1.05-0.29,2.14-0.08,2.98,0.57 C14.88,7.92,15.36,8.9,15.36,9.96z M12,18c0.55,0,1-0.45,1-1s-0.45-1-1-1s-1,0.45-1,1S11.45,18,12,18z M12,3c-4.96,0-9,4.04-9,9 s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z'></path>
						</svg>
						<h2>Help</h2>
					</li>
					<li>
						<svg focusable='false' viewBox='0 0 24 24'>
							<path d='M13,14h-2v-2h2V14z M13,5h-2v6h2V5z M19,3H5v16.59l3.29-3.29L8.59,16H9h10V3 M20,2v15H9l-5,5V2H20L20,2z'></path>
						</svg>
						<h2>Send feedback</h2>
					</li>
				</ul>
			</div>
			<section className='footer'>
				<div>
					<div>About</div>
					<div>Press</div>
					<div>Copyright</div>
					<div>Contact us</div>
					<div>Creator</div>
					<div>Advertise</div>
					<div>Developers</div>
				</div>
				<div>
					<div>Terms</div>
					<div>Privacy</div>
					<div>{'Policy & Safety'}</div>
					<div>How YouTube works</div>
					<div>Test new features</div>
				</div>
				<div className='llc'>
					<div>&#169; 2021 Google LLC</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Menu;
