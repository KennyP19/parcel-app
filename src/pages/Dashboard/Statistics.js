import React from 'react'
import { getDocs, collection} from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import app from '../../firebaseconfig';
import "react-datepicker/dist/react-datepicker.css";
import { Graph1, Graph2 } from '../../components/LineGraphs';


const Statistics = () => {

  const auth = getAuth(app)
	const db = useOutletContext()

	const [user, loading, error] = useAuthState(auth);

  const [parcelData, setParcelData] = useState()

  useEffect(() => {

    const getData = async () => {
      const dataCollection = collection(db, 'users', user.uid, 'parcels')

      try {
        const docSnaps = await getDocs(dataCollection)
        const parcelDatas = docSnaps.docs.map(val => val.data())
        setParcelData(parcelDatas)

      } catch (error) {
        console.log(error)
      }
    }

		if (loading) return

		if (user) {
      getData()
		}
	},[loading, user, db, error])

  return (
    <>
      {parcelData && <Graph1 parcelData={parcelData}/>}
      {parcelData && <Graph2 parcelData={parcelData}/>}
    </>
  )
}

export default Statistics