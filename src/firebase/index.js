import firebase from 'firebase/compat/app';
import "firebase/compat/storage";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAoWI-vMWpIKYsvL-YCoOdU2azimNcKrAk",
    authDomain: "final-project-bu.firebaseapp.com",
    projectId: "final-project-bu",
    storageBucket: "final-project-bu.appspot.com",
    messagingSenderId: "582555319555",
    appId: "1:582555319555:web:1084f5dbfed172dd183d36",
    measurementId: "G-F25HCNZB15"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth()
const storage = firebase.storage();

export { storage, firebase as default };






