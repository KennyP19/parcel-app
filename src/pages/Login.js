import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import app from '../firebaseconfig';
import { useAuthState } from "react-firebase-hooks/auth";

function SignIn() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const auth = getAuth(app)
    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate()

    useEffect( (loading) => {
        if (loading) return 

        if (user) navigate('/dashboard/statistics')
    }, [loading, user, navigate]
    )

	const signin = async (e) => {
		e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)        
        }
        catch (e) {
            console.log(e)
        }
  }

  return (
	<div className='form'>
        <div className = 'signin'>
            <div className ='title'><h2>SIGN IN</h2></div>
            <form onSubmit={signin}>
                <label>Email Address </label>
                <input className='sign-input' type={'text'} onChange={(e) => setEmail(e.target.value)}></input>
                <label>Password </label>
                <input className='sign-input' type={'password'} onChange={(e) => setPassword(e.target.value)}></input>
                <input className='sign-button' type={'submit'} value={'LOGIN'}></input>
            </form>
            <div className='bottomFormButton'>
                Not registered?
                <NavLink className={'link'} to="/Register"> Create Account</NavLink>
            </div>
        </div>
    </div>  
        
  )
}

export default SignIn