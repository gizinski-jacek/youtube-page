const getYTVideoStatistics = (videoId, APIKey) => {
	return fetch(
		`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${APIKey}`
	)
		.then((response) => response.json())
		.then((data) => data.items[0].statistics)
		.catch((error) => {
			console.log(`Video stats fetch error: ${error}`);
		});
};

export default getYTVideoStatistics;
