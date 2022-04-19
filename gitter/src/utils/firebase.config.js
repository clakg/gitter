import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
    apiKey: process.env.GITTER_APP_API_KEY,
    authDomain: process.env.GITTER_APP_AUTH_DOMAIN,
    projectId: process.env.GITTER_APP_PROJECT_ID,
    storageBucket: process.env.GITTER_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.GITTER_APP_MESSAGE_IN_SENDER_ID,
    appId: process.env.GITTER_APP_APP_ID
});

export const auth = app.auth();
export default app;
