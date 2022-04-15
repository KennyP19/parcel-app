import React from 'react'
import '../App.css'
import { useState } from 'react'

export const Modal = ({closeModal, action, modalType, data, searchList}) => {

  data = data || {email: '', firstName: '', lastName: '', location: '', recipientName: ''}
  searchList = searchList || []

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
        <h2 style={{marginBottom: '40px', marginTop: '0'}}>{title}</h2>
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
    const initialVal = data.recipientName !== '' ? data.recipientName + ' (' + data.location + ')' : ''

    const [searchInput, setSearchInput] = useState(initialVal)
    const [isFiltered, setIsFiltered] = useState(false)

    const isUpdate = data.id !== undefined
    const title = isUpdate ? 'Update Parcel' : 'Log new Parcel'

    const list = []
    searchList.forEach(element => {
      let recipientName = element.firstName + ' ' + element.lastName
      let item = recipientName + ' (' + element.location + ')'
      list.push({key: element.id, item})
    });

    const filterList = (val) => {
      let filters = val.item.toLowerCase().includes(searchInput)
      if (val === searchInput) {
        isFiltered(false)
        return
      }
      if (filters) return val
    }

    const setValue = (val) => {
      setSearchInput(val)
      val !== '' ? setIsFiltered(true) : setIsFiltered(false)
    }

    const displaySearch = (val) => {
      setSearchInput(val)
      setIsFiltered(false)
    }

    const parseInput = () => {
      const recipientName = searchInput.split(' ')[0] + ' ' + searchInput.split(' ')[1]
      const location = searchInput.split(' ')[2].slice(1, -1)

      return {recipientName, location}
    }

    const addParcel = (e) => {
      e.preventDefault()
      const input = parseInput()
      console.log(input)
      action(input.recipientName, input.location)
    }

    const updateParcel = (e) => {
      e.preventDefault()
      const input = parseInput()
      action(input)
    }

    return (
      <form onSubmit={isUpdate ? updateParcel : addParcel}>
        <h2 style={{marginBottom: '40px', marginTop: '0'}}>{title}</h2>
        Recipient
        <input className='sign-input' onChange={(e) => setValue(e.target.value)} value={searchInput}  placeholder={'Search...'} type='search'></input>
        <div className='search-result'>
          {isFiltered && list.filter(val => filterList(val)).map((val) => {
            return (
              <div className='filter-item' key={val.key} onClick={() => displaySearch(val.item)}>
                {val.item}
              </div>
            )
          })}
        </div>
        {/* Destination */}
        {/* <input className='sign-input'  onChange={(e) => setLocation(e.target.value)} value={location} ></input>  */}
        <BottomButtons submit={isUpdate ? updateParcel : addParcel} title={isUpdate ? 'Update Parcel' : 'Add Parcel'}/>
      </form>
    )
  }

  const BottomButtons = ({title}) => {
    return (
      <div style={{display: 'flex', marginTop: '20px'}}>
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