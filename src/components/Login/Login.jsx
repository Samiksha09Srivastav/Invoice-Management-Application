import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    email: ''
  });

  const hnadleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name] : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    //sign in
    signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then(userCredential => {
      console.log("Login successfully");
      const user = userCredential.user;
      console.log(user)
      localStorage.setItem('name',user.displayName )
      localStorage.setItem('image',user.photoURL )
      localStorage.setItem('id', user.uid)
      localStorage.setItem('email', user.email)
      navigate('/dashboard');
    })
    .catch(error => {
      alert("Password or email is incorrect, try again! ")
     
    })
  }

  return (
    <div className='flex justify-center items-center  bg-no-repeat  min-h-screen bg-gray-100 bg-gray-100 '>
      
      <div className='max-w-md w-full bg-white p-6 shadow-xl rounded-xl' >
      <h2 className='text-center mb-10 mt-4 font-bold text-2xl text-tight font-bolder'>Sign in to your account</h2>
        <form  onSubmit={handleSubmit}>
          <div className='my-4 mt-4 '>
            <label htmlFor="email" className='block text-black text-sm   font-medium  mb-2'>
              Email address
            </label>
            <input 
              type="email" 
              name='email'
              id='email'
              required
              onChange={hnadleChange}
              autoComplete='off'
              className='w-full p-2 border border-blue-700 rounded-lg focus:outline-none focus:border-blue-500'
            />
          </div>
          <div>
            <label htmlFor="password" className='text-sm font-medium text-black mb-2 block' >
              Password
            </label>
            <input 
              type="password" 
              name='password'
              id='password'
              required
              onChange={hnadleChange}
              className='w-full p-2 border border-blue-700 rounded-lg focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='my-8 text-center'>
            <button 
            className='w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none'
              type='submit'
            >
              Submit
            </button>
          </div>
        </form>
        <p className='text-gray-500 text-center text-sm'>Don't have account? <span className='text-sm text-blue-600  hover:underline'><Link to='/register'>Register</Link></span></p>
      </div>
    </div>
  );
}

export default Login;
