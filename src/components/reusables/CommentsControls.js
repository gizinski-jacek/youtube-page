const CommentsControls = ({ data, value, handleInput }) => {
	return data ? (
		<div className='new-comment'>
			<span className='comments-controls'>
				<div className='comments-count'>
					<h2>{`${data.stats.commentCount} Comments`}</h2>
				</div>
				<div className='comments-sort'>
					<svg focusable='false' viewBox='0 0 24 24'>
						<path d='M21,6H3V5h18V6z M15,11H3v1h12V11z M9,17H3v1h6V17z'></path>
					</svg>
					<h2>Sort By</h2>
				</div>
			</span>
			<div className='new-comment-contents'>
				<img
					className='add-comment-user-picture'
					src='./images/profile_placeholder.png'
					alt='User pic'
				/>
				<input
					id='add-comment-input'
					type='text'
					name='add-comment-input'
					value={value}
					onChange={handleInput}
					placeholder='Commenting publicly as Anonymous'
				/>
			</div>
		</div>
	) : null;
};

export default CommentsControls;
