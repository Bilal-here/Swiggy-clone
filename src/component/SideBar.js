import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { IoLocationOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { LocationContext } from '../App';
import { useLocationName } from './LocationName'; // Import custom hook to use LocationName

const SideBar = ({ isOpen, toggleSidebar }) => {
    const [input, setInput] = useState("");
    const [location, setLocation] = useState([]);
    const [restId, setRestId] = useState();
    const { setLat, setLong, lat, long } = useContext(LocationContext);
    const { setName } = useLocationName();

    useEffect(() => {
        if (input.length >= 3) {
            axios.get(`https://swiggy-proxy-1.onrender.com/api/location?input=${input}`)
                .then((res) => {
                    setLocation(res?.data?.data);
                    console.log(res?.data?.data);
                });
        } else {
            setLocation([]);
        }
    }, [input]);

    const TriggerLocation = (id) => {
        setRestId(id);
    };

    useEffect(() => {
        if (restId) {
            axios.get(`https://swiggy-proxy-1.onrender.com/api/address-recommend?place_id=${restId}`)
                .then((res) => {
                    setLat(res?.data?.data[0].geometry?.location?.lat);
                    setLong(res?.data?.data[0].geometry?.location?.lng);
                    setName(res?.data?.data[0].formatted_address);
                });
        }
    }, [restId, setLat, setLong, setName]);

    return (
        <div className={`fixed inset-0 flex ${isOpen ? 'visible' : 'invisible'} transition-opacity ease-in-out duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {/* Overlay */}
            <div onClick={toggleSidebar} className={`flex-1 bg-gray-500 bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}></div>

            {/* Sidebar Content */}
            <div className={`absolute left-0 top-0 h-full w-1/3 min-w-[300px] bg-white p-6 shadow-lg ease-in-out transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Close Button */}
                <button
                    onClick={toggleSidebar}
                    className="text-xl font-bold text-gray-700 mb-4"
                >
                    &times;
                </button>

                {/* Search Box */}
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    placeholder="Search for area, street name.."
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 mb-6 focus:outline-none"
                />

                {/* Locations List */}
                {location.length > 0 ? location.map((loc, i) => (
                    <Link to="/" key={i}>
                        <div
                            onClick={() => {
                                toggleSidebar();
                                setInput('');
                                TriggerLocation(loc?.place_id);
                            }}
                            className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                            <IoLocationOutline className="text-gray-500 text-xl mr-3" />
                            <div>
                                <p className="font-semibold text-gray-800">{loc?.description?.split(",", 1)}</p>
                                <p className="text-sm text-gray-500">{loc?.description?.slice(loc?.description?.indexOf(',') + 1).trim()}</p>
                            </div>
                        </div>
                    </Link>
                )) : (
                    <h1 className='ml-2'>Enter at least 3 characters to search for a location....</h1>
                )}
            </div>
        </div>
    );
};

export default SideBar;
