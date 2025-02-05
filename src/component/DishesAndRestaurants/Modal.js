import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { GoTriangleUp } from 'react-icons/go';

function Modal({ dish, onClose }) {
  if (!dish) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <img
          src={
            dish?.card?.card?.info.imageId
              ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_500,h_500,c_fit/${dish?.card?.card?.info?.imageId}`
              : 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          alt={dish?.card?.card?.info?.name}
        />
        <div className="my-1">
          {dish?.card?.card?.info?.isVeg === 1 ? (
            <FaCircle className="text-green-600 border-[1px] p-[2px] border-solid rounded-sm border-green-800 mx-" />
          ) : (
            <GoTriangleUp className="text-red-700 border-[1px] border-solid rounded-sm border-red-700" />
          )}
        </div>
        <h2 className="text-lg font-medium">{dish?.card?.card?.info?.name}</h2>
        <p>₹{dish?.card?.card?.info?.price / 100}</p>
        <p>{dish?.card?.card?.info?.description}</p>
        <button
          className="mt-4 px-4 py-2 bg-white text-green-600 font-bold shadow-md rounded border-2 solid border-gray-300"
          onClick={onClose}
        >
          ADD
        </button>
      </div>
    </div>
  );
}

export default Modal;
