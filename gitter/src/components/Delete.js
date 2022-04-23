import React from 'react';
import { db } from '../utils/firebase.config';
import { deleteDoc, doc } from 'firebase/firestore';

const Delete = ({ postId }) => {

    const handleDelete = () => {
        deleteDoc(doc(db, "posts", postId))
    }

    return (
        <span className="delete" onClick={(e) => handleDelete()} >
            <i className="fa-solid fa-trash-can"></i>
        </span>
    );
};

export default Delete;