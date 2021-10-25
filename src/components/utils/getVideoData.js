const getVideoData = async (videoId, APIKey) => {
	try {
		const response = await fetch(
			`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${APIKey}`
		);
		const data = await response.json();
		return data.items;
	} catch (error) {
		console.log(`Video data fetch error: ${error}`);
	}
};

export default getVideoData;
