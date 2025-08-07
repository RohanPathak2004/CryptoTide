import React from 'react'
import './Footer.css'
const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className="footer">
            <p>Copyright @ {year}, CryptoTide - All rights Reserved</p>
        </div>
    )
}
export default Footer
