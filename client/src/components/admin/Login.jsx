import toast from 'react-hot-toast'
import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const { axios, setToken } = useAppContext();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [isSignup, setIsSignup] = React.useState(false);

  // ✅ Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/auth/signup', {
        name,
        email,
        password
      });

      if (data.success) {
        setToken(data.token);
        toast.success("Signup successful");
        navigate('/');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/auth/login', {
        email,
        password
      });

      if (data.success) {
        setToken(data.token);
        toast.success("Login successful");
        navigate('/');
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        
        <div className='flex flex-col items-center justify-center'>
          
          <div className='w-full py-6 text-center'>
            
            <h1 className='text-3xl font-bold'>
              <span className='text-primary'>User</span> {isSignup ? "Signup" : "Login"}
            </h1>

            <p className='font-light'>
              {isSignup 
                ? "Create a new account" 
                : "Enter your credentials to login"}
            </p>

          </div>

          <form 
            onSubmit={isSignup ? handleSignup : handleSubmit} 
            className='mt-6 w-full sm:max-w-md text-gray-600'
          >

            {/* ✅ Name field only for signup */}
            {isSignup && (
              <div className='flex flex-col'>
                <label>Name</label>
                <input
                  onChange={e => setName(e.target.value)}
                  value={name}
                  type='text'
                  required
                  placeholder='your name'
                  className='border-b-2 border-gray-300 p-2 mb-6 outline-none'
                />
              </div>
            )}

            <div className='flex flex-col'>
              <label>Email</label>
              <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type='email'
                required
                placeholder='your email id'
                className='border-b-2 border-gray-300 p-2 mb-6 outline-none'
              />
            </div>

            <div className='flex flex-col'>
              <label>Password</label>
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                required
                placeholder='your password'
                className='border-b-2 border-gray-300 p-2 mb-6 outline-none'
              />
            </div>

            <button
              type="submit"
              className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/70 transition-all'
            >
              {isSignup ? "Signup" : "Login"}
            </button>

          </form>

          {/* ✅ Toggle */}
          <p className='text-sm mt-4 text-center'>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span
              onClick={() => setIsSignup(!isSignup)}
              className='text-primary cursor-pointer ml-1'
            >
              {isSignup ? "Login" : "Signup"}
            </span>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;