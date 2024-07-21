import React from 'react';
import { FiSettings, FiLogOut } from "react-icons/fi";
import { AiOutlineHome, AiOutlineFileAdd  } from "react-icons/ai";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {auth} from '../../Firebase';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
  const navigate = useNavigate();
  
  //logout
  const handleLogout = () => {
    signOut(auth)
    .then(() => {
      localStorage.clear();
      navigate('/login')
    })
    .catch((error) => {
      console.log("Something went wrong!");
    });
  }
  
  return (
    <main className='flex min-h-screen'>
      <div className='bg-gray-800 text-gray-200 w-64 p-4'>
        <div className='mb-4 flex items-center'>
          <img 
            src={localStorage.getItem('image')}
            alt='profile'
            className='w-24 h-24 rounded-full mr-3'
          />
          <div className='flex'>
            <p className='text-white font-semibold'>{localStorage.getItem('name')}</p>
            
          </div>
        </div>

        <hr />
        {/* Sidebar Items */}
        <div className=' flex-grow my-4'>
          <Link 
            to='home' 
            className='flex items-center py-2 px-4  rounded text-gray-200 hover:bg-gray-700 hover:text-white'>
              <AiOutlineHome size={20} className='mr-2' />
              Home
          </Link>
          <Link 
            to='invoice' 
            className='flex items-center py-2 px-4 rounded text-gray-200 hover:bg-gray-700 hover:text-white'>
              <LiaFileInvoiceSolid size={20} className='mr-2' />
              Invoices
          </Link>
          <Link 
            to='add-invoice' 
            className='flex items-center py-2 px-4 rounded text-gray-200 hover:bg-gray-700 hover:text-white'>
              <AiOutlineFileAdd size={20} className='mr-2' />
              Add Invoice
          </Link>
        </div>

        <hr />
        
        {/* Logout Button */}
        <Link to='setting' className='flex items-center text-gray-400 hover:text-gray-300 mt-4'>
          <FiSettings size={20} className='mr-2'  />
          Setting
        </Link>
        <button className='flex items-center text-gray-400 hover:text-gray-300 mt-2' onClick={handleLogout}>
          <FiLogOut size={20} className='mr-2' />
          Logout
        </button>
      </div>

      {/*Main Content */}
      <div className='bg-gray-100 text-gray-900 flex-grow p-4'>
        <Outlet />
      </div>
    </main>
  );
}

export default Dashboard;
