import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

function Restaurant({ input }) {
  const [restaurants, setRestaurants] = useState([]);
  const [exactRestaurant, setExactRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (input && input.length > 2) {
      setLoading(true);
      axios
        .get(`https://swiggy-proxy-1.onrender.com/api/restaurant-search?input=${input}`)
        .then((res) => {
          const restaurantData = res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT;
          if (restaurantData) {
            const restaurantsArray = restaurantData.cards || [];
            
            if (restaurantsArray.length === 2) {
              setExactRestaurant(restaurantsArray[0]);
              setRestaurants(restaurantsArray[1]?.card?.card?.restaurants || []);
            } else {
              setExactRestaurant(null);
              setRestaurants(restaurantsArray);
            }
          }
        })
        .finally(() => setTimeout(() => setLoading(false), 500));
    }
  }, [input]);

  const ShimmerPlaceholder = () => (
    <div className="border rounded-lg p-4 shadow-md w-[48%] max-w-[48%] animate-pulse flex">
      <div className="flex-1 pr-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
      <div className="w-[150px] h-[150px] bg-gray-300 rounded-lg"></div>
    </div>
  );

  return (
    <div>
      {exactRestaurant === null && restaurants.length === 0 && !loading && (
        <h1 className="text-xl font-semibold text-center mb-4">Search for Restaurants..</h1>
      )}
      
      {exactRestaurant && (
        <div className="mb-6 flex flex-col justify-center items-center">
          <h2 className="text-lg font-bold my-4">Exact Restaurant</h2>
          {loading ? (
            <ShimmerPlaceholder />
          ) : (
            <div className="border rounded-lg p-4 shadow-md flex items-start max-w-[38%] z-10 bg-white cursor-pointer">
              <div className="flex-1 ">
                <div className="text-gray-800 text-md font-bold mb-1 ">
                  {exactRestaurant?.card?.card?.info?.name}
                </div>
                <div className="flex items-center text-sm text-gray-500 font-bold mb-2 gap-1">
                  <FaStar className="text-SM mr-1" />
                  <span>{exactRestaurant?.card?.card?.info?.avgRating} -</span>
                  <span className="text-sm">
                    {exactRestaurant?.card?.card?.info?.sla.slaString} -
                  </span>
                  <div className="text-sm">
                    {exactRestaurant?.card?.card?.info?.costForTwoMessage}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  {exactRestaurant?.card?.card?.info?.cuisines.join(', ')}
                </div>
              </div>
              <div className="relative w-[150px] h-[140px] ml-4">
                <img
                  src={
                    exactRestaurant?.card?.card?.info?.cloudinaryImageId
                      ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${exactRestaurant?.card?.card?.info?.cloudinaryImageId}`
                      : 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                  }
                  alt={exactRestaurant?.card?.card?.info?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {restaurants.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4 text-center">Similar Restaurants</h2>
          <div className="flex flex-wrap gap-4 justify-center max-w-[1000px] mx-auto p-2">
            {loading ? (
              <>
                <ShimmerPlaceholder />
                <ShimmerPlaceholder />
                <ShimmerPlaceholder />
                <ShimmerPlaceholder />
              </>
            ) : (
              restaurants.map((item, i) => (
                <div key={i} className="border rounded-lg p-4 shadow-md w-[48%] max-w-[48%] flex items-start z-10 bg-white cursor-pointer">
                  <div className="flex-1">
                    <div className="text-gray-800 text-md font-bold mb-1">
                      {item?.info?.name || item?.card?.card?.info?.name}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 font-bold mb-2 gap-2">
                      <FaStar className="text-gray-500 mr-1" />
                      <span>{item?.info?.avgRating || item?.card?.card?.info?.avgRating}</span> -
                      <div className="text-sm text-gray-500">
                        {item?.info?.sla?.slaString || item?.card?.card?.info?.sla?.slaString}
                      </div> -
                      <div className="text-sm text-gray-500">
                        {item?.info?.costForTwo || item?.card?.card?.info?.costForTwoMessage}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      {item?.info?.cuisines ? item?.info?.cuisines.join(", ") : item?.card?.card?.info?.cuisines.join(", ")}
                    </div>
                  </div>
                  <div className="relative w-[150px] h-[140px] ml-4">
                    <img
                      src={
                        item?.info?.cloudinaryImageId
                          ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${item.info.cloudinaryImageId}`
                          : item?.card?.card?.info?.cloudinaryImageId
                          ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${item.card.card.info.cloudinaryImageId}`
                          : 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                      }
                      alt={item?.info?.name || 'Dish image'}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      {/* Shimmer effect for loading restaurants */}
      {loading && (
        <div className="flex flex-wrap gap-4 justify-center max-w-[1000px] mx-auto p-2">
          <ShimmerPlaceholder />
          <ShimmerPlaceholder />
          <ShimmerPlaceholder />
          <ShimmerPlaceholder />
        </div>
      )}
    </div>
  );
}

export default Restaurant;
