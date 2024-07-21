import {addDoc, collection } from 'firebase/firestore';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../Firebase';

const NewInvoice = () => {
  const navigate = useNavigate();
  const [formData , setFormData ] = useState({
    'invoiceType':'',
    'invoiceDate': '',
    'dueDate': '',
    'amount':'',
    'uid': '',
  });

  const handleChange = (e) => {
    const {name, value } = e.target;
    setFormData({
      ...formData,
      [name] : value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const dataRef = await addDoc(collection(db,'Invoices'),{...formData, uid:localStorage.getItem('id') });
      console.log("Document written with ID: ", dataRef.id);
      navigate('/dashboard/invoice')
    } catch (err) {
      console.error('Error adding document: ', err);
    }
    
  }

  return (
    
    <main >
      <div className='bg-white p-6  shadow-md'>

        <form onSubmit={handleSubmit} className='grid grid-cols-2'>
          <div className='mb-4'>
            <label htmlFor='invoiceType' className='block text-gray-700 font-medium mb-2'>
              Invoice Type
            </label>
            <select
              type='text'
              id='invoiceType'
              name='invoiceType'
              value={formData.invoiceType}
              onChange={handleChange}
              autoComplete='off'
              className='w-2/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500'
            >
              <option value='' ></option>
              <option value='Salary' className='p-4'>Salary</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div className='mb-4'>
            <label htmlFor='invoiceDate' className='block text-gray-700 font-medium mb-2'>
              Invoice Date
            </label>
            <input 
              type='date'
              id='invoiceDate'
              name='invoiceDate'
              value={formData.invoiceDate}
              onChange={handleChange}
              className='w-2/3 border p-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='dueDate' className='block text-gray-700 font-medium mb-2'>
              Due Date
            </label>
            <input 
              type='date'
              id='dueDate'
              name='dueDate'
              value={formData.dueDate}
              onChange={handleChange}
              className='w-2/3 border p-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='amount' className='block text-gray-700 font-medium mb-2'>
              Amount
            </label>
            <input 
              type='number'
              id='amount'
              name='amount'
              value={formData.amount}
              onChange={handleChange}
              className='w-2/3 border p-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500'
            />
          </div>
          <div>
            <button
              type='text'
              className='w-auto py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none'
            >
              Add Invoice
            </button>
          </div>
        </form>
      </div>
       
    </main>
  );
}

export default NewInvoice;
