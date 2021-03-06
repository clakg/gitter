import React, { useRef } from 'react';
//import { addDoc, collection } from 'firebase/firestore'
//import { db } from '../utils/firebase.config';
import { useDispatch } from "react-redux";
import { addPost, getPosts } from '../actions/post.action';

const CreatePost = ({ uid, displayName }) => {

    const message = useRef();
    const title = useRef();
    const category = useRef();

    const dispatch = useDispatch();

    // quand le formulaire est validé, on applique la fonction
    const handlePost = async (e) => {
        e.preventDefault();

        // on recupere des données tapées dans le formulaire, qu'on stocke dans un objet (ici: data) qu'on va passer à la bdd de Firebase
        const data = {
            author: displayName,
            authorId: uid,
            title: title.current.value,
            category: category.current.value,
            message: message.current.value,
            comments: null,
            date: Date.now(),
        };
        // addDoc permet d'ajouter des éléments dans firebase avec en paramètre:
        // la collection (nom de la bdd (db) + nom du document (posts)) + l'objet contenant les données (data)

        //await addDoc(collection(db, "posts"), data);

        await dispatch(addPost(data))
        // on vide le champs du formulaire après avoir cliqué sur le bouton submit
        title.current.value = "";
        category.current.value = "";
        message.current.value = "";
        dispatch(getPosts())
    };

    return (
        <div className='new-post-modal'>
            <form onSubmit={(e) => handlePost(e)}>
                <textarea placeholder='Titre de votre post' ref={title}></textarea>
                <textarea placeholder='Catégorie de votre post' ref={category}></textarea>
                <textarea placeholder='Votre bout de code...' ref={message}></textarea>
                <input type="submit" value="Envoyer" />
            </form>
        </div>
    );
};

export default CreatePost;