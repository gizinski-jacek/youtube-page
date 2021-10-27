const getTrendingVideos = async (quantity, APIKey) => {
	try {
		const response = await fetch(
			`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=${quantity}&key=${APIKey}`
		);
		const data = await response.json();
		const array = data.items.map((item) => {
			return {
				...item,
				id: { videoId: item.id, kind: item.kind },
			};
		});
		return array;
	} catch (error) {
		console.log(`Trending videos data fetch error: ${error}`);
	}
};

export default getTrendingVideos;
