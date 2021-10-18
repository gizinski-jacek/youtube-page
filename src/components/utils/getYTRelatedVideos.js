const getYTRelatedVideos = (videoId, APIKey) => {
	return fetch(
		`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&order=relevance&relatedToVideoId=${videoId}&type=video&key=${APIKey}`
	)
		.then((response) => response.json())
		.then((data) => {
			const array = data.items.map((item) => {
				return { videoData: item };
			});
			return array;
		});
};

export default getYTRelatedVideos;
