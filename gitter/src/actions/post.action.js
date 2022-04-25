import { db } from '../utils/firebase.config';
import { getDocs, collection } from 'firebase/firestore';

export const GET_POSTS = "GET_POSTS";

export const getPosts = () => {
    return (dispatch) => {
        return getDocs(collection(db, "posts"))
            .then((res) => {
                dispatch({
                    type: GET_POSTS,
                    payload: res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                });
            })
            .catch((err) => console.log(err))

    };
};