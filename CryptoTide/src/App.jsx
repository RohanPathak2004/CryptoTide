import Navbar from "./Components/NavBar/Navbar.jsx";
import {Routes, Route} from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Coin from "./Pages/Coin/Coin.jsx";
import Footer from "./Footer/Footer.jsx";
function App() {

  return (
    <div className="App">
      <Navbar />
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/coin/:coinId" element={<Coin/>}/>
        </Routes>
        <Footer/>
    </div>
  )
}

export default App
