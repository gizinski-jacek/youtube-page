const getVideoCommentsData = (videoId, APIKey) => {
	return fetch(
		`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&order=relevance&videoId=${videoId}&key=${APIKey}`
	)
		.then((response) => response.json())
		.then((data) => data.items)
		.catch((error) => {
			console.log(`Comments data fetch error: ${error}`);
		});
};
export default getVideoCommentsData;
