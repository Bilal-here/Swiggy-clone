import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoIosSearch } from 'react-icons/io';
import { TbBriefcase2 } from 'react-icons/tb';
import { BiSolidOffer } from 'react-icons/bi';
import { IoHelpBuoyOutline } from 'react-icons/io5';
import { MdOutlinePersonOutline, MdOutlineFastfood } from 'react-icons/md';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import { useLocationName } from './LocationName'; 
import { useSelector } from 'react-redux';

function NavBar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { name } = useLocationName(); // Use name from LocationName context

  const numOfCartItems = useSelector((state)=>{
   return state.cartItems.length
      
  })

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='fixed top-0 left-0 right-0 flex items-center justify-center gap-16 p-4 shadow-lg z-20 bg-white'>
      <Link to={"/"}>
        <img
          className='h-12 rounded-xl transition-transform duration-300 hover:scale-110'
          src='https://miro.medium.com/v2/resize:fit:1000/1*TCc6vQVH-3EUiJea76pMbQ.png'
          alt='Logo'
        />
      </Link>

      <p
        onClick={toggleSidebar}
        className="group cursor-pointer font-semibold text-sm text-gray-600 flex items-center"
      >
        {name!="" ? <span className="underline px-2 text-black group-hover:text-orange-600">{name?.split(",",1)}</span>: 
        <span className="underline px-2 text-black group-hover:text-orange-600">Others</span>}

{
  name !== "" ? (
    <span className="opacity-80 font-normal text-gray-500">
      {
        (() => {
          const slicedName = name.slice(name.indexOf(',') + 1).trim();
          const parts = slicedName.split(',');
          return parts.slice(0, 3).join(', ').trim();
        })()
      }
    </span>
  ) : (
    <span className="opacity-80 font-normal text-gray-500">
      Hyderabad, Telangana, India
    </span>
  )
}
        
        {isSidebarOpen ? (
          <IoIosArrowUp className="inline-flex text-orange-500 text-xl" />
        ) : (
          <IoIosArrowDown className="inline-flex text-orange-500 text-xl" />
        )}
      </p>

      <p className='font-semibold text-sm text-gray-600 hover:text-orange-600 cursor-pointer'>
        <TbBriefcase2 className='inline-flex text-xl mr-2' />Swiggy Corporate
      </p>
      <Link to={"/Search"}><p className='font-semibold text-sm text-gray-600 hover:text-orange-600 cursor-pointer'>
        <IoIosSearch className='inline-flex text-2xl mr-1' />Search
      </p></Link>
      <p className='font-semibold text-sm text-gray-600 hover:text-orange-600 cursor-pointer'>
        <BiSolidOffer className='inline-flex text-2xl mr-1 bg-transparent' />Offers
      </p>
      <p className='font-semibold text-sm text-gray-600 hover:text-orange-600 cursor-pointer'>
        <IoHelpBuoyOutline className='inline-flex text-2xl mr-1' />Help
      </p>
      <p className='font-semibold text-sm text-gray-600 hover:text-orange-600 cursor-pointer'>
        <MdOutlinePersonOutline className='inline-flex text-2xl mr-1' />Sign In
      </p>
      <Link to={"/Cart"}><p className='font-semibold text-sm text-gray-600 hover:text-orange-600 cursor-pointer'>
        <MdOutlineFastfood className='inline-flex text-2xl mr-1' />Cart-{numOfCartItems}
      </p></Link>

      {/* Sidebar Component */}
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default NavBar;
