import React,{useState , createContext}from 'react'
import NavBar from './component/NavBar'
import Foods from './component/Foods'
import Popular from './component/Popular'
import './App.css'
import Delivery from './component/Delivery'
import Footer from './component/Footer'
import { BrowserRouter as Router,Route , Routes} from 'react-router-dom'
import Menu from './component/Menu'
import { MyProvider } from './component/LocationName'
import Search from './component/Search'
import CartItems from './component/CartItems'
export const LocationContext = createContext('location Data')

function App() {
  const [long , setLong] = useState();
  const [lat , setLat] = useState();
    
  return (
    <div>
    <Router>
      <LocationContext.Provider value={{ long, setLong, lat, setLat }}>
       <MyProvider> 
        <NavBar />
       
        <Routes>
          <Route path='/' element={
            <>
              <Foods />
              <Popular />
              <Delivery />
              <Footer />  
            </> } 
          />
          <Route path='/Search' element={<Search/>}/>
          <Route path='/RestaurantMenu/:id' element={<Menu />} />
          <Route  path='/Cart' element = {<CartItems/>}/>
        </Routes>
        </MyProvider>
      </LocationContext.Provider>
    </Router>
  </div>
  )
}

export default App
