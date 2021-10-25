const CommentsControls = ({ data, value, handleInput }) => {
	return data ? (
		<div className='new-comment'>
			<span className='comments-controls'>
				<div className='comments-count'>
					<h3>{`${data.stats.commentCount} Comments`}</h3>
				</div>
				<div className='comments-sort'>
					<svg focusable='false'>
						<path d='M21,6H3V5h18V6z M15,11H3v1h12V11z M9,17H3v1h6V17z'></path>
					</svg>
					<h3>Sort By</h3>
				</div>
			</span>
			<div className='new-comment-contents'>
				<img
					className='add-comment-user-picture'
					src={`https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fprofile_placeholder.png?alt=media&token=d1bc2f1c-9c82-4f41-b255-1bf9413fa641`}
					alt=''
				/>
				<input
					id='add-comment-input'
					type='text'
					name='add-comment-input'
					value={value}
					onChange={handleInput}
					placeholder='Commenting publicly as USERNAME'
				/>
			</div>
		</div>
	) : null;
};

export default CommentsControls;
