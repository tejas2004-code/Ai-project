import { setResume } from "@/redux/ResumeSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const UseGetAllResume = () => {
const dispatch=useDispatch();

  useEffect(() => {
    const getAllResume = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/resume`, {
          withCredentials: true, 
        });
        dispatch(setResume({ allResume: res.data }));
        dispatch(setResume({userId:res?.data[0].userId}));
      } catch (error) {
        console.error("Error fetching resumes:", error.response?.data || error.message);
      }
    };
    
    getAllResume();
  }, []);

  return null;
};

export default UseGetAllResume;
