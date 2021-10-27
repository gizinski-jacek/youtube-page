import { getFirestore, collection, getDocs } from 'firebase/firestore';

const getRandomVideosFromFS = async (quantity) => {
	try {
		const database = await getDocs(
			collection(getFirestore(), 'mainVideosDatabase')
		);
		const allDataArray = [];
		database.forEach((doc) => {
			allDataArray.push(doc.data());
		});
		const mainArray = [];
		for (let i = 0; i < quantity; i++) {
			const used = [];
			let number = Math.trunc(Math.random() * allDataArray.length);
			while (used.includes(number)) {
				number = Math.trunc(Math.random() * allDataArray.length);
			}
			used.push(number);
			mainArray.push(allDataArray[number]);
			allDataArray.splice(number, 1);
		}
		return mainArray;
	} catch (error) {
		console.log(`Database fetch from Firestore error: ${error}`);
	}
};

export default getRandomVideosFromFS;
