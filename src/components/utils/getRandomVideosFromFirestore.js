import { getFirestore, collection, getDocs } from 'firebase/firestore';

const getRandomVideosFromFirestore = (number) => {
	return getDocs(collection(getFirestore(), 'mainVideosDatabase')).then(
		(data) => {
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
		}
	);
};

export default getRandomVideosFromFirestore;
