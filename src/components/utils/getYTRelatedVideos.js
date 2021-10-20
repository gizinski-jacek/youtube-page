const getYTRelatedVideos = async (videoId, APIKey) => {
	try {
		const response = await fetch(
			`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&order=relevance&relatedToVideoId=${videoId}&type=video&key=${APIKey}`
		);
		const data = await response.json();
		const array = data.items.map((item) => {
			return { videoData: item };
		});
		return array;
	} catch (error) {
		console.log(`Related videos data fetch error: ${error}`);
	}
};

export default getYTRelatedVideos;
