import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5"

import Dish from './DishesAndRestaurants/Dish'
import Restaurant from './DishesAndRestaurants/Restaurant'

function Search() {
  const [active, setActive] = useState("Dishes") // Default is "Dishes"
  const [input, setInput] = useState("")
  const [placeholder, setPlaceholder] = useState("Search for Foods and Restaurants..")

  return (
    <>
      <div className="pt-36 flex justify-center">
        <div className="w-2/4 px-2 py-1 border-2 flex justify-between">
          <input 
            className="focus:outline-none w-full h-full px-4 py-2" 
            placeholder={placeholder}
            onChange={(e) => setInput(e.target.value)} 
            value={input} 
          />
          <IoSearch className="h-8 w-6 text-gray-400" />
        </div>
      </div>

      <div className="flex justify-center gap-2 pt-2">
        <button
          onClick={() => {
            setActive('Dishes')
            setInput("") // Clear input when switching
            setPlaceholder('Search for Foods..')
          }}
          className={`border-2 p-2 rounded-md ${active === "Dishes" ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          Dishes
        </button>

        <button
          onClick={() => {
            setActive("Restaurants")
            setInput("") // Clear input when switching
            setPlaceholder('Search for Restaurants..')
          }}
          className={`border-2 p-2 rounded-md ${active === "Restaurants" ? 'bg-gray-600 text-white' : 'bg-white text-black'}`}
        >
          Restaurants
        </button>
      </div>

      <div>
        {active === 'Dishes' && <Dish input={input} />}
        {active === 'Restaurants' && <Restaurant input={input} />}
      </div>
    </>
  )
}

export default Search
