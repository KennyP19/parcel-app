import React from 'react'
import { Line } from 'react-chartjs-2'
import { getDocs, collection, doc} from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import app from '../../firebaseconfig';
import { getDate, getDatesInRange,  } from '../../functions';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


const Statistics = () => {

  const auth = getAuth(app)
	const db = useOutletContext()

	const [user, loading, error] = useAuthState(auth);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {

    const getData = async () => {
      const dataCollection = collection(db, 'users', user.uid, 'parcels')

      try {
        const docSnaps = await getDocs(dataCollection)

      } catch (error) {
        console.log(error)
      }
    }

    const setInitialDates = () => {
      const todaysDate = new Date();
      const initialDate = new Date(todaysDate.getTime() - 7 * 24 * 60 * 60 * 1000);

      setDateRange([initialDate, todaysDate]);
      const dates = getDatesInRange(initialDate, todaysDate);
      console.log(dates);
    }

    const setInitialDatas = () => {
      
    }

		if (loading) return

		if (user) {

      setInitialDates();

      // getData()

		}
	},[loading, user, db, error, setDateRange])

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = [...Array(24).keys()]

  const weekly = {
    labels: days,
    datasets: [
      {
        label: "Parcels scanned",
        data: [1, 2, 5, 4, 1, 2, 3],
        borderColor: 'rgb(255, 99, 132)'
      }
    ]
  }

  const daily = {
    labels: hours,
    datasets: [
      {
        label: "Parcels scanned",
        data: [1, 2, 5, 4, 1, 2, 3],
        borderColor: 'rgb(255, 99, 132)'
      }
    ]
  }

  return (
    <>
      <div className='dashboard-container'>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
					<div style={{fontSize: '30px', display: 'flex'}}>
						Parcels
					</div>
					<div style={{display: 'flex', minWidth: '250px'}}>
            <DatePicker 
              className='searchbar'  
              dateFormat={'dd-MM-yyyy'}     
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              />
					</div>
				</div>
          <Line data={weekly}/>
      </div>
      <div className='dashboard-container'>
          <div style={{fontSize: '30px', display: 'flex'}}>
              Daily Scans and Collections
          </div>
          <Line data={daily}/>
      </div>
    </>
  )
}

export default Statistics