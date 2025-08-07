import React, {useContext} from 'react'
import './Navbar.css'
import logo from '../../assets/cryptologo.png';
import arrow from '../../assets/arrow.png';
import {NavLink} from "react-router-dom";
import {CoinContext} from "../../Context/CoinContext.jsx";
const Navbar = () => {
    const {setCurrency} = useContext(CoinContext);

    const CurrencyHandler = (event)=>{
        switch(event.target.value){
            case "usd":setCurrency({
                name: "usd",
                symbol: '$'}

            )
                console.log("usd")
                break;
            case "inr":setCurrency({
                name:"inr",
                symbol:'₹'
            })
                break;
            case "eur":setCurrency({
                name: "eur",
                symbol:'€'
            })
                break;
            default:setCurrency({
                name: "usd",
                symbol: '$'
            })
        }
    }
    return (
        <div className="nav">
            <NavLink to="/" className="logo"><img src={logo} alt="logo"  /> CryptoTide</NavLink>
            <ul className="nav-center">
                <NavLink to="/"><li>Home</li></NavLink>
                <li>Features</li>
                <li>Pricing</li>
                <li>Blog</li>
            </ul>
            <div className="nav-right">
                <select onChange={CurrencyHandler} >
                    <option value="usd">USD</option>
                    <option value="inr">INR</option>
                    <option value="eur">EUR</option>
                </select>
                <button>Sign Up<img src={arrow} alt="arrow"></img></button>
            </div>

        </div>
    )
}
export default Navbar
