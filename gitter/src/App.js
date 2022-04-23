import React, { useState, useEffect } from 'react';

// components
import ConnectModal from './components/ConnectModal';
import CreatePost from './components/CreatePost';

// firebase config 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './utils/firebase.config';
import { getDocs, collection } from 'firebase/firestore';
import Post from './components/Post';

const App = () => {

  const [user, setUser] = useState(null);

  // création de la requete Read => on va chercher les données dans la bdd + les mettre dans un variable + les lister en map
  const [posts, setPosts] = useState([]);

  // pour verifier si l'utilisateur est connecté, on utilise la méthode de firebase onAuthStateChanged()
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  // quand le composant se monte (componentDidMount), on va chercher la documentation de firebase avec getDocs
  // getDocs doit savoir où il doit aller chercher les données.
  // ici c'est dans une collection qui prend en parametre la bdd et la collection attendue
  useEffect(() => {
    getDocs(collection(db, "posts")).then((res) =>
      setPosts(res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
  }, []);

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
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        )}

        {user ? <CreatePost uid={user.uid} displayName={user.displayName} /> : <ConnectModal />}
      </div>
      <div className="posts-container">
        {
          posts.length > 0 &&
          posts
            .sort((a, b) => b.date - a.date)
            .map((post) => <Post post={post} key={post.id} user={user} />)

        }
      </div>
    </div>
  );
};

export default App;
