import countFormatter from '../utils/countFormatter';

const CommentDataWrapper = ({ data }) => {
	return (
		<div key={data.id} className='comment-main'>
			<img
				className='comment-user-picture'
				src={
					data.snippet.topLevelComment.snippet
						.authorProfileImageUrl ||
					`https://firebasestorage.googleapis.com/v0/b/youtube-clone-328013.appspot.com/o/assets%2Fimages%2Fprofile_placeholder.png?alt=media&token=d1bc2f1c-9c82-4f41-b255-1bf9413fa641`
				}
				alt='Video thumbnail'
			/>
			<div className='comment-metadata'>
				<span className='comment-header'>
					<h3 className='comment-user-display-name'>
						{data.snippet.topLevelComment.snippet.authorDisplayName}
					</h3>
					<h4 className='comment-post-date'>
						{data.snippet.topLevelComment.snippet.publishedAt}
					</h4>
				</span>
				<p className='comment-contents'>
					{data.snippet.topLevelComment.snippet.textOriginal}
				</p>
				<span className='comment-engagement'>
					<div className='comment-like-count'>
						<svg focusable='false'>
							<path d='M12.42,14A1.54,1.54,0,0,0,14,12.87l1-4.24C15.12,7.76,15,7,14,7H10l1.48-3.54A1.17,1.17,0,0,0,10.24,2a1.49,1.49,0,0,0-1.08.46L5,7H1v7ZM9.89,3.14A.48.48,0,0,1,10.24,3a.29.29,0,0,1,.23.09S9,6.61,9,6.61L8.46,8H14c0,.08-1,4.65-1,4.65a.58.58,0,0,1-.58.35H6V7.39ZM2,8H5v5H2Z'></path>
						</svg>
						<h3>
							{countFormatter(
								data.snippet.topLevelComment.snippet.likeCount,
								0
							)}
						</h3>
					</div>
					<div className='comment-dislike-count'>
						<svg focusable='false'>
							<path d='M3.54,2A1.55,1.55,0,0,0,2,3.13L1,7.37C.83,8.24,1,9,2,9H6L4.52,12.54A1.17,1.17,0,0,0,5.71,14a1.49,1.49,0,0,0,1.09-.46L11,9h4V2ZM6.07,12.86a.51.51,0,0,1-.36.14.28.28,0,0,1-.22-.09l0-.05L6.92,9.39,7.5,8H2a1.5,1.5,0,0,1,0-.41L3,3.35A.58.58,0,0,1,3.54,3H10V8.61ZM14,8H11l0-5h3Z'></path>
						</svg>
					</div>
					<div className='comment-reply-btn'>Reply</div>
				</span>
			</div>
		</div>
	);
};

export default CommentDataWrapper;
