import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaStar, FaCircle } from 'react-icons/fa';
import { GoTriangleUp } from 'react-icons/go';
import Modal from './Modal';
import { addToCart } from '../Reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  MdOutlineFastfood } from 'react-icons/md';

function Dish({ input }) {
  const dispatch = useDispatch()
  const [dish, setDish] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [selectedDish, setSelectedDish] = useState(null); 
  

  useEffect(() => {
    if (input && input?.length >= 3) {
      setLoading(true);
      axios
        .get(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=17.4400802&lng=78.3489168&str=${input}&trackingId=undefined&submitAction=ENTER&queryUniqueId=ca695039-e861-0903-c8bf-c205a4cdd78d`)
        .then((res) => {
          if (res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH) {
             setDish(res?.data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards?.splice(1));
          }
         
            setLoading(false);
          
        });
    }
  }, [input]);

  const ShimmerPlaceholder = () => (
    <div className="border rounded-lg p-4 shadow-md w-[48%] max-w-[48%] animate-pulse flex ">
      <div className="flex-1 pr-4">
        <div className="h-4 z-10 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 z-10 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 z-10 bg-gray-300 rounded w-1/4"></div>
      </div>
      <div className="w-[150px] h-[150px] bg-gray-300 rounded-lg"></div>
    </div>
  );

  const handleMoreDetailsClick = (item) => {
    setSelectedDish(item);
    setShowModal(true);     
  };
  const numOfCartItems = useSelector((state)=>{
    return state.cartItems.length
   })

  return (
    <div>
      
      {dish?.length === 0 && <h1 className="text-xl font-semibold text-center mb-4">Search for foods..</h1>}
      <div className="flex flex-wrap gap-4 mb-12 justify-center max-w-[1000px] mx-auto p-2">
        {loading ? (
          <>
            <ShimmerPlaceholder />
            <ShimmerPlaceholder />
            <ShimmerPlaceholder />
            <ShimmerPlaceholder />
          </>
        ) : (
          dish?.map((item, i) => (
            
            <div key={i} className="border rounded-lg p-4 shadow-md w-[48%] max-w-[48%] flex items-start z-10 bg-white">
              
              <div className="flex-1">
                <div className="text-gray-500 text-sm mb-1">By {item?.card?.card?.restaurant?.info?.name}</div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FaStar className=" mr-1" />
                  <span>{item?.card?.card?.restaurant?.info?.avgRating}</span>
                  <span className="ml-2">{item?.card?.card?.restaurant?.info?.sla.slaString}</span>
                </div>{console.log(item?.card?.card?.info?.isVeg )
                }
                {item?.card?.card?.info?.isVeg === 1 ? (
                  <FaCircle className="text-green-600 border-[1px] p-[2px] border-solid rounded-sm border-green-800" />
                ) : (
                  <GoTriangleUp className="text-red-700 border-[1px] p-[1px] border-solid rounded-sm border-red-700" />
                )}
                <div className="text-lg font-semibold mb-1">{item?.card?.card?.info?.name}</div>
                <div className="text-xl font-bold text-gray-900">₹{item?.card?.card?.info?.price / 100}</div>
                <button
                  className="text-xs mt-1 border-2 border-solid rounded-lg border-gray-200 p-1"
                  onClick={() => handleMoreDetailsClick(item)}
                >
                  More details..
                </button>
              </div>
              <div className="relative w-[150px] h-[140px] ml-4">
                <img
                  src={
                    item.card.card.info.imageId != null
                      ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_500,h_500,c_fit/${item.card.card.info.imageId}`
                      : `https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`
                  }
                  alt={item.card.card.info.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-green-600 font-bold shadow-md px-6 py-2 rounded "
                onClick={()=>{
                  dispatch(addToCart({
                    Name: item?.card?.card?.info?.name , 
                    Image: item.card.card.info.imageId != null
                    ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_500,h_500,c_fit/${item.card.card.info.imageId}`
                    : `https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1` ,
                    Price: item?.card?.card?.info?.price/100,
                    RestaurantName : item?.card?.card?.restaurant?.info?.name,
                    VegNonVeg : item?.card?.card?.info?.isVeg === 1 ?   1 :  0,
                  }))
                }}>
                  ADD
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {showModal && <Modal dish={selectedDish} onClose={() => setShowModal(false)} />}
      {numOfCartItems > 0 && dish ?  (<div className='fixed bottom-0 mx-[25%] w-1/2 text-center flex justify-between px-6 items-center text-white bg-green-600 h-12 z-50'>
          <p>{numOfCartItems} item added</p>
         <Link to={"/Cart"}><p>View Cart <MdOutlineFastfood className='inline-flex ml-1' /></p></Link> 
      </div>) : ""}
    </div>
  );
}

export default Dish;
