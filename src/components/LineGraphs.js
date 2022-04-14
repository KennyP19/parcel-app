import DatePicker from 'react-datepicker'
import { Line } from 'react-chartjs-2'
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from 'react';
import { getParsedDate, getDatesInRange, getParcelDataInRange } from '../functions';

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

export function Graph1({parcelData}) {
    const todaysDate = new Date();
    const initialDate = new Date(todaysDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  
    const [dateRange, setDateRange] = useState([initialDate, todaysDate]);
    const [startDate, endDate] = dateRange;
    const [datesInRange, setDatesInRange] = useState([])

    const [scannedParcels, setscannedParcels] = useState([])
    const [collectedParcels, setCollectedParcels] = useState([])

    useEffect(() => {
        const collected = parcelData.filter(data => data.status === 'collected').map(data => data.dateCollected)
        const scanned = parcelData.map(data => data.dateRecieved)
        
        try {
            if (endDate === null || endDate.getTime() === startDate.getTime()) {
                const hours = [...Array(24).keys()]
                setDatesInRange(hours)
        
                const scanned_hours = scanned.filter(time => getParsedDate(time, 'stats_timestamp') === getParsedDate(startDate, 'stats')).map(date => date.toDate().getHours())
                const collected_hours = collected.filter(time => getParsedDate(time, 'stats_timestamp') === getParsedDate(startDate, 'stats')).map(date => date.toDate().getHours())
                const scannedData = getParcelDataInRange(hours, scanned_hours)
                const collectedData = getParcelDataInRange(hours, collected_hours)
        
                setCollectedParcels(collectedData)
                setscannedParcels(scannedData)
                
                return
            }
        } catch (error) {
            console.log(error)
        }
  
        const dates = getDatesInRange(startDate, endDate);
        const datesInRange_formatted = dates.map(element => getParsedDate(element, 'stats'))
        setDatesInRange(datesInRange_formatted)

        const scanned_formatted = scanned.map(element => getParsedDate(element, 'stats_timestamp'))
        const collected_formatted = collected.map(element => getParsedDate(element, 'stats_timestamp'))
  
        const scannedData = getParcelDataInRange(datesInRange_formatted, scanned_formatted)
        const collectedData = getParcelDataInRange(datesInRange_formatted, collected_formatted)
  
        setCollectedParcels(collectedData)
        setscannedParcels(scannedData)

        return
    },[dateRange])
    

    const graph_data = {
        labels: datesInRange,
        datasets: [
          {
            label: "Parcels scanned",
            data: scannedParcels,
            borderColor: 'rgb(255, 99, 132)'
          },
          {
            label: "Parcels Collected",
            data: collectedParcels,
            borderColor: '#0080FF'
          }
        ]
      }

    return (
        <div className='dashboard-container'>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{fontSize: '30px', display: 'flex'}}>
              Parcels Scanned and Collected
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
          <Line data={graph_data}/>
      </div>
    )
}

export function Graph2() {
    return (
      <div className='dashboard-container'>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{fontSize: '30px', display: 'flex'}}>
            Peak Scan and Collection
          </div>
          <div style={{display: 'flex', minWidth: '250px'}}>
          </div>
        </div>
        {/* <Line data={graph_data}/> */}
    </div>
    )
}