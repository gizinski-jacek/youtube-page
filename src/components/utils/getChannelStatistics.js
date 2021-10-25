const getChannelStatistics = async (channelId, APIKey) => {
	try {
		const response = await fetch(
			`https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${APIKey}`
		);
		const data = await response.json();
		return data.items[0].statistics;
	} catch (error) {
		console.log(`Channel statistics fetch error: ${error}`);
	}
};

export default getChannelStatistics;
