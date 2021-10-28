const searchForVideo = async (query, APIKey) => {
	try {
		const response = await fetch(
			`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${query}&key=${APIKey}`
		);
		const data = await response.json();
		return data.items;
	} catch (error) {
		console.log(`Search for video error: ${error}`);
	}
};

export default searchForVideo;
