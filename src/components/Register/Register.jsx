import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, storage, db } from '../../Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {  ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';



const Register = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [ selectedFile, setSelectedFile ] = useState('');
  const [ registerFormData, setRegisterFormData ] = useState ({
    email: '',
    password: '',
    name: '',
    imageUrl : '',
    uid: ''
  })
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((prevData) => ({
      ...prevData,
      [name] : value
    }))
  }

  const handleSetFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImageUrl(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(registerFormData);
    //unique id creation
    const date = new Date().getTime();
    console.log(date);
    //created Refrence
    const imageRef = ref(storage, `Users/${registerFormData.name+date}`);
    await uploadBytes(imageRef, selectedFile)
    const imageURL = await getDownloadURL(imageRef);
    console.log(imageURL);
    
    {/*Authenticating with firebase */}
    createUserWithEmailAndPassword(auth, registerFormData.email, registerFormData.password )
    .then(async (newUser) => {
      console.log(newUser);
      updateProfile(newUser.user, {
        displayName:registerFormData.name,
        photoURL: imageURL
      })

      //uploading data into database
      setDoc(doc(db,"Users", newUser.user.uid), {...registerFormData, imageUrl:imageURL, uid:newUser.user.uid});
      localStorage.setItem('name',registerFormData.name)
      localStorage.setItem('image', imageURL)
      localStorage.setItem('email', newUser.user.email)
      localStorage.setItem('id', newUser.user.uid)
      navigate('/dashboard')
    })
    .catch(error => {
      console.log(error);
    })

  }

  // bg-[url("")] to set the background-image
  return (
    <div className='flex   justify-center items-center bg-no-repeat  min-h-screen  bg-gray-100'>
      {/* <h2 className='text-center mb-4  text-2xl text-tight '>Create your account</h2> */}
      <div className='max-w-md w-full bg-white p-6 shadow-xl rounded-xl' >
      
        <form onSubmit={handleSubmit}>
          <div className='mb-4 mt-2 '>
            <label htmlFor="name" className='block text-black text-sm font-medium mb-2'>
              Name
            </label>
            <input 
              type="text" 
              name='name'
              id='name'
              required
              onChange={handleChange}
              autoComplete='off'
              className='w-full p-2 border border-blue-700 rounded-lg focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='my-4 mt-4 '>
            <label htmlFor="email" className='block text-black text-sm   font-medium  mb-2'>
              Email address
            </label>
            <input 
              type="email" 
              name='email'
              id='email'
              onChange={handleChange}
              required
              autoComplete='off'
              className='w-full p-2 border border-blue-700 rounded-lg focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='my-4'>
            <label htmlFor="password" className='text-sm font-medium text-black mb-2 block' >
              Password
            </label>
            <input 
              type="password" 
              name='password'
              id='password'
              onChange={handleChange}
              required
              className='w-full p-2 border border-blue-700 rounded-lg focus:outline-none focus:border-blue-500'
            />
          </div>
          { !imageUrl && (
            <div className='my-6 mt-8'>
              <input type="file" className='hidden' ref={fileInputRef} onChange={handleSetFile}/>
              <input 
                type="button" 

                value='Upload your profile' 
                onClick={()=>{fileInputRef.current.click()}}
                className='w-full p-2 border border-gray-700 text-sm rounded-lg focus:outline-none focus:border-blue-500'
              />
          </div>
          )}
          
          { imageUrl && (
            <div className='flex items-center justify-center'>
            <img 
              src={imageUrl}
              alt='profile'
              className='w-24 h-24 rounded-full mr-3'
            />
          </div>
          )}
          
          <div className='my-8 mt-2 text-center'>
            <button 
            className='w-full py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-800 focus:outline-none'
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
        <p className='text-gray-500 text-center text-sm'>Already have a account? <span className='text-sm text-blue-600  hover:underline'><Link to='/login'>Login </Link></span></p>
      </div>
    </div>
  );
}

export default Register;

  
