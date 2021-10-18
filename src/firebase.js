import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyAdnvug1Oyy1XOUxGHVKVGfp55ndCeVd1k',
	authDomain: 'clone-328013.firebaseapp.com',
	projectId: 'youtube-clone-328013',
	storageBucket: 'youtube-clone-328013.appspot.com',
	messagingSenderId: '374259457026',
	appId: '1:374259457026:web:80d5874bc952a461619b1b',
};

const app = initializeApp(firebaseConfig);
const myAPIKey = 'AIzaSyD-zyj2Y5Uk1v2ZtpZfeeJXXh-3gFWkBWc';

export { app, myAPIKey };
