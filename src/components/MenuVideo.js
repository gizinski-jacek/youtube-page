import { Link, NavLink } from 'react-router-dom';
import SignInBtn from './utils/SignInBtn';

const MenuVideo = ({ isCollapsed, collapse }) => {
	return (
		<>
			<div className={`menu-top ${isCollapsed ? 'isCollapsed' : ''}`}>
				<div className='ham-menu' onClick={collapse}>
					<svg focusable='false'>
						<path d='M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z'></path>
					</svg>
				</div>
				<div className='yt-logo'>
					<Link to='/'>
						<svg focusable='false'>
							<path
								d='M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z'
								fill='red'
							></path>
							<path
								d='M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z'
								fill='white'
							></path>
							<path d='M34.6024 13.0036L31.3945 1.41846H34.1932L35.3174 6.6701C35.6043 7.96361 35.8136 9.06662 35.95 9.97913H36.0323C36.1264 9.32532 36.3381 8.22937 36.665 6.68892L37.8291 1.41846H40.6278L37.3799 13.0036V18.561H34.6001V13.0036H34.6024Z'></path>
							<path d='M41.4697 18.1937C40.9053 17.8127 40.5031 17.22 40.2632 16.4157C40.0257 15.6114 39.9058 14.5437 39.9058 13.2078V11.3898C39.9058 10.0422 40.0422 8.95805 40.315 8.14196C40.5878 7.32588 41.0135 6.72851 41.592 6.35457C42.1706 5.98063 42.9302 5.79248 43.871 5.79248C44.7976 5.79248 45.5384 5.98298 46.0981 6.36398C46.6555 6.74497 47.0647 7.34234 47.3234 8.15137C47.5821 8.96275 47.7115 10.0422 47.7115 11.3898V13.2078C47.7115 14.5437 47.5845 15.6161 47.3329 16.4251C47.0812 17.2365 46.672 17.8292 46.1075 18.2031C45.5431 18.5771 44.7764 18.7652 43.8098 18.7652C42.8126 18.7675 42.0342 18.5747 41.4697 18.1937ZM44.6353 16.2323C44.7905 15.8231 44.8705 15.1575 44.8705 14.2309V10.3292C44.8705 9.43077 44.7929 8.77225 44.6353 8.35833C44.4777 7.94206 44.2026 7.7351 43.8074 7.7351C43.4265 7.7351 43.156 7.94206 43.0008 8.35833C42.8432 8.77461 42.7656 9.43077 42.7656 10.3292V14.2309C42.7656 15.1575 42.8408 15.8254 42.9914 16.2323C43.1419 16.6415 43.4123 16.8461 43.8074 16.8461C44.2026 16.8461 44.4777 16.6415 44.6353 16.2323Z'></path>
							<path d='M56.8154 18.5634H54.6094L54.3648 17.03H54.3037C53.7039 18.1871 52.8055 18.7656 51.6061 18.7656C50.7759 18.7656 50.1621 18.4928 49.767 17.9496C49.3719 17.4039 49.1743 16.5526 49.1743 15.3955V6.03751H51.9942V15.2308C51.9942 15.7906 52.0553 16.188 52.1776 16.4256C52.2999 16.6631 52.5045 16.783 52.7914 16.783C53.036 16.783 53.2712 16.7078 53.497 16.5573C53.7228 16.4067 53.8874 16.2162 53.9979 15.9858V6.03516H56.8154V18.5634Z'></path>
							<path d='M64.4755 3.68758H61.6768V18.5629H58.9181V3.68758H56.1194V1.42041H64.4755V3.68758Z'></path>
							<path d='M71.2768 18.5634H69.0708L68.8262 17.03H68.7651C68.1654 18.1871 67.267 18.7656 66.0675 18.7656C65.2373 18.7656 64.6235 18.4928 64.2284 17.9496C63.8333 17.4039 63.6357 16.5526 63.6357 15.3955V6.03751H66.4556V15.2308C66.4556 15.7906 66.5167 16.188 66.639 16.4256C66.7613 16.6631 66.9659 16.783 67.2529 16.783C67.4974 16.783 67.7326 16.7078 67.9584 16.5573C68.1842 16.4067 68.3488 16.2162 68.4593 15.9858V6.03516H71.2768V18.5634Z'></path>
							<path d='M80.609 8.0387C80.4373 7.24849 80.1621 6.67699 79.7812 6.32186C79.4002 5.96674 78.8757 5.79035 78.2078 5.79035C77.6904 5.79035 77.2059 5.93616 76.7567 6.23014C76.3075 6.52412 75.9594 6.90747 75.7148 7.38489H75.6937V0.785645H72.9773V18.5608H75.3056L75.5925 17.3755H75.6537C75.8724 17.7988 76.1993 18.1304 76.6344 18.3774C77.0695 18.622 77.554 18.7443 78.0855 18.7443C79.038 18.7443 79.7412 18.3045 80.1904 17.4272C80.6396 16.5476 80.8653 15.1765 80.8653 13.3092V11.3266C80.8653 9.92722 80.7783 8.82892 80.609 8.0387ZM78.0243 13.1492C78.0243 14.0617 77.9867 14.7767 77.9114 15.2941C77.8362 15.8115 77.7115 16.1808 77.5328 16.3971C77.3564 16.6158 77.1165 16.724 76.8178 16.724C76.585 16.724 76.371 16.6699 76.1734 16.5594C75.9759 16.4512 75.816 16.2866 75.6937 16.0702V8.96062C75.7877 8.6196 75.9524 8.34209 76.1852 8.12337C76.4157 7.90465 76.6697 7.79646 76.9401 7.79646C77.2271 7.79646 77.4481 7.90935 77.6034 8.13278C77.7609 8.35855 77.8691 8.73485 77.9303 9.26636C77.9914 9.79787 78.022 10.5528 78.022 11.5335V13.1492H78.0243Z'></path>
							<path d='M84.8657 13.8712C84.8657 14.6755 84.8892 15.2776 84.9363 15.6798C84.9833 16.0819 85.0821 16.3736 85.2326 16.5594C85.3831 16.7428 85.6136 16.8345 85.9264 16.8345C86.3474 16.8345 86.639 16.6699 86.7942 16.343C86.9518 16.0161 87.0365 15.4705 87.0506 14.7085L89.4824 14.8519C89.4965 14.9601 89.5035 15.1106 89.5035 15.3011C89.5035 16.4582 89.186 17.3237 88.5534 17.8952C87.9208 18.4667 87.0247 18.7536 85.8676 18.7536C84.4777 18.7536 83.504 18.3185 82.9466 17.446C82.3869 16.5735 82.1094 15.2259 82.1094 13.4008V11.2136C82.1094 9.33452 82.3987 7.96105 82.9772 7.09558C83.5558 6.2301 84.5459 5.79736 85.9499 5.79736C86.9165 5.79736 87.6597 5.97375 88.1771 6.32888C88.6945 6.684 89.059 7.23433 89.2707 7.98457C89.4824 8.7348 89.5882 9.76961 89.5882 11.0913V13.2362H84.8657V13.8712ZM85.2232 7.96811C85.0797 8.14449 84.9857 8.43377 84.9363 8.83593C84.8892 9.2381 84.8657 9.84722 84.8657 10.6657V11.5641H86.9283V10.6657C86.9283 9.86133 86.9001 9.25221 86.846 8.83593C86.7919 8.41966 86.6931 8.12803 86.5496 7.95635C86.4062 7.78702 86.1851 7.7 85.8864 7.7C85.5854 7.70235 85.3643 7.79172 85.2232 7.96811Z'></path>
						</svg>
						<span id='country-code'>PL</span>
					</Link>
				</div>
			</div>
			<div id='menu-video' className={isCollapsed ? 'isCollapsed' : ''}>
				<div className='section'>
					<ul>
						<NavLink exact to='/' activeClassName='active'>
							<li>
								<svg focusable='false'>
									<path d='M12,4.33l7,6.12V20H15V14H9v6H5V10.45l7-6.12M12,3,4,10V21h6V15h4v6h6V10L12,3Z'></path>
								</svg>
								<h3>Home</h3>
							</li>
						</NavLink>
						<li>
							<svg focusable='false'>
								<path d='M9.8,9.8l-3.83,8.23l8.23-3.83l3.83-8.23L9.8,9.8z M13.08,12.77c-0.21,0.29-0.51,0.48-0.86,0.54 c-0.07,0.01-0.15,0.02-0.22,0.02c-0.28,0-0.54-0.08-0.77-0.25c-0.29-0.21-0.48-0.51-0.54-0.86c-0.06-0.35,0.02-0.71,0.23-0.99 c0.21-0.29,0.51-0.48,0.86-0.54c0.35-0.06,0.7,0.02,0.99,0.23c0.29,0.21,0.48,0.51,0.54,0.86C13.37,12.13,13.29,12.48,13.08,12.77z M12,3c4.96,0,9,4.04,9,9s-4.04,9-9,9s-9-4.04-9-9S7.04,3,12,3 M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2 L12,2z'></path>
							</svg>
							<h3>Explore</h3>
						</li>
						<li>
							<svg focusable='false'>
								<path d='M10,18v-6l5,3L10,18z M17,3H7v1h10V3z M20,6H4v1h16V6z M22,9H2v12h20V9z M3,10h18v10H3V10z'></path>
							</svg>
							<h3>Subscriptions</h3>
						</li>
					</ul>
				</div>
				<div className='section'>
					<ul>
						<li>
							<svg focusable='false'>
								<path d='M11,7l6,3.5L11,14V7L11,7z M18,20H4V6H3v15h15V20z M21,18H6V3h15V18z M7,17h13V4H7V17z'></path>
							</svg>
							Library
						</li>
						<li>
							<svg focusable='false'>
								<path d='M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M22,12c0,5.51-4.49,10-10,10S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,6.86C5.22,3.86,8.51,2,12,2C17.51,2,22,6.49,22,12z'></path>
							</svg>
							History
						</li>
					</ul>
				</div>
				<div className='subscriptions'>
					<h3>Sign in to like videos, comment and subscribe.</h3>
					<SignInBtn />
				</div>
				<div className='best-of-yt'>
					<h3 className='section-title'>Best of YouTube</h3>
					<ul>
						<li>
							<img
								alt=''
								src='https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fchannels-music.jpg?alt=media&token=7beb340a-11df-4582-95be-2d00cc0d5b54'
							/>
							<h3>Music</h3>
						</li>
						<li>
							<img
								alt=''
								src='https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fchannels-sport.jpg?alt=media&token=a990479b-1b03-4c31-b2a8-e7309211f3ba'
							/>
							<h3>Sport</h3>
						</li>
						<li>
							<img
								alt=''
								src='https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fchannels-360-videos.jpg?alt=media&token=8c1f9e6f-ae8d-422f-81de-e1c103575876'
							/>
							<h3>Gaming</h3>
						</li>
						<li>
							<img
								alt=''
								src='https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fchannels-movies.jpg?alt=media&token=6745bc3b-33e5-44c6-9826-9c39be61d134'
							/>
							<h3>Movies</h3>
						</li>
						<li>
							<img
								alt=''
								src='https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fchannels-news.jpg?alt=media&token=0661b49f-1428-4464-bbf2-69caa89548a4'
							/>
							<h3>News</h3>
						</li>
						<li>
							<img
								alt=''
								src='https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fchannels-live.jpg?alt=media&token=618c7c03-f4a4-472b-85c5-e40016ca5167'
							/>
							<h3>Live</h3>
						</li>
						<li>
							<img
								alt=''
								src='https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fchannels-360-videos.jpg?alt=media&token=8c1f9e6f-ae8d-422f-81de-e1c103575876'
							/>
							<h3>360&#176; Video</h3>
						</li>
					</ul>
				</div>
				<div className='browse-channels'>
					<svg focusable='false'>
						<path d='M17,13h-4v4h-2v-4H7v-2h4V7h2v4h4V13z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9c4.96,0,9-4.04,9-9S16.96,3,12,3 M12,2 c5.52,0,10,4.48,10,10s-4.48,10-10,10C6.48,22,2,17.52,2,12S6.48,2,12,2L12,2z'></path>
					</svg>
					Browse channels
				</div>
				<div className='more-from-yt'>
					<h3 className='section-title'>More from YouTube</h3>
					<ul>
						<li>
							<svg focusable='false'>
								<path d='M10,9.35,15,12l-5,2.65ZM12,6a54.36,54.36,0,0,0-7.56.38A1.53,1.53,0,0,0,3.38,7.44,24.63,24.63,0,0,0,3,12a24.63,24.63,0,0,0,.38,4.56,1.53,1.53,0,0,0,1.06,1.06A54.36,54.36,0,0,0,12,18a54.36,54.36,0,0,0,7.56-.38,1.53,1.53,0,0,0,1.06-1.06A24.63,24.63,0,0,0,21,12a24.63,24.63,0,0,0-.38-4.56,1.53,1.53,0,0,0-1.06-1.06A54.36,54.36,0,0,0,12,6h0m0-1s6.25,0,7.81.42a2.51,2.51,0,0,1,1.77,1.77A25.87,25.87,0,0,1,22,12a25.87,25.87,0,0,1-.42,4.81,2.51,2.51,0,0,1-1.77,1.77C18.25,19,12,19,12,19s-6.25,0-7.81-.42a2.51,2.51,0,0,1-1.77-1.77A25.87,25.87,0,0,1,2,12a25.87,25.87,0,0,1,.42-4.81A2.51,2.51,0,0,1,4.19,5.42C5.75,5,12,5,12,5Z'></path>
							</svg>
							<h3>YouTube Premium</h3>
						</li>
						<li>
							<svg focusable='false'>
								<path d='M14,12c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2S14,10.9,14,12z M8.48,8.45L7.77,7.75C6.68,8.83,6,10.34,6,12 s0.68,3.17,1.77,4.25l0.71-0.71C7.57,14.64,7,13.39,7,12S7.57,9.36,8.48,8.45z M16.23,7.75l-0.71,0.71C16.43,9.36,17,10.61,17,12 s-0.57,2.64-1.48,3.55l0.71,0.71C17.32,15.17,18,13.66,18,12S17.32,8.83,16.23,7.75z M5.65,5.63L4.95,4.92C3.13,6.73,2,9.24,2,12 s1.13,5.27,2.95,7.08l0.71-0.71C4.02,16.74,3,14.49,3,12S4.02,7.26,5.65,5.63z M19.05,4.92l-0.71,0.71C19.98,7.26,21,9.51,21,12 s-1.02,4.74-2.65,6.37l0.71,0.71C20.87,17.27,22,14.76,22,12S20.87,6.73,19.05,4.92z'></path>
							</svg>
							<h3>Live</h3>
						</li>
					</ul>
					<ul>
						<li>
							<svg focusable='false'>
								<path d='M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,8c-2.21,0-4,1.79-4,4s1.79,4,4,4s4-1.79,4-4 S14.21,8,12,8L12,8z M13.22,3l0.55,2.2l0.13,0.51l0.5,0.18c0.61,0.23,1.19,0.56,1.72,0.98l0.4,0.32l0.5-0.14l2.17-0.62l1.22,2.11 l-1.63,1.59l-0.37,0.36l0.08,0.51c0.05,0.32,0.08,0.64,0.08,0.98s-0.03,0.66-0.08,0.98l-0.08,0.51l0.37,0.36l1.63,1.59l-1.22,2.11 l-2.17-0.62l-0.5-0.14l-0.4,0.32c-0.53,0.43-1.11,0.76-1.72,0.98l-0.5,0.18l-0.13,0.51L13.22,21h-2.44l-0.55-2.2l-0.13-0.51 l-0.5-0.18C9,17.88,8.42,17.55,7.88,17.12l-0.4-0.32l-0.5,0.14l-2.17,0.62L3.6,15.44l1.63-1.59l0.37-0.36l-0.08-0.51 C5.47,12.66,5.44,12.33,5.44,12s0.03-0.66,0.08-0.98l0.08-0.51l-0.37-0.36L3.6,8.56l1.22-2.11l2.17,0.62l0.5,0.14l0.4-0.32 C8.42,6.45,9,6.12,9.61,5.9l0.5-0.18l0.13-0.51L10.78,3H13.22 M14,2h-4L9.26,4.96c-0.73,0.27-1.4,0.66-2,1.14L4.34,5.27l-2,3.46 l2.19,2.13C4.47,11.23,4.44,11.61,4.44,12s0.03,0.77,0.09,1.14l-2.19,2.13l2,3.46l2.92-0.83c0.6,0.48,1.27,0.87,2,1.14L10,22h4 l0.74-2.96c0.73-0.27,1.4-0.66,2-1.14l2.92,0.83l2-3.46l-2.19-2.13c0.06-0.37,0.09-0.75,0.09-1.14s-0.03-0.77-0.09-1.14l2.19-2.13 l-2-3.46L16.74,6.1c-0.6-0.48-1.27-0.87-2-1.14L14,2L14,2z'></path>
							</svg>
							<h3>Settings</h3>
						</li>
						<li>
							<svg focusable='false'>
								<path d='M13.18,4l0.24,1.2L13.58,6h0.82H19v7h-5.18l-0.24-1.2L13.42,11H12.6H6V4H13.18 M14,3H5v18h1v-9h6.6l0.4,2h7V5h-5.6L14,3 L14,3z'></path>
							</svg>
							<h3>Report history</h3>
						</li>
						<li>
							<svg focusable='false'>
								<path d='M15.36,9.96c0,1.09-0.67,1.67-1.31,2.24c-0.53,0.47-1.03,0.9-1.16,1.6L12.85,14h-1.75l0.03-0.28 c0.14-1.17,0.8-1.76,1.47-2.27c0.52-0.4,1.01-0.77,1.01-1.49c0-0.51-0.23-0.97-0.63-1.29c-0.4-0.31-0.92-0.42-1.42-0.29 c-0.59,0.15-1.05,0.67-1.19,1.34L10.32,10H8.57l0.06-0.42c0.2-1.4,1.15-2.53,2.42-2.87c1.05-0.29,2.14-0.08,2.98,0.57 C14.88,7.92,15.36,8.9,15.36,9.96z M12,18c0.55,0,1-0.45,1-1s-0.45-1-1-1s-1,0.45-1,1S11.45,18,12,18z M12,3c-4.96,0-9,4.04-9,9 s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z'></path>
							</svg>
							<h3>Help</h3>
						</li>
						<li>
							<svg focusable='false'>
								<path d='M13,14h-2v-2h2V14z M13,5h-2v6h2V5z M19,3H5v16.59l3.29-3.29L8.59,16H9h10V3 M20,2v15H9l-5,5V2H20L20,2z'></path>
							</svg>
							<h3>Send feedback</h3>
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
			</div>
			<div
				className={`cover-fade ${isCollapsed ? 'isCollapsed' : ''}`}
			></div>
		</>
	);
};

export default MenuVideo;
