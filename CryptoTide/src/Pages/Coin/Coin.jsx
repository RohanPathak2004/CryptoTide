import React, {useContext, useEffect, useState} from 'react'
import './Coin.css'
import {useParams} from "react-router-dom";
import {FadeLoader} from "react-spinners";
import {CoinContext} from "../../Context/CoinContext.jsx";
import LineChart from "../../Components/LineChart.jsx";
const API_KEY = import.meta.env.COIN_GECKO_API_KEY;
const options_HD = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': API_KEY}
};
const Coin = () => {
    const {coinId} = useParams();
    const [coinData,setCoinData] = useState([]);
    const [historicalData,setHistoricalData] = useState([]);
    const {Currency} = useContext(CoinContext);
    const API_OPTIONS = {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    };
    const fetchCoinData = async () => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, API_OPTIONS);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCoinData(data);
        } catch (err) {
            console.error('Error fetching coin data:', err);
        }
    }



const fetchHistoricalData = async () => {
    try {
        // Convert currency symbols to lowercase codes
        const currencyCode = Currency.name.toLowerCase?.() || 'usd'; // fallback to usd if undefined
        
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currencyCode}&days=10&interval=daily`,
            {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            }
        );
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        setHistoricalData(data);
    } catch (error) {
        console.error("Error fetching historical data:", error);
    }
};

    useEffect(()=>{
        fetchCoinData();
        fetchHistoricalData();
        console.log("Coin data fetched");
    },[Currency])
    console.log(coinData);

    return(
        (coinData.length!==0&&historicalData.length!==0)?(
            <div>
            <div className="coin">
                <img src={coinData.image.large} alt="coin-img"></img>
                <p><b>{coinData.name}({coinData.symbol})</b></p>
            </div>
            <div className="coin-chart">
                <LineChart historicalData={historicalData}/>
            </div>
                <div className="coin-info">
                    <ul>
                    <li>Crypto Market Rank</li>
                    <li>{coinData.market_cap_rank}</li>
                    </ul>
                    <ul>
                        <li>Current Price</li>
                        <li>{Currency.symbol}{coinData.market_data.current_price[Currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>Market Cap</li>
                        <li>{Currency.symbol}{coinData.market_data.market_cap[Currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>High24</li>
                        <li>{Currency.symbol}{coinData.market_data.high_24h[Currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>Low24</li>
                        <li>{Currency.symbol}{coinData.market_data.low_24h[Currency.name].toLocaleString()}</li>
                    </ul>
                </div>
            </div>
        ):
            <div className="Spinner">
                <FadeLoader color={"blue"} loading={true}/>
            </div>
    )
}
export default Coin