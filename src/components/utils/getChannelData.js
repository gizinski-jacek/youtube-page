const getChannelData = async (channelId, APIKey) => {
	try {
		const response = await fetch(
			`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${APIKey}`
		);
		const data = await response.json();
		return data.items[0].snippet;
	} catch (error) {
		console.log(`Channel data fetch error: ${error}`);
	}
};

export default getChannelData;
