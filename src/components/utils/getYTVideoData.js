const getYTVideoData = (videoId, APIKey) => {
	return fetch(
		`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${APIKey}`
	)
		.then((response) => response.json())
		.then((data) => data.items)
		.catch((error) => {
			console.log(`Video data fetch error: ${error}`);
		});
};

export default getYTVideoData;
