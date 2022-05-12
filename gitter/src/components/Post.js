import React, { useState } from 'react';
//import { db } from '../utils/firebase.config';
//import { updateDoc, doc } from 'firebase/firestore';
import Delete from './Delete';
import CommentPost from './CommentPost';
import { editPost } from '../actions/post.action';
import { useDispatch } from "react-redux";

const Post = ({ post, user }) => {

    const [edit, setEdit] = useState(false);
    const [editMess, setEditMess] = useState(null);

    const dispatch = useDispatch()

    const dateFormater = (date) => {
        let day = Math.floor(
            (new Date() - new Date(date)) / (1000 * 3600 * 24)
        )

        if (day === 0) {
            return "aujourd'hui"
        } else if (day === 1) {
            return "il y a 1 jour"
        } else {
            return "il y a " + day + "jours"
        }

    };

    const handleEdit = () => {
        setEdit(false);

        // envoie à la bdd de firebase avec la methode 
        // updateDoc(doc(nom de la bdd, collection, id de ce qu'on veut editer), ce qu'on passe comme données))

        // editMess && updateDoc(doc(db, "posts", post.id), { message: editMess });
        // ou la condition plus lisible ci-dessous
        if (editMess) {
            // Edit without Redux
            //updateDoc(doc(db, "posts", post.id), { message: editMess });
            dispatch(editPost({
                id: post.id,
                message: editMess
            }))
        }
    };

    return (
        <div className="post">
            <div className="post-header">
                <div className="left-part">
                    <div className="title">
                        <h1>{post.title}</h1>
                        {post.category &&
                            <h1>Catégorie: {post.category}</h1>
                        }
                    </div>
                    <div className="subtitle">
                        <div className='authorCustom'>
                            <span>{post.author[0]}</span>
                            <h5>{post.author}</h5>
                        </div>
                        <div className='dateActionContainer'>
                            <h5>Posté {dateFormater(post.date)}</h5>
                            {post.authorId === user?.uid && (
                                <div className="right-part">
                                    <span onClick={() => setEdit(!edit)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </span>
                                    <Delete postId={post.id} />
                                </div>
                            )}
                        </div>

                    </div>
                </div>



            </div>
            {edit ? (
                <>
                    <textarea
                        autoFocus
                        defaultValue={editMess ? editMess : post.message}
                        onChange={(e) => setEditMess(e.target.value)}>
                    </textarea>
                    <button className="edit-btn" onClick={() => handleEdit()}>
                        Modifier le message
                    </button>
                </>

            ) : (
                <p>{editMess ? editMess : post.message}</p>
            )
            }
            <CommentPost post={post} />
        </div>
    );
};

export default Post;