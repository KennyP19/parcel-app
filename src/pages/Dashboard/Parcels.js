import { useState, useEffect } from 'react'
import {Modal, DeleteModal} from '../../components/Modal'
import { getDocs, collection, query, where, limit, addDoc, Timestamp, doc, updateDoc, deleteDoc} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import app from '../../firebaseconfig'
import { useOutletContext } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import QRCode from 'qrcode'
import { getParsedDate } from '../../functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Parcels = () => {
	const [openModal, setOpenModal] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)
	const auth = getAuth(app)
	const db = useOutletContext()

	const [user, loading, error] = useAuthState(auth);
	const [parcels, setParcels] = useState([])
	const [newParcel, setNewParcel] = useState(null)

	const [parcelToUpdate, setparcelToUpdate] = useState(null)
	const [toEdit, setToEdit] = useState(false)

	const addParcel = async (recipientName, location) => {
		const parcelRef = collection(db, 'users', user.uid, 'parcels')
		const parcelDate = new Date()
		const timestamp = Timestamp.fromDate(parcelDate)
		
		const recipientEmail = await getUserData(recipientName, location)

		if (recipientEmail === '') return

		addDoc(parcelRef, {
			recipientName: recipientName,
			location: location,
			dateRecieved: timestamp,
			email: recipientEmail,
			status: 'waiting'
		})
		.then(docRef => setNewParcel({id: docRef.id, data: {recipientName: recipientName, location: location, dateRecieved: parcelDate, email: recipientEmail, status: 'waiting'}}))
		.then(setOpenModal(false))

	}

	const getUserData = async(recipientName, location) => {

		const recipientsRef = collection(db, 'users', user.uid, 'recipients')
		const firstName = recipientName.split(' ')[0]
		const lastName = recipientName.split(' ')[1]
		const recipientQuery = query(recipientsRef, where('firstName', '==', firstName.toLowerCase()), where('lastName', '==', lastName), where('location', '==', location), limit(1))
		
		try {
			const docs = await getDocs(recipientQuery)
			const recipientEmail = docs.docs[0].data().email

			return recipientEmail

		} catch (error) {
			console.log(error)
		}
		return ''
	}

	const createQR = () => {
		QRCode.toDataURL(newParcel.id)
		.then(url => {
			sendEmail(url)
		})
		.catch(err => {
			console.error(err)
		})
	}

	const sendEmail = (qrCode) => {
		console.log(qrCode)
		fetch('/send_email', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({data: qrCode, email: newParcel.data.email})
		})
		.then(response => response.status)
		.then(data => console.log(data))
		.catch(setNewParcel(null))
	}

	const openUpdateParcel = (parcel) => {
		setToEdit(true)
		setparcelToUpdate(parcel)
		setOpenModal(true)
	}

	const updateParcel = (updatedParcel) => {
		const parcelDoc = doc(db, 'users', user.uid, 'parcels', parcelToUpdate.id)

		updateDoc(parcelDoc, updatedParcel)
		.then(onCloseModal)
		.catch(error => console.log(error))
	}

	const onCloseModal = () => {
		setOpenModal(false)
		setNewParcel(null)
		setparcelToUpdate()
		setToEdit(false)
	}

	const deleteParcel = (parcel) => {
		const parcelDoc = doc(db, 'users', user.uid, 'parcels', parcel.id)
		
		deleteDoc(parcelDoc, parcel)
		.then(setDeleteModal(false))
		.catch(error => console.log(error))
	}

	useEffect(() => {
		if (loading) return
		if (user) {
			const getParcels = async () => {
				const parcelsCollection = collection(db, 'users', user.uid, 'parcels')
				const docSnaps = await getDocs(parcelsCollection)
				
				setParcels(docSnaps.docs.map((doc) => ({id: doc.id, ...doc.data()})))
			}
			getParcels()
			newParcel && createQR()
		}
	},[loading, user, db, newParcel, error])
	return (
		<>
			{openModal === true && <Modal closeModal={onCloseModal} modalType={'parcel'} action={(toEdit === false) ?  addParcel : updateParcel} data={parcelToUpdate}/>}
			{deleteModal === true && <DeleteModal closeModal={setDeleteModal} action={deleteParcel} type={'Parcel'}/>}
			<div className='dashboard-container'>
				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<div style={{fontSize: '30px', display: 'flex'}}>
						Parcels
					</div>
					<div style={{display: 'flex', minWidth: '250px'}}>
						<input className='searchbar' placeholder='Search...'></input>
						<button className='search-button' onClick={() => setOpenModal(true)}>Log New Parcel</button>
					</div>
				</div>
				<div style={{marginTop: '40px', width: '100%'}}>
					<table className='users-table'>
						<thead>
							<tr>
								<th>Recipient</th>
								<th>Destination</th>
								<th>Date received</th>
								<th>Status</th>
								<th> </th>
							</tr>
						</thead>
						<tbody>
							{parcels.map((parcel) => {
								return (
									<tr key={parcel.id}>
									<td>
										<div className='item'>{parcel.recipientName} </div>
									</td>
									<td>
										<div className='item'>{parcel.location}</div>
									</td>
									<td>
										<div className='item'>{getParsedDate(parcel.dateRecieved)}</div>
									</td>
									<td>
										<div className='item'>{parcel.status}</div>
									</td>
									<td>
										<div className='item'>
											<button className='action-button' onClick={() => {openUpdateParcel(parcel)}}><FontAwesomeIcon icon={faEdit} size='xl'/></button>
											<button className='action-button' onClick={() => {setDeleteModal(true)}}><FontAwesomeIcon icon={faTrashAlt} size='xl' /></button>
										</div>
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

export default Parcels