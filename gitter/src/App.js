import React, { useState, useEffect } from 'react';

// components
import ConnectModal from './components/ConnectModal';
import CreatePost from './components/CreatePost';

// firebase config 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './utils/firebase.config';
import { useDispatch, useSelector } from "react-redux";
import Post from './components/Post';
import { getPosts } from './actions/post.action';

const App = () => {

  const [user, setUser] = useState(null);

  // création de la requete Read => on va chercher les données dans la bdd + les mettre dans un variable + les lister en map
  const posts = useSelector((state) => state.postReducer);

  const dispatch = useDispatch();

  // pour verifier si l'utilisateur est connecté, on utilise la méthode de firebase onAuthStateChanged()
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  // quand le composant se monte (componentDidMount), on va chercher la documentation de firebase avec getDocs
  // getDocs doit savoir où il doit aller chercher les données.
  // ici c'est dans une collection qui prend en parametre la bdd et la collection attendue
  useEffect(() => {
    dispatch(getPosts())
    // getDocs(collection(db, "posts"))
    // .then((res) => {
    // setPosts(res.docs.map((doc)=>({...doc.data(), id: doc.id})))
    //})
  })

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <div>
      <div className="app-header">

        {user && (
          <div className="user-infos">
            <span>{user?.displayName[0]}</span>
            <h4>{user?.displayName}</h4>
            <button onClick={() => handleLogout()}>
              <div className='logoutCustom'>
                <p>Se déconnecter</p>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </div>
            </button>
          </div>
        )}

        {user ? <CreatePost uid={user.uid} displayName={user.displayName} /> : <ConnectModal />}
      </div>
      {user ? (
        <div className="posts-container">
          {
            posts.length > 0 &&
            posts
              .sort((a, b) => b.date - a.date)
              .map((post) => <Post post={post} key={post.id} user={user} />)

          }
        </div>
      ) : <div className='presCustom'>
        <h1>Présentation</h1>
        <p>
          Faire sa propre veille technologique c'est bien, mais le faire à plusieurs, c'est mieux !<br />
          Gitter est un projet personnel permettant la collaboration de plusieurs développeurs à poster et à partager leurs veilles technologiques.<br />
          Il est cours de réalisation, en front ReactJs v.18.0 et en back Firebase authenticator et firestore pour la base de données.
        </p>

        <div className='signature'>Clarisse K.</div>
      </div>
      }
    </div>
  );
};

export default App;