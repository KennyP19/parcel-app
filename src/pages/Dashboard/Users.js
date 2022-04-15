import React, { useEffect } from 'react'
import '../../App.css'
import {DeleteModal, Modal} from '../../components/Modal'
import { useState } from 'react'
import app from '../../firebaseconfig'
import { getAuth } from 'firebase/auth'
import { getDocs, doc, collection, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { useOutletContext } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Users = () => {
	const [openModal, setOpenModal] = useState(false)
	const [deleteModal, setdeleteModal] = useState(false)

	const auth = getAuth(app)
	const db = useOutletContext()

	const [user, loading] = useAuthState(auth);
	const [users, setUsers] = useState([])
	const [newUser, setNewUser] = useState({})

	const [userToUpdate, setUserToUpdate] = useState(null)
	const [toEdit, setToEdit] = useState(false)

	const [searchTerm, setsearchTerm] = useState('')
	
	
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

	const onUpdateUser = (user) => {
		setOpenModal(true)
		setToEdit(true)
		setUserToUpdate(user)
	}

	const updateUser = (updatedUser) => {
		const userDoc = doc(db, 'users', user.uid, 'recipients', userToUpdate.id)
		
		updateDoc(userDoc, updatedUser)
		.then(console.log('it work'))
		.then(onCloseModal())
		.then(setNewUser(updatedUser))
		.catch(error => console.log(error))
	}

	const onCloseModal = () => {
		setOpenModal(false)
		setToEdit(false)
		setUserToUpdate(null)
	}

	const filterUsers = (val) => {
		const name = val.firstName + ' ' + val.lastName
		let filteredName = name.toLowerCase().includes(searchTerm.toLowerCase())
		let filteredEmail = val.email.toLowerCase().includes(searchTerm.toLowerCase())
		let filteredLocation = val.location.toLowerCase().includes(searchTerm.toLowerCase())

		if (filteredName || filteredEmail || filteredLocation) return val
	}

	const onDeleteUser = (user) => {
		setUserToUpdate(user)
		setdeleteModal(true)
	}

	const deleteUser = () => {
		const userDoc = doc(db, 'users', user.uid, 'recipients', userToUpdate.id)

		deleteDoc(userDoc, userToUpdate)
		.then(setdeleteModal(false))
		.then(setNewUser())
		.then(onCloseModal())
		.catch(error => console.log(error))
	}

	useEffect(() => {
		if (loading) return
		if (user) {
			const getUsers = async () => {
				const usersCollection = collection(db, 'users', user.uid, 'recipients')
				try {
					const docSnaps = await getDocs(usersCollection)
					setUsers(docSnaps.docs.map((doc) => ({id: doc.id, ...doc.data()})))
				} catch (error) {
					console.log(error)
				}
			}
			getUsers()
		}
	},[loading, user, db, newUser])	

	return (
		<>
			{openModal && <Modal closeModal={onCloseModal} action={(toEdit === false) ?  addUser : updateUser} modalType={'recipient'} data={userToUpdate}/>}
			{deleteModal && <DeleteModal closeModal={setdeleteModal} action={deleteUser} type={'User'}/>}
			<div className='dashboard-container'>
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<div style={{fontSize: '30px', display: 'flex'}}>
						Recipients
					</div>
					<div style={{display: 'flex', minWidth: '250px'}}>
						<input className='searchbar' placeholder='Search...' onChange={(e) => setsearchTerm(e.target.value)}></input>
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
						{users.filter(val => (searchTerm !== '') ? filterUsers(val) : val).map((user) => {
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
									<td>
										<button className='action-button' onClick={() => onUpdateUser(user)}><FontAwesomeIcon icon={faEdit} size='xl'/></button>
										<button className='action-button' onClick={() => onDeleteUser(user)}><FontAwesomeIcon icon={faTrashAlt} size='xl' /></button>
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