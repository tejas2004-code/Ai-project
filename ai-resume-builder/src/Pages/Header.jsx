import '../Styles/style.css';
import logo from '../assets/logo.png';

import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { ClearUser } from '@/redux/AuthSlice';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import TemplateStore from './ResumetemplateSection/Template/TemplateStore';




function Header() {
  const navigate=useNavigate();
  const { isAuthenticated } = useSelector((store) => store.auth);
   const [templatestoreview, settemplatestoreview] = useState(false);
const handelGetStarted=()=>{
  if(!isAuthenticated) return navigate('/auth/sign-in');
  navigate('/dashboard');
}

  return (
    <>
    <header className='header  bg-gradient-to-tr from-[#1f242d] to-[#122143] '>
      <div className='p-3 px-5 content-center flex justify-between shadow-md logo'>
        <div className='flex justify-center content-center'>
          <img className='img' src={logo} height={40} width={80} alt="logo"  />
          <h2 className='title text-center heading mr-1 '> <span className='sp-title'>尺esume</span>  乃uilder</h2>
        </div>
        <div className="nav  text-white pt-2 flex-col">
          <a className='nav-link' href='/'>Home</a>
          <a className='nav-link' href='#features'>Feature</a>
          <a className='nav-link' onClick={() => settemplatestoreview(true)}>Template</a>
          {isAuthenticated &&
            <a className='nav-link' href='/dashboard'>Dashboard</a>}

        </div>
        <div className='flex justify-between profile'>
          {
            isAuthenticated &&

            <AvatarMenu />

          }
          
            <button onClick={handelGetStarted} className='get'>Get started</button>
         
        </div>
      </div>
    </header>
    <TemplateStore
        isOpen={templatestoreview}
        onClose={() => settemplatestoreview(false)}
      />
    </>
  );
}

export default Header;

export const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((store) => store.auth);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlelogout = async () => {
    await axios.post("https://ai-powered-resume-builder.onrender.com/api/v1/logout");
    dispatch(ClearUser());
    navigate('/');
    localStorage.removeItem("token");
    Cookies.remove('token');

    toast.success("user logout Succesfully")
  }

  return (
    <>
      <Avatar  alt={user.username} src={user.profilePic} onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar alt={user.username} src={user.profilePic}  referrerPolicy="no-referrer"/> Profile

        </MenuItem>
        <MenuItem onClick={handleClose}>
     
          <Avatar  alt={user.username} src={user.profilePic} /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon >
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handlelogout}>
          <ListItemIcon >
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
