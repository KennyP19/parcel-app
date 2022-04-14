import React from 'react'
import '../App.css'
import { useState } from 'react'

export const Modal = ({closeModal, action, modalType, data}) => {

  data = data || {email: '', firstName: '', lastName: '', location: '', recipientName: ''}


  const RecipientModal = () => {
    const [email, setEmail] = useState(data.email)
    const [firstName, setfirstName] = useState(data.firstName)
    const [lastName, setlastName] = useState(data.lastName)
    const [location, setLocation] = useState(data.location)

    const isUpdate = data.id !== undefined
    const title = isUpdate ? 'Update Recipient' : 'Add Recipient'
    const buttonTitle = isUpdate ? 'Update' : 'Add'

    const addUser = (e) => {
      e.preventDefault()
      action(email, firstName, lastName, location)
    }

    const updateUser = (e) => {
      e.preventDefault()
      action({email: email, firstName: firstName, lastName: lastName, location: location})
    }

    return (
      <form onSubmit={isUpdate ? updateUser : addUser}>
        <h2 style={{'marginTop' : '0'}}>{title}</h2>
        Email
        <input className='sign-input' onChange={(e) => setEmail(e.target.value)} value={email}></input>
        First name
        <input className='sign-input'  onChange={(e) => setfirstName(e.target.value)} value={firstName}></input>
        Last Name
        <input className='sign-input'  onChange={(e) => setlastName(e.target.value)} value={lastName}></input>
        Location
        <input className='sign-input'  onChange={(e) => setLocation(e.target.value)} value={location}></input>
        <BottomButtons title={buttonTitle}/>
      </form>
    )
  }

  const ParcelModal = () => {
    const [recipientName, setRecipientName] = useState(data.recipientName)
    const [location, setLocation] = useState(data.location)

    const isUpdate = data.id !== undefined
    const title = isUpdate ? 'Update Parcel' : 'Log new Parcel'

    const addParcel = (e) => {
      e.preventDefault()
      action(recipientName, location)
    }

    const updateParcel = (e) => {
      e.preventDefault()
      action({recipientName: recipientName, location: location})
    }

    return (
      <form onSubmit={isUpdate ? updateParcel : addParcel}>
        <h2 style={{marginBottom: '30px', marginTop: '0'}}>{title}</h2>
        Recipient name
        <input className='sign-input' onChange={(e) => setRecipientName(e.target.value)} value={recipientName}></input>
        Destination
        <input className='sign-input'  onChange={(e) => setLocation(e.target.value)} value={location} ></input> 
        <BottomButtons submit={isUpdate ? updateParcel : addParcel} title={isUpdate ? 'Update Parcel' : 'Add Parcel'}/>
      </form>
    )
  }

  const BottomButtons = ({title}) => {
    return (
      <div style={{display: 'flex', marginTop: '10px'}}>
        <button className='modal-button' type='button' onClick={() => closeModal()}> Cancel</button>
        <button className='modal-button add-button'> {title} </button>
      </div>
    )
  }
  const typeModal = modalType === 'recipient'

  return (
    <div className='modal-background'>
      <div className={`modal-container ${typeModal ? 'user-modal' : 'parcel-modal'}`}>
        {typeModal ? <RecipientModal/> : <ParcelModal/>}
      </div>
    </div>
  )
}

export const DeleteModal = ({closeModal, action, type}) => {
  return (
    <div className='modal-background'>
      <div className='modal-container delete-modal'>
        <h1 style={{}}>Delete {type}</h1>
        <p>Are you sure you want to delete this {type}?</p>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <button className='modal-button' onClick={() => closeModal(false)}> Close</button>
          <button className='modal-button delete-button' onClick={() => action()}> Delete </button>
      </div>
      </div>
    </div>
  )
}