import React,{useState, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const InvoiceDetails = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state);
  const printRef = useRef();

  const handlePrint = () => {
    const input = document.getElementById('invoice')
    html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation:'portrait',
        unit:'pt',
        format: [600, 700]
      });
      pdf.internal.scaleFactor = 1
      const imageProps = pdf.getImageProperties(imgData)
      const pdfwidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imageProps.height * pdfwidth)/imageProps.width

      pdf.addImage(imgData, 'PNG', 0, 0, pdfHeight, pdfwidth);
      pdf.save('invoice-details.pdf');
    })
  }

  return (
    <div className='p-6 max-w-3xl mx-auto bg-white shadow-md'>
      <div className='flex items-center justify-end'>
        <button className='text-yellow-500 hover:text-yellow-600 ' onClick={handlePrint}>
          <FaPrint size={20} />
        </button>
      </div>
      <div className='flex items-center justify-start mb-4' id='invoice'>
        <h2 className='text-2xl font-bold text-gray-700'>Invoice Details</h2>
      </div>
      <hr />
      <div className='my-6'>
        <div className='flex items-center mb-4'>
          <img src={localStorage.getItem('image')} className='w-24 h-24 rounded-full mr-4'/>
          <div>
            <p className='text-xl font-medium text-gray-600'>{localStorage.getItem('name')}</p>
            <p className='text-gray-600 text-sm'>{localStorage.getItem('email')}</p>
          </div>
        </div>
      </div>
      <hr className='my-6 border-gray-300'/>
      <div >
        <h2 className='font-semibold mb-2'>Invoice Details</h2>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <div>
            <p className='font-medium text-blue-900'>Invoice ID:</p>
            <p className='text-lg'>{data.id}</p>
          </div>
          <div>
            <p className='font-medium text-blue-900'>Invoice Type:</p>
            <p className='text-lg'>{data.invoiceType}</p>
          </div>
          <div>
            <p className='font-medium text-blue-900'>Amount:</p>
            <p className='text-lg'>{data.amount}</p>
          </div>
          <div>
            <p className='font-medium text-blue-900'>Due Date:</p>
            <p className='text-lg'>{data.dueDate}</p>
          </div>
          <div>
            <p className='font-medium text-blue-900'>Invoice Date:</p>
            <p className='text-lg'>{data.invoiceDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;
