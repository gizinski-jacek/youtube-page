const getTrendingVideos = async (number, APIKey) => {
	try {
		const response = await fetch(
			`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=${number}&key=${APIKey}`
		);
		const data = await response.json();
		const array = data.items.map((item) => {
			return {
				videoData: {
					...item,
					id: { videoId: item.id },
				},
			};
		});
		return array;
	} catch (error) {
		console.log(`Trending videos data fetch error: ${error}`);
	}
};

export default getTrendingVideos;
