import {useEffect} from 'react'
import {useNavigate, Outlet} from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import app from '../../firebaseconfig';
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from '../../components/sidebar';
import  '../../App.css';
import { getFirestore } from 'firebase/firestore';

const Dashboard = () => {
    let navigate = useNavigate()
    const auth = getAuth(app)
    const [user, loading] = useAuthState(auth);

    const db = getFirestore(app)

    useEffect(() => {
        if (loading) return
        if (!user) navigate('/login')
    }, [user, loading, navigate])

    return (
        <div>
            <Sidebar></Sidebar>
            <div className='body'>
                <Outlet context={db}/>
            </div>
        </div>
    )
}

export default Dashboard