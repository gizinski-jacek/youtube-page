import CommentsControls from './CommentsControls';
import CommentDataWrapper from './CommentDataWrapper';

const CommentsContainer = ({
	videoData,
	newCommentValue,
	handleInput,
	commentsData,
}) => {
	const contents = commentsData.map((item, index) => {
		return <CommentDataWrapper key={index} data={item} />;
	});

	return (
		<div className='comments-section'>
			<CommentsControls
				data={videoData}
				value={newCommentValue}
				handleInput={handleInput}
			/>
			{contents}
		</div>
	);
};

export default CommentsContainer;
