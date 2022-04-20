import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import app from '../firebaseconfig';
import { useAuthState } from "react-firebase-hooks/auth";
import  {getFirestore, doc, setDoc} from 'firebase/firestore'

function SignUp() {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
    const auth = getAuth(app)
    const [user, loading] = useAuthState(auth);
    const db = getFirestore(app)

    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return;
        if (user) {
            navigate('/dashboard/statistics')
        };
    }, [user, loading, db, navigate]);

	const register = async (e) => {
		e.preventDefault()
		
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setDoc(doc(db, "users", user.uid), {
                companyName: username,
                email: email,
            })
            .catch(error => console.log(error))
        }
        catch (e) {
            console.log(e)
        }
        console.log(username)
	}

	return (

		<div className='form'>
            <div className = 'signin'>
                <div className ='title'><h2>SIGN UP</h2></div>
                <form onSubmit={register}>
                    <label>Company Name</label>
                    <input className='sign-input' type={'text'} onChange={(e) => setUsername(e.target.value)}></input>
                    <label>Email </label>
                    <input className='sign-input' type={'text'} onChange={(e) => setEmail(e.target.value)}></input>
                    <label>Password </label>
                    <input className='sign-input' type={'password'} onChange={(e) => setPassword(e.target.value)}></input>
                    <input className='sign-button' type={'submit'} value={'SIGN UP'}></input>
                </form>
                <div className='bottomFormButton'>
                    Already have an account?
                    <NavLink className={'link'} to="/login"> Login </NavLink>
                </div>
            </div>
        </div>
		
	)
}
export default SignUp