import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { LocationContext } from '../App';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaStar, FaCircle } from 'react-icons/fa';
import { GoTriangleUp } from 'react-icons/go';
import { addToCart } from './Reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {  MdOutlineFastfood } from 'react-icons/md';


function Menu() {
  
  const dispatch = useDispatch()
  const { lat, long } = useContext(LocationContext);
  const { id } = useParams();
  const [openIndices, setOpenIndices] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [name, setName] = useState("");

  const toggleDropdown = (index) => {
    setOpenIndices(openIndices.includes(index) 
      ? openIndices.filter((i) => i !== index) 
      : [...openIndices, index]
    );
  };

  const toggleSubDropdown = (mainIndex, subIndex) => {
    setRecommendedData((prevData) =>
      prevData.map((item, i) =>
        i === mainIndex
          ? {
              ...item,
              subOpenIndices: item.subOpenIndices?.includes(subIndex)
                ? item.subOpenIndices.filter((s) => s !== subIndex)
                : [...(item.subOpenIndices || []), subIndex],
            }
          : item
      )
    );
  };

  useEffect(() => {
    const url = lat && long 
      ? `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
      : `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.4400802&lng=78.3489168&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;

    axios.get(url)
      .then((res) => {
        let cardsArray = res?.data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        if (cardsArray && cardsArray.length > 3) {
          cardsArray = cardsArray.slice(2, cardsArray.length - 2).map((item) => ({
            ...item,
            subOpenIndices: [], // Initialize subOpenIndices for each main category
          }));
          setRecommendedData(cardsArray);
        } else {
          console.log("Not enough items to apply slicing");
        }

        const restaurantName = res?.data?.data?.cards[0]?.card?.card?.text;
        setName(restaurantName);
      })
      .catch((err) => {
        console.log("Error fetching menu data:", err);
      });
  }, [id, lat, long]);

  const renderContent = (item, mainIndex) => {
    // Check if the main category has subcategories
    if (item?.card?.card?.categories) {
      return item.card.card.categories.map((category, subIndex) => (
        category?.itemCards?.length > 1 && (
          <div key={subIndex} className="flex flex-col">
            <button
              onClick={() => toggleSubDropdown(mainIndex, subIndex)}
              className="flex justify-between items-center p-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <span>{category?.title}</span>
              <span className="text-gray-500 transition-transform transform">
                {item.subOpenIndices.includes(subIndex) ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
              </span>
            </button>
            <div className={`transition-all duration-500 ease-in-out  overflow-hidden ${item.subOpenIndices.includes(subIndex) ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-3 text-gray-600 min-h-full ">
                {category?.itemCards?.map((item, j) => (
                    <div key={j} className="border rounded-lg px-16 py-4 h-ful; shadow-md w-full max-w-full flex items-start z-10 bg-white">
                    
                        <div className="flex-1">
                        {item?.card?.info?.isVeg === 1 ? (
                            <FaCircle className="text-green-600 border-[1px] p-[2px] border-solid rounded-sm border-green-800" />
                          ) : (
                            <GoTriangleUp className="text-red-700 border-[1px] p-[1px] border-solid rounded-sm border-red-700" />
                          )}
                          <div className="text-lg font-semibold mb-1">{item?.card?.info?.name}</div>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span className=" text-md font-semibold text-black">₹{item?.card?.info?.defaultPrice ? item?.card?.info?.defaultPrice/100 : item?.card?.info?.price/100 }</span>
                          </div>
          
                          <div className={Number(item?.card?.info?.ratings?.aggregatedRating?.rating) > 4.0 ? 'flex p-0 text-green-800' : 'flex p-0 text-green-600' }>
                          <FaStar className=" mr-1 mt-[3.5px]" />
                          <p >{item?.card?.info?.ratings?.aggregatedRating?.rating || <span className='text-green-800'>4.1</span>}</p>
                            </div>
                            <div className="text-md font-medium mb-1">{item?.card?.info?.description}</div>
                          
                        </div>
                        <div className="relative w-[150px] h-[140px] ml-4">
                          <img
                            src={
                              item?.card?.info?.imageId != null
                                ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_500,h_500,c_fit/${item?.card?.info?.imageId}`
                                : `https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
                            }
                            alt={item?.card?.info?.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-green-600 font-bold shadow-md px-6 py-2 rounded "
                          onClick={ ()=>{
                            dispatch(addToCart({
                              Name : item?.card?.info?.name ,
                              Price : item?.card?.info?.price  ? item?.card?.info?.price/100 : item?.card?.info?.defaultPrice/100,
                              RestaurantName : name,
                              Image : item?.card?.info?.imageId != null
                              ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_500,h_500,c_fit/${item?.card?.info?.imageId}`
                              : `https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
                            }))
                          }}
                          >
                            ADD
                          </button>
                        </div>
                      </div>
                ))}
              </div>
            </div>
          </div>
        )
      ));
    }

    // Render main category items if no subcategories are available
    if (item?.card?.card?.itemCards) {
      return item.card.card.itemCards.map((item, i) => (
        <div key={i} className="border rounded-lg px-16 py-4 shadow-md  w-full max-w-full flex items-start z-10 bg-white">
          
              <div className="flex-1">
              {item?.card?.info?.isVeg === 1 ? (
                  <FaCircle className="text-green-600 border-[1px] p-[2px] border-solid rounded-sm border-green-800" />
                ) : (
                  <GoTriangleUp className="text-red-700 border-[1px] p-[1px] border-solid rounded-sm border-red-700" />
                )}
                <div className="text-lg font-semibold mb-1">{item?.card?.info?.name}</div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className=" text-md font-semibold text-black">₹{item?.card?.info?.price ? item?.card?.info?.price/100 : item?.card?.info?.defaultPrice/100 }</span>
                </div>

                <div className={Number(item?.card?.info?.ratings?.aggregatedRating?.rating) > 4.0 ? 'flex p-0 text-green-800' : 'flex p-0 text-green-600'}>
                <FaStar className=" mr-1 mt-[3.5px]" />
                <p >{item?.card?.info?.ratings?.aggregatedRating?.rating || <span className='text-green-800'>4.1</span>}</p>
                  </div>
                  <div className="text-md font-medium mb-1">{item?.card?.info?.description}</div>
                
              </div>
              <div className="relative w-[150px] h-[140px] ml-4">
                <img
                  src={
                    item?.card?.info?.imageId != null
                      ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_500,h_500,c_fit/${item?.card?.info?.imageId}`
                      : `https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
                  }
                  alt={item?.card?.info?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-green-600 font-bold shadow-md px-6 py-2 rounded "
                onClick={()=>{
                  dispatch(addToCart( { 
                    Name : item?.card?.info?.name ,
                    Price : item?.card?.info?.price  ? item?.card?.info?.price/100 : item?.card?.info?.defaultPrice/100,
                    RestaurantName : name,
                    Image : item?.card?.info?.imageId != null
                    ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_500,h_500,c_fit/${item?.card?.info?.imageId}`
                    : `https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
                   }))
                }}
                >
                  ADD
                </button>
              </div>
            </div>
      ));
    }

    return <p>No content available</p>;
  };
  
    //Displaying cart div when numOfCartItems is not empty
    const numOfCartItems = useSelector((state)=>{
      return state.cartItems.length
     })
  

  return (
    <div className="w-screen min-h-screen bg-gray-50 py-10">
      {numOfCartItems > 0 && (<div className='fixed bottom-0 mx-[25%] w-1/2 text-center flex justify-between px-6 items-center text-white bg-green-600 h-12 z-50'>
          <p>{numOfCartItems} item added</p>
         <Link to={"/Cart"}><p>View Cart <MdOutlineFastfood className='inline-flex ml-1' /></p></Link> 
      </div>)}
      <div className="w-2/3 mx-auto mb-40">
        {name ? <h1 className="text-3xl font-bold text-gray-800 mt-24 mb-8">{name}'s Menu</h1> : ""}
        
        <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
          {recommendedData.map((item, index) => (
            <div key={index} className="group">
              <button
                onClick={() => toggleDropdown(index)}
                className="w-full flex justify-between items-center p-5 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-t-lg transition"
              >
                <span>{item?.card?.card?.title}</span>
                <span className="text-gray-500 transition-transform transform group-hover:scale-110">
                  {openIndices.includes(index) ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                </span>
              </button>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndices.includes(index) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                style={{
                  transform: openIndices.includes(index) ? 'scaleY(1)' : 'scaleY(0.95)',
                  transition: 'max-height 0.5s ease, opacity 0.3s ease, transform 0.3s ease',
                }}
              >
                <div className={`p-5 transition-opacity duration-300 ${openIndices.includes(index) ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-gray-600 text-sm leading-relaxed ">
                    {renderContent(item, index)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Menu;
