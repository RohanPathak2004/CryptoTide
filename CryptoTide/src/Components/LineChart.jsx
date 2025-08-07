import React, {useEffect, useState} from 'react'
import {Chart} from "react-google-charts";

const LineChart = ({historicalData}) => {
    const [data, setData] = useState([["date","prices"]]);
    useEffect(()=>{
        let dataCopy = [["data", "prices"]];
        if(historicalData.prices){
            historicalData.prices.map((price,index)=>{
                dataCopy.push([`(${new Date(price[0]).toLocaleDateString().slice(0,-5)})`, price[1]])
            })
            setData(dataCopy);
        }
    },[historicalData])
    return (
        <Chart chartType="LineChart" data={data} height="100%" legendToggle/>


    )
}
export default LineChart
