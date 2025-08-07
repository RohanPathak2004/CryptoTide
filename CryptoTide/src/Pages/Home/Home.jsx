import React, {useContext, useEffect, useState} from 'react'
import './Home.css'
import {CoinContext} from "../../Context/CoinContext.jsx";
import {Link} from "react-router-dom";
const Home = () => {
    const {AllCoins,Currency} = useContext(CoinContext);
    const [DisplayCoins , setDisplayCoins] = useState([]);
    const [input,setInput] = useState("");
    const inputHandler = (event)=>{
        setInput(event.target.value);
        if(event.target.value === ""){
            setDisplayCoins(AllCoins);
        }
    }
    const searchHandler = async (event)=>{
        event.preventDefault();
        const coins = await AllCoins.filter(coin=>{ return coin.name.toLowerCase().includes(input.toLowerCase())});
        setDisplayCoins(coins);
    }
    useEffect(()=>{
        setDisplayCoins(AllCoins);

    },[AllCoins])
    return (

            <div className="home">
                <h1 className="hero">Largest <br/>Crypto Marketplace</h1>
                <p>Welcome to the world's largest cryptocurrency marketplace.
                   <br/>Sign Up to explore more about Cryptos.</p>
                <form onSubmit={searchHandler}>
                    <input  list="coinlist" onChange={inputHandler} value={input} type="text" placeholder="Search Cryptos..." required/>
                    <datalist id="coinlist">
                        {AllCoins.map((coin,index)=>(
                            <option key={index} value={coin.name}/>
                        ))}
                    </datalist>

                    <button type="submit">Search</button>
                </form>
                <div className="crypto-table">
                    <div className="table-layout">
                        <p>#</p>
                        <p>Coins</p>
                        <p>Price</p>
                        <p style={{textAlign:"center"}}>24H Change</p>
                        <p className="market-cap" style={{textAlign:"right"}}>Market Cap</p>
                    </div>
                    {DisplayCoins.slice(0,10).map((coin,index)=>(
                        <Link to={`/coin/${coin.id}`} className="table-layout" key={index}>
                            <p>{coin.market_cap_rank}</p>
                            <div className="coin-container">
                            <img className="coin-img" src={coin.image}></img>
                                <p>{coin.name+ "-" +coin.symbol}</p>
                            </div>
                            <p>{Currency.symbol+coin.current_price.toLocaleString()}</p>
                            <p className={(coin.price_change_percentage_24h>0)? "green":"red"}>
                                {Math.floor(coin.price_change_percentage_24h*100)/100}
                            </p>
                            <p style={{textAlign:"right"}}>{Currency.symbol}{coin.market_cap.toLocaleString()}</p>
                        </Link>
                    ))}
                </div>
            </div>


    )
}
export default Home
