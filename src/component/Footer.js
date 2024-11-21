import React from 'react';
import { FaGooglePlay, FaApple, FaLinkedin, FaInstagram, FaFacebook, FaPinterest, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-8 text-gray-700">
      <div className="container mx-auto px-6 lg:px-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <p className="text-lg font-medium text-center md:text-left mb-4 md:mb-0">
            For better experience, download the Swiggy app now
          </p>
          <div className="flex space-x-4">
            <button className="bg-black text-white py-2 px-4 rounded-lg flex items-center">
              <FaGooglePlay className="mr-2" /> 
              <span className="text-sm">Google Play</span>
            </button>
            <button className="bg-black text-white py-2 px-4 rounded-lg flex items-center">
              <FaApple className="mr-2" /> 
              <span className="text-sm">App Store</span>
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 text-sm text-center md:text-left">
          
          {/* Logo and Copyright */}
          <div>
            <div className='flex'>
            <img className='h-6 ' src='data:image/png;base64,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'/>
            <h2 className="font-bold text-lg text-orange-600"> Swiggy</h2>
            </div>
            <p className="text-gray-500"> © 2024 Swiggy Limited</p>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Swiggy Corporate</li>
              <li>Careers</li>
              <li>Team</li>
              <li>Swiggy One</li>
              <li>Swiggy Instamart</li>
              <li>Swiggy Dineout</li>
              <li>Swiggy Genie</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold mb-2">Contact us</h3>
            <ul className="space-y-1">
              <li>Help & Support</li>
              <li>Partner with us</li>
              <li>Ride with us</li>
            </ul>
          </div>

          {/* Available Cities */}
          <div>
            <h3 className="font-semibold mb-2">Available in:</h3>
            <ul className="space-y-1">
              <li>Bangalore</li>
              <li>Gurgaon</li>
              <li>Hyderabad</li>
              <li>Delhi</li>
              <li>Mumbai</li>
              <li>Pune</li>
              <li><button className="text-gray-500">679 cities ▼</button></li>
            </ul>
          </div>

          {/* Life at Swiggy */}
          <div>
            <h3 className="font-semibold mb-2">Life at Swiggy</h3>
            <ul className="space-y-1">
              <li>Explore with Swiggy</li>
              <li>Swiggy News</li>
              <li>Snackables</li>
            </ul>
          </div>
        </div>

        {/* Legal and Social Links */}
        <div className="mt-8 flex flex-col md:flex-row md:justify-between items-center">
          
          {/* Legal Links */}
          <div className="mb-4 md:mb-0">
            <h3 className="font-semibold mb-2 text-center md:text-left">Legal</h3>
            <ul className="flex space-x-4">
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
              <li>Privacy Policy</li>
              <li>Investor Relations</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600"><FaLinkedin /></a>
            <a href="#" className="text-gray-600"><FaInstagram /></a>
            <a href="#" className="text-gray-600"><FaFacebook /></a>
            <a href="#" className="text-gray-600"><FaPinterest /></a>
            <a href="#" className="text-gray-600"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
