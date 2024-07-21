import React, {useEffect, useState} from 'react';
import { collection, deleteDoc, getDocs,doc, query, where } from 'firebase/firestore';
import {db} from '../../Firebase';
import { TiDelete } from "react-icons/ti";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Invoice = () => {
  const navigate = useNavigate()
  const [ invoiceData, setInvoiceData] = useState ('');
  useEffect(() => {
    fetchedData();
  }, [])

  const fetchedData = async() => {
    const q = query(collection(db,"Invoices"),where('uid', "==", localStorage.getItem('id')))
    const docSnapshot = await getDocs(q);
    const data = docSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    setInvoiceData(data)
    console.log(data);
  }

  const handleDelete = async(id) => {
    const res = window.confirm("Are you sure to want to delete this?");
    if(res) {
      try {
        await deleteDoc(doc(db,"Invoices",id))
        console.log("Successfully deleted")
        fetchedData();
      } catch {
        alert("Something is wrong")
      }
    }
  }

  const handleRowClick = (inv) => {
    navigate('/dashboard/invoice-detail', {state:inv});
  }

  if (!Array.isArray(invoiceData)) {
    return <div>No data available</div>;
  }

  return (
    <div className=' bg-white p-6 shadow-md'>
      {/* <h3 className='text-2xl font-semibold mb-4 text-gray-800'>Invoices</h3> */}
      <table className='min-w-full bg-white'>
        <thead className='bg-yellow-500 text-white'>
          <tr >
            <th className='py-2 px-4 border-b border-gray-300 text-left'>Invoice Id</th>
            <th className='py-2 px-4 border-b border-gray-300 text-left'>Invoice Type</th>
            <th className='py-2 px-4 border-b border-gray-300 text-left'>Amount</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.map(inv => (
            <tr key={inv.id} className='hover:bg-yellow-50 cursor-pointer' >
              <td className='py-2 px-4 border-b text-sm border-gray-300'>{inv.id}</td>
              <td className='py-2 px-4 border-b text-sm border-gray-300'>{inv.invoiceType}</td>
              <td className='py-2 px-4 border-b text-sm border-gray-300'>{inv.amount}</td>
              <td className='  border-b border-gray-300 text-right text-red-700 text-xl' onClick={() => {handleDelete(inv.id)}}><TiDelete/></td>
              <td className='  border-b border-gray-300 text-right text-green-700 text-xl' onClick={() => {handleRowClick(inv)}}><AiOutlineEye/></td>
            </tr>
          ))}
          </tbody>
        </table>
    </div>
  );
}

export default Invoice;
