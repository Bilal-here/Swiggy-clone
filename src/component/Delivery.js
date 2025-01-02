import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { LocationContext } from '../App';

function Delivery() {
  const { lat, long } = useContext(LocationContext);
  const [popular, setPopular] = useState([]); 
  const [filterItems, setFilterItems] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          lat && long
            ? `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
            : `https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4400802&lng=78.3489168&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
        );
        setPopular(response?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [lat, long]);

  const applyFilter = (filterType) => {
    setLoading(true); 
    
    let copyDeliveryItems = [...popular]; 
    let filteredItems = [];

    if (filterType === "ItemsWithRating4.3+") {
      filteredItems = copyDeliveryItems.filter((item) => {
        return item?.info?.avgRating >= 4.3;
      });
      console.log("Filtered items:", filteredItems); 
      setFilterItems(filteredItems); 
    } else if (filterType === "PriceLowToHigh") {
      filteredItems = copyDeliveryItems.sort((a, b) => {
        
        const aCost = a?.info?.costForTwo.split("").splice(1,3).join('');
        const bCost = b?.info?.costForTwo.split("").splice(1,3).join('');
        return aCost - bCost; 
      });
      console.log("Filtered items:", filteredItems); 
      setFilterItems(filteredItems); 
    } else if (filterType === "300-350") {
      filteredItems = copyDeliveryItems.filter((item) => {
        const cost = item?.info?.costForTwo.split("").splice(1,3).join(''); 
        return cost >= 300 && cost <= 350;
      });
      setFilterItems(filteredItems); 
    } else if (filterType === "LessThan300") {
      filteredItems = copyDeliveryItems.filter((item) => {
        const cost = item?.info?.costForTwo.split("").splice(1,3).join(''); 
        return cost < 300; 
      });
      setFilterItems(filteredItems); 
    } else if (filterType === "Clear") {
      setFilterItems([]); 
    }

    setTimeout(() => {
      return setLoading(false);
    }, 400); 
  };

  return (
    <div className="bg-white">
      <div className="w-3/4 mx-auto min-w-7xl px-4 lg:max-w-7xl">
        {!loading && (
          <>
            <h1 className="text-2xl font-bold text-gray-950">Restaurants with online food delivery in Hyderabad</h1>
            <div className='flex gap-10 pt-4'>
              <div className='border-2 border-solid p-2 rounded-3xl cursor-pointer' onClick={() => applyFilter("ItemsWithRating4.3+")}>
                Rating 4.3+
              </div>
              <div className='border-2 border-solid p-2 rounded-3xl cursor-pointer' onClick={() => applyFilter("PriceLowToHigh")}>
                Prices Low To High
              </div>
              <div className='border-2 border-solid p-2 rounded-3xl cursor-pointer' onClick={() => applyFilter("300-350")}>
                Rs.300 - Rs.350
              </div>
              <div className='border-2 border-solid p-2 rounded-3xl cursor-pointer' onClick={() => applyFilter("LessThan300")}>
                Less than 300
              </div>
              <div className='border-2 border-solid p-2 rounded-3xl cursor-pointer' onClick={() => applyFilter("Clear")}>
                Clear Filters
              </div>
            </div>
          </>
        )}

        {loading ? (
          <div className="grid grid-cols-1 py-8 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="min-h-[100px] min-w-[280px] bg-gray-100 animate-pulse rounded-lg p-2">
                <div className='h-44 w-full bg-gray-400 rounded-xl'></div>
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
          <div className="grid grid-col-1 py-8 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {(filterItems.length > 0 ? filterItems : popular || []).map((restaurant, i) => (
              <div key={i} className="min-h-[100px] min-w-[280px] rounded-lg p-2">
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
                      <p className="text-sm text-gray-600">{restaurant?.info?.cuisines?.slice(0, 2).join(", ") || "Various Cuisines"}...</p>
                      <p className="text-sm text-gray-600">{restaurant?.info?.locality || "Location"}</p>
                      <p className="text-sm text-gray-600"><b>{restaurant?.info?.costForTwo || "Rs.400 for 2"}</b></p>
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

export default Delivery;
