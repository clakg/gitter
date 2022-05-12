import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

// firebase config 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase.config';
import CreatePost from '../components/CreatePost';
import ConnectModal from '../components/ConnectModal';
import Post from '../components/Post';
import { getPosts } from '../actions/post.action';

const Login = () => {
    const [user, setUser] = useState(null);
    const posts = useSelector((state) => state.postReducer);
    const dispatch = useDispatch();

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
    })

    const handleLogout = async () => {
        await signOut(auth)
    }

    useEffect(() => {
        dispatch(getPosts())
        console.log(posts)
        // getDocs(collection(db, "posts"))
        // .then((res) => {
        // setPosts(res.docs.map((doc)=>({...doc.data(), id: doc.id})))
        //})
    })
    return (
        <div>
            <h1>LOGIN</h1>
            <div className="app-header">
                {user && (
                    <div className="user-infos">
                        <span>{user?.displayName[0]}</span>
                        <h4>{user?.displayName}</h4>
                        <button onClick={() => handleLogout()}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </button>
                    </div>
                )}

                {user ? <CreatePost uid={user.uid} displayName={user.displayName} /> : <ConnectModal />}
            </div>
            {user && (
                <div className="posts-container">
                    {
                        posts.length > 0 &&
                        posts
                            .sort((a, b) => b.date - a.date)
                            .map((post) => <Post post={post} key={post.id} user={user} />)
                    }
                </div>
            )}

        </div>
    );
};

export default Login;