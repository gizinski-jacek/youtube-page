const getYTVideoStatistics = async (videoId, APIKey) => {
	try {
		const response = await fetch(
			`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${APIKey}`
		);
		const data = await response.json();
		return data.items[0].statistics;
	} catch (error) {
		console.log(`Video stats fetch error: ${error}`);
	}
};

export default getYTVideoStatistics;
