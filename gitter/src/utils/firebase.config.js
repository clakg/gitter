import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "gitter-5726a.firebaseapp.com",
    projectId: "gitter-5726a",
    storageBucket: "gitter-5726a.appspot.com",
    messagingSenderId: "682986901394",
    appId: "1:682986901394:web:611a8eef207f9465703b4b"
});

export const auth = app.auth();
export default app;