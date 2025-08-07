import {createContext, useEffect, useState} from 'react';
import {meta} from "@eslint/js";

export const CoinContext = createContext()
const API_KEY = import.meta.env.COIN_GECKO_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {accept: 'application/json',API_KEY}
}
const CoinContextProvider = (Props)=>{
    const [AllCoins, setAllCoins] = useState([]);
    const [Currency, setCurrency] = useState({
        name: 'usd',
        symbol: '$'
    });
    console.log(AllCoins);
    const fetchAllCoin= async ()=>{
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency.name}`, API_OPTIONS)
            .then(res => res.json())
            .then(res => setAllCoins(res))
            .catch(err => console.error(err));
    }
    useEffect(()=>{
        fetchAllCoin();
        console.log("data fetched");
    },[Currency])
    const contextValue = {
        AllCoins,
        Currency,
        setCurrency,
    };
    return (
        <CoinContext.Provider value={contextValue}>
            {Props.children}
        </CoinContext.Provider>
    )
}
export default CoinContextProvider;