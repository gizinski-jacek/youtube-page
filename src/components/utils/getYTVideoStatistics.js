const getYTChannelData = (channelId, APIKey) => {
	return fetch(
		`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${APIKey}`
	)
		.then((response) => response.json())
		.then((data) => data.items[0].snippet)
		.catch((error) => {
			console.log(`Channel data fetch error: ${error}`);
		});
};

export default getYTChannelData;
