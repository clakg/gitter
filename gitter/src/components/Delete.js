import React from 'react';
//import { db } from '../utils/firebase.config';
//import { deleteDoc, doc } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { deletePost } from '../actions/post.action';

const Delete = ({ postId }) => {

    const dispatch = useDispatch()

    const handleDelete = () => {
        // deletePost without redux
        //deleteDoc(doc(db, "posts", postId))

        // dispatch deletePost
        dispatch(deletePost(postId))
    }

    return (
        <span className="delete" onClick={(e) => handleDelete()} >
            <i className="fa-solid fa-trash-can"></i>
        </span>
    );
};

export default Delete;