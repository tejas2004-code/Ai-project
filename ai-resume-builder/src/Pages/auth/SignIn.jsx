import { useState } from 'react';
import { CiUser, CiLock } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaArrowAltCircleRight, FaCheckCircle, FaGithub } from "react-icons/fa";
import { Button } from '@mui/material';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './form.css';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/AuthSlice';
import { toast } from 'react-toastify';
import { EyeIcon, EyeOffIcon, Loader } from 'lucide-react';



const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setName] = useState('');
  const [isPassFocus,setPassFocus]=useState(false);
  const [password, setPassword] = useState('');
  const [validateemail,setValidateEmail]=useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    specialChar: false,
    numberAndLetter: false,
  });
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignInToggle = () => setIsSignIn(!isSignIn);

  const handleOAuthLogin = async (providerType) => {
    setLoading(true);
    try {
      const provider = providerType === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const formData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      await handleOAuthSubmit(providerType, formData);
    } catch (error) {
      toast.error(`${providerType.charAt(0).toUpperCase() + providerType.slice(1)} Sign In Failed`);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSubmit = async (providerType, formData) => {
    try {
      const endpoint = providerType === 'google' ? 'google-login' : 'github-login';
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/${endpoint}`, formData,{ withCredentials: true });
      const { user, token } = res.data;
      dispatch(setUser({ user, token, isAuthenticated: true }));
      toast.success('Login Successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Something went wrong with OAuth login.');
    }
  };

  const onSubmitHandler = async () => {
    setLoading(true);
    try {
      const formData = isSignIn
        ? { email, password }
        : { username, email, password };

      const endpoint = isSignIn ? '/login' : '/register';

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1${endpoint}`, formData,{ withCredentials: true });

      if (isSignIn) {
        const { user, token } = res.data;
        dispatch(setUser({ user, token, isAuthenticated: true }));
        toast.success('Login Successful!');
        navigate('/dashboard');
      } else {
        toast.success('Registration Successful!');
        setIsSignIn(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  
  const validatePassword = (password) => {
    const updatedValidations = {
      minLength: password.length >= 8,
    };
    setPasswordValidations(updatedValidations);

    
      setPasswordValidations((prev) => ({
        ...prev,
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      }));
   

   
      setPasswordValidations((prev) => ({
        ...prev,
        numberAndLetter: /(?=.*[0-9])(?=.*[a-zA-Z])/.test(password),
      }));

  };

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    validatePassword(inputPassword);
  };
  const validateEmail=(value)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
       setValidateEmail(true);
    }
    else{
      setValidateEmail(false);
    }
  }

 
  const isPasswordValid = Object.values(passwordValidations).every(Boolean);

  return (
    <div className="body bg-gradient-to-tr from-[#1f242d] to-[#10244b]">
      <form className="form">
        <div className="container">
          <h1 className="h1">{isSignIn ? "Sign in" : "Sign Up"} to <span>AI-Resume Builder</span></h1>
          <p className="text-center">{isSignIn ? "Welcome back! Please sign in to continue" : "Create a new account"}</p>

          <div className="input-form">
            {!isSignIn && (
              <div className="input-box">
                <CiUser className="icon" />
                <input type="text" placeholder="Enter your full name" onChange={(e) => setName(e.target.value)} />
              </div>
            )}
            <div className="input-box">
              <MdOutlineEmail className="icon" />
              <input type="email" placeholder="Enter email" onChange={(e) =>{ setEmail(e.target.value)
                 validateEmail(e.target.value);
              }} required />
              
            </div>
            <div className='flex relative  w-full'>
            { validateemail && email.length>0 && ( <p className='text-red-600 text-xs mt-2 ml-8   '>Enter Validate Email Address !</p>)

}</div>
            <div className='flex-col'>
              <div className="input-box">
                <CiLock className="icon" />
                <input onFocus={()=>setPassFocus(true)}  type={passVisible ? "text" : "password"} placeholder="Password..." onChange={handlePasswordChange} />
                {passVisible ? (
                  <EyeIcon onClick={() => setPassVisible(false)}  className={`icon mr-2 ${isPassFocus?'opacity-100':'opacity-0'}`} />
                ) : (
                  <EyeOffIcon onClick={() => setPassVisible(true)} className={`icon mr-2 ${isPassFocus?'opacity-100':'opacity-0'}`} />
                )}
              </div>
              { password.length>0 && !isSignIn && (  <div className="relative mt-2 flex text-gray-500 text-[12px]">
                <ul>
                  {[
                    { text: "Password must contain 8 letters", key: "minLength" },
                    { text: "Password must contain 1 special character", key: "specialChar" },
                    { text: "Password must contain numbers and letters", key: "numberAndLetter" },
                  ].map(({ text, key }) => (
                    <li key={key} className='flex'>
                      <FaCheckCircle className={passwordValidations[key] ? "text-green-500 mr-1 mt-1 text-[10px]" : "text-red-500 mr-1 mt-1 text-[10px]"} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div> )}
             

            </div>
            <Button
              variant="contained"
              className="submit-btn"
              onClick={onSubmitHandler}
              
             
            >
              {loading ? <Loader className="animate-spin text-xl" /> : <>Continue <FaArrowAltCircleRight className="ml-3" /></>}
            </Button>
            <p className="mt-2 ">
              {isSignIn ? "Don't have an account? " : "Already have an account? "}
              <span onClick={handleSignInToggle}>{isSignIn ? "Sign Up" : "Sign In"}</span>
            </p>
          </div>
          <p className="or text-center">Or</p>
          <div className="social-auth">
            <div className="media">
              <Button className="media-btn" onClick={() => handleOAuthLogin('google')}>
                <FcGoogle className="text-2xl" /> Sign in with Google
              </Button>
              <Button className="media-btn" onClick={() => handleOAuthLogin('github')}>
                <FaGithub className="text-2xl" /> Sign in with GitHub
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
