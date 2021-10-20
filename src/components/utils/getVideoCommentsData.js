const getVideoCommentsData = async (videoId, APIKey) => {
	try {
		const response = await fetch(
			`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&order=relevance&videoId=${videoId}&key=${APIKey}`
		);
		const data = await response.json();
		return data.items;
	} catch (error) {
		console.log(`Comments data fetch error: ${error}`);
	}
};
export default getVideoCommentsData;
