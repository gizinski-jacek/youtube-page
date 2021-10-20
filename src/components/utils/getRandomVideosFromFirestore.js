import { getFirestore, collection, getDocs } from 'firebase/firestore';

const getRandomVideosFromFirestore = async (number) => {
	const data = await getDocs(
		collection(getFirestore(), 'mainVideosDatabase')
	);
	const mainArray = [];
	const allDataArray = [];
	data.forEach((doc) => {
		allDataArray.push(doc.data());
	});
	for (let i = 0; i < number; i++) {
		const used = [];
		let random = Math.trunc(Math.random() * allDataArray.length);
		while (used.includes(random)) {
			random = Math.trunc(Math.random() * allDataArray.length);
		}
		used.push(random);
		mainArray.push(allDataArray[random]);
		allDataArray.splice(random, 1);
	}
	return mainArray;
};

export default getRandomVideosFromFirestore;
