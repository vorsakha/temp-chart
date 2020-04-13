import React, { useState, useEffect } from "react"

import { Line } from "react-chartjs-2"

import csvData from "./fetch-csv/ZonAnn.Ts+dSST.csv"


export default function App() {
    const [data, setData] = useState({})

    useEffect(() => {
        setup()
    }, [])

    async function setup() {
        const globalTemps = await getTempData()
        setData({
            labels: globalTemps.years,
            datasets: [
                {
                data: globalTemps.temps,
                label: 'Temperature in °C',
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                lineTension: 0.1,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                borderWidth: 1
                }
            ]
        })
    }
    
      async function getTempData() {
        const response = await fetch(csvData)
        const data = await response.text()
        const years = []
        const temps = []
        const rows = data.split('\n').slice(1)
        rows.forEach(row => {
          const cols = row.split(',')
          years.push(cols[0])
          temps.push(14 + parseFloat(cols[1]))
        })
        return { years, temps, response }
      }
    return(
        <div>
            <h1 className="col-12 text-center">Global temperature chart</h1>
            <div style={{width: "88%"}} className="mx-auto">
                <Line data={data} />
            </div>
        </div>
    )
}