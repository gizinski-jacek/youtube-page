import { NavLink } from 'react-router-dom';

const Content = ({ content, trending }) => {
	return (
		<div id='content-container'>
			<div id='category-filter'>
				<ul>
					<NavLink activeClassName='active' exact to='/'>
						<li>All</li>
					</NavLink>
					<li>Playlists</li>
					<li>Music</li>
					<li>Jazz</li>
					<li>Live</li>
					<li>Computers</li>
					<li>Javascript</li>
					<li>Piano</li>
					<li>HTML5</li>
					<li>Unboxing</li>
					<li>Apple</li>
					<li>CSS</li>
					<li>Editing</li>
					<li>Sales</li>
					<li>Recently uploaded</li>
					<li>Watched</li>
					<li>New to you</li>
				</ul>
			</div>
			<div className='content-display'>
				{content}
				<div className='trending-content-display'>
					<h2 className='trending-tag'>Trending</h2>
					{trending}
				</div>
			</div>
		</div>
	);
};

export default Content;
