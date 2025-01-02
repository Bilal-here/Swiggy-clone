import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { IoIceCream } from 'react-icons/io5';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [val, setVal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Handle next slide
  const handleNext = useCallback((e) => {
    e.stopPropagation(); // Prevent event bubbling for the next button
    if (val < 198) {
      setVal((prev) => prev + 49.5);
    }
  }, [val]);

  // Handle previous slide
  const handlePrev = useCallback((e) => {
    e.stopPropagation(); // Prevent event bubbling for the previous button
    if (val > 0) {
      setVal((prev) => prev - 49.5);
    }
  }, [val]);

  // Fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.47832353074318&lng=78.37417326449751&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
        setFoods(res?.data?.data?.cards[0]?.card?.card?.imageGridCards?.info);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 850);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="foods-container">
      {loading ? (
        <div className="bg-gray-800 w-full mt-24 h-80 flex flex-col items-center justify-center">
          <IoIceCream className="text-5xl text-gray-100 animate-bounce" />
          <p className="mt-2 text-lg text-gray-200">Looking for great food near you...</p>
        </div>
      ) : (
        <div className="content-container w-3/4 mx-auto mt-24 m-4 p-2">
          {/* Only display this section when loading is false */}
          {!loading && (
            <div className="flex justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-950">What's on your mind?</h1>
              <div className="flex gap-2 text-2xl cursor-pointer">
                <div
                  className={val > 0 ? 'border-2 border-solid bg-gray-200 text-black text-base rounded-3xl p-2' : 'border-2 border-solid bg-gray-200 text-gray-400 text-base rounded-3xl p-2'}
                  onClick={handlePrev}
                >
                  <FaArrowLeft />
                </div>
                <div
                  className={val === 198 ? 'border-2 border-solid text-base bg-gray-200 text-gray-400 rounded-3xl p-2' : 'border-2 border-solid bg-gray-200 text-black text-base rounded-3xl p-2'}
                  onClick={handleNext}
                >
                  <FaArrowRight />
                </div>
              </div>
            </div>
          )}

          {/* Food Image Section */}
          <div className="h-56 w-full overflow-hidden border-b-2 border-solid border-gray-200"> 
            <div
              style={{ transform: `translateX(-${val}%)`, transition: 'transform 0.5s ease-in-out' }}
              className="h-44 flex gap-7 cursor-pointer"
            >
              {foods.map((food, i) => (
                <div
                  key={food.id+1}
                  className="h-full w-auto rounded-lg flex-shrink-0"
                >
                  {console.log(food.id)}
                  <img
                    className="h-full w-auto rounded-lg"
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${food.imageId}`}
                    alt="foodslider"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Foods;
