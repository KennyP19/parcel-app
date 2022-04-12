import React from 'react'
import '../App.css'
import { useState } from 'react'

const Modal = ({setOpenModal, action, modalType}) => {

  const RecipientModal = () => {
    const [email, setEmail] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [location, setLocation] = useState('')

    const addUser = () => {
      action(email, firstName, lastName, location)
    }

    return (
      <>
      <h2 style={{'marginTop' : '0'}}>Add Recipient</h2>
      Email
      <input className='sign-input' onChange={(e) => setEmail(e.target.value)}></input>
      First name
      <input className='sign-input'  onChange={(e) => setfirstName(e.target.value)}></input>
      Last Name
      <input className='sign-input'  onChange={(e) => setlastName(e.target.value)}></input>
      Location
      <input className='sign-input'  onChange={(e) => setLocation(e.target.value)}></input>
      <BottomButtons submit={addUser}/>
      </>
    )
  }

  const ParcelModal = () => {
    const [recipientName, setRecipientName] = useState('')
    const [location, setLocation] = useState('')

    const addParcel = () => {
      action(recipientName, location)
     }

    return (
      <>
      <h2 style={{'marginTop' : '0'}}>Log New Parcel</h2>
      Recipient name
      <input className='sign-input' onChange={(e) => setRecipientName(e.target.value)}></input>
      Destination
      <input className='sign-input'  onChange={(e) => setLocation(e.target.value)}></input> 
      <BottomButtons submit={addParcel}/>
      </>
    )
  }

  const BottomButtons = ({submit}) => {
    return (
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <button className='modal-button' onClick={() => setOpenModal(false)}> Close</button>
        {modalType === 'recipient' ?
            <button className='modal-button' onClick={() => submit()}> Add Recipient</button>
            :
            <button className='modal-button' onClick={() => submit()}> Add Parcel</button>
        }
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

export default Modal