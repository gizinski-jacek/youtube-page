const getYTChannelStatistics = (channelId, APIKey) => {
	return fetch(
		`https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${APIKey}`
	)
		.then((response) => response.json())
		.then((data) => data.items[0].statistics)
		.catch((error) => {
			console.log(`Channel data fetch error: ${error}`);
		});
};

export default getYTChannelStatistics;
