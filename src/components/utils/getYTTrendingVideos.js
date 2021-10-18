const getYTTrendingVideos = (number, APIKey) => {
	return fetch(
		`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=${number}&key=${APIKey}`
	)
		.then((response) => response.json())
		.then((data) => {
			const array = data.items.map((item) => {
				return {
					videoData: {
						...item,
						id: { videoId: item.id },
					},
				};
			});
			return array;
		});
};

export default getYTTrendingVideos;
