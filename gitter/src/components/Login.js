import React, { useRef, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase.config';

const Login = () => {

    const loginEmail = useRef();
    const loginPassword = useRef();
    const [error, setError] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail.current.value, loginPassword.current.value)
            console.log(user)
        } catch (error) {
            console.log(error.message)
            setError(true)
        }
    }

    return (

        <div className="login-container">
            <div className="login">
                <h3>Se connecter</h3>
                <form className='form-login' onSubmit={e => handleLogin(e)}>

                    <input
                        type="email"
                        placeholder='Email'
                        required
                        ref={loginEmail}
                    />

                    <input
                        type="password"
                        placeholder='Mot de passe'
                        required
                        ref={loginPassword}
                    />

                    <input
                        type="submit"
                        value="Je me connecte"
                    />
                    <span>{error && "La donnée adresse email ou mot de passe est incorrect "}</span>

                </form>
            </div>
        </div>
    );
};

export default Login;