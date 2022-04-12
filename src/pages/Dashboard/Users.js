import React, { useEffect } from 'react'
import '../../App.css'
import Modal from '../../components/Modal'
import { useState } from 'react'
import app from '../../firebaseconfig'
import { getAuth } from 'firebase/auth'
import { getDocs, doc, collection, setDoc } from 'firebase/firestore'
import { useOutletContext } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

const Users = () => {
	const [openModal, setOpenModal] = useState(false)
	
	const auth = getAuth(app)
	const db = useOutletContext()

	const [user, loading] = useAuthState(auth);
	const [users, setUsers] = useState([])
	const [newUser, setNewUser] = useState({})
	
	
	const addUser = async (email, firstname, lastname, location) => {
		const recipientsRef = collection(db, 'users', user.uid, 'recipients')
		try {
			await setDoc(doc(recipientsRef), {
				firstName: firstname,
				lastName: lastname,
				email: email, 
				location: location
			})
		} catch (error) {
			console.log(error)
		}
		setNewUser({firstName: firstname, lastname: lastname, email: email, location: location})
		setOpenModal(false)
	}

	useEffect(() => {
		if (loading) return
		if (user) {
			const getUsers = async () => {
				const usersCollection = collection(db, 'users', user.uid, 'recipients')
				const docSnaps = await getDocs(usersCollection)
		
				setUsers(docSnaps.docs.map((doc) => ({id: doc.id, ...doc.data()})))
			}
			getUsers()
		}
	},[loading, user, db, newUser])	

	return (
		<>
			{openModal ? <Modal setOpenModal={setOpenModal} action={addUser} modalType={'recipient'}/> : <></>}
			<div className='dashboard-container'>
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<div style={{fontSize: '30px', display: 'flex'}}>
						Recipients
					</div>
					<div style={{display: 'flex', minWidth: '250px'}}>
						<input className='searchbar' placeholder='Search...'></input>
						<button className='search-button' onClick={() => setOpenModal(true)}>Add Recipient</button>
					</div>
				</div>
				<div style={{marginTop: '40px', width: '100%'}}>
					<table className='users-table'>
						<thead>
						<tr>
							<th>Recipient</th>
							<th>Email</th>
							<th>Location</th>
							<th>Modify</th>
						</tr>
						</thead>
						<tbody>
						{users.map((user) => {
							return (
								<tr key={user.id}>
									<td>
										<div className='item'>{user.firstName} {user.lastName} </div>
									</td>
									<td>
										<div className='item'>{user.email}</div>
									</td>
									<td>
										<div className='item'>{user.location}</div>
									</td>
								</tr>
							)
						})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default Users