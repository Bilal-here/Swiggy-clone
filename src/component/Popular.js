import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaArrowRight , FaArrowLeft } from "react-icons/fa";

function Popular() {
  const [val, setVal] = useState(0);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  function handleNext() {
    return val >= 1710 ? "" : setVal(prev => prev + 213.75);
  }

  function handlePrev() {
    return val > 0 ? setVal(prev => prev - 213.75) : "";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before the API call
        const res = await axios.get("https://swiggy-proxy-1.onrender.com/api/popular");
        setPopular(res?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white">
      <div className="h-3/4 w-3/4 mx-auto m-4 p-2">
        {/* Only display title and navigation when not loading */}
        {!loading && (
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-950">Top Restaurants Chains in Hyderabad</h1>
            <div className="flex gap-2 text-2xl cursor-pointer"> 
            <div className={val>0 ? 'border-2 border-solid bg-gray-200 text-black text-base  rounded-3xl p-2': 'border-2 border-solid bg-gray-200 text-gray-400 text-base rounded-3xl p-2' } onClick={handlePrev}><FaArrowLeft  /></div>
              <div className={val == 1710 ? 'border-2 border-solid text-base  bg-gray-200 text-gray-400  rounded-3xl p-2': 'border-2 border-solid  bg-gray-200 text-black text-base rounded-3xl p-2'}  onClick={handleNext}><FaArrowRight  /></div>
            </div>
          </div>
        )}

        {loading ? (
          // Full shimmer effect for entire container
          <div className="grid grid-cols-1 py-8 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="min-h-[100px] min-w-[280px] bg-gray-100 rounded-lg p-2">
                <div className="h-44 w-full bg-gray-400 rounded-xl mb-4"></div>
                <div className="p-2">
                  <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-400 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-400 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-400 rounded w-1/3 mb-2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-4 transition-transform duration-500 overflow-hidden h-3/4 border-b-2 pt-4">
            
            {popular.map((restaurant, i) => (
              <div key={i} className="min-h-[100px] min-w-[280px] rounded-lg p-2"
                style={{
                  transform: `translateX(-${val}%)`,
                  transition: 'transform 0.5s ease-in-out'
                }}>
                <Link to={`/RestaurantMenu/${restaurant?.info?.id}`}>
                  <div className='transform transition-transform duration-300 group hover:scale-95'>
                    <img
                      alt={restaurant?.info?.name || "Restaurant Image"}
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurant?.info?.cloudinaryImageId}`}
                      className="h-44 w-full object-cover rounded-xl"
                    />
                    <div className="p-2">
                      <h3 className="text-md font-bold text-gray-800">{restaurant?.info?.name}</h3>
                      <p className="text-black flex items-center text-md">
                        <span className="text-white bg-green-700 text-xs p-[3px] mr-1 rounded-xl">
                          <FaStar className='text-white' />
                        </span>
                        {restaurant?.info?.avgRating || "4.0"} • {restaurant?.info?.sla.slaString || "30-40 mins"}
                      </p>
                      <p className="text-sm text-gray-600">{restaurant?.info?.cuisines?.join(", ") || "Various Cuisines"}</p>
                      <p className="text-sm text-gray-600">{restaurant?.info?.locality || "Location"}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Popular;
