import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import Empty from '../EmptyCart.png';
import { removeFromCart } from './Reducer';

function CartItems() {
    const cartItems = useSelector((state) => state.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item?.Price, 0);
    const dispatch = useDispatch();

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-24">
                <img src={Empty} alt="Empty Cart" className="h-46 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
                <p className="text-gray-500 mb-4">You can go to the home page to view more restaurants</p>
            </div>
        );
    }

    return (
        <>
            <div className="mt-24 flex justify-around font-semibold text-gray-700">
                <h1 className="text-[36px]">Cart Dishes</h1>
                <h1 className="text-[36px]">Cart Total</h1>
            </div>
            <div className="mb-5 pl-40 flex gap-2">
                <div className="w-3/5 p-0">
                    <div className="h-[500px] overflow-y-scroll pr-4">
                        {cartItems.map((item, i) => (
                            <div key={i} className="border h-48 rounded-lg p-4 shadow-md w-full flex items-start bg-white mb-4">
                                <div className="flex-1 pt-4">
                                    <div className="text-gray-500 text-sm mb-1">By {item?.RestaurantName}</div>
                                    <div className="text-lg font-semibold mb-1">{item?.Name}</div>
                                    <div className="text-xl font-bold text-gray-900">₹{Math.ceil(item?.Price)}</div>
                                </div>
                                <div className="relative w-[150px] h-[140px] ml-4 flex flex-col gap-1">
                                    <img src={item?.Image} alt={item.Name} className="w-full h-full object-cover rounded-lg" />
                                    <button 
                                        className="bg-red-800 text-white font-bold shadow-md py-1 rounded"
                                        onClick={() => dispatch(removeFromCart({ key: i }))}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="w-1/2 border-2 border-solid border-gray-200 px-12 py-3 rounded-lg relative"> 
                    <div className="h-[400px] overflow-y-auto pr-4">
                        {cartItems.map((item, i) => (
                            <div key={i} className="py-3 flex justify-between">
                                <p>{item.Name}</p>    
                                <p>₹{Math.ceil(item.Price)} x 1</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-[1px] border-solid border-gray-400 my-4"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full flex  justify-between  px-20 py-4 bg-white rounded-lg shadow-md">
                        <p>Total Price</p>
                        <p>₹{Math.ceil(totalPrice)}/-</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartItems;
