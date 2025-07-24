import { deleteResumeFromState, setResume } from '@/redux/ResumeSlice'
import { Preview, PreviewOutlined, PreviewSharp } from '@mui/icons-material'
import { Item } from '@radix-ui/react-accordion'
import axios from 'axios'
import {  Edit, File } from 'lucide-react'
import React, { useState } from 'react'

import {  FcDocument } from 'react-icons/fc'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PreviewModal } from '../ResumetemplateSection/TemplatePreview'
import { useResumeStore } from '../Store/useResumeStore'

const RecentResumeCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allResume = useSelector((state) => state?.ResumeState?.allResume);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
   const { ResumeTemplateId } = useResumeStore();
   

  const handelEditResume = (Item) => {
    dispatch(setResume({ resume: Item.resumeData }));
    navigate(`/resume/${Item._id}/edit`);
  }

  const getTimeAgo = (date) => {
    if (!date) return "N/A";
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  };

const DeleteResume = async (Item) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/resume/${Item._id}`,
      { withCredentials: true }
    );
    
    if (res.status === 200) {
      dispatch(deleteResumeFromState(Item._id)); 
      toast(res.data.messege);
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className='grid grid-cols-4 gap-5'>
      {allResume.length > 0 && allResume.map((Item, index) => (
        <div key={index} className='relative group'>
          <div 
           
            className='p-6  w-60 h-[280px] mr-4 border items-center flex justify-center backdrop-blur-lg bg-[#9badaf63] rounded-xl hover:scale-105 transition-all hover:shadow-lg cursor-pointer border-dashed group-hover:shadow-xl'
          >
            <h1 className='text-2xl font-bold text-center'>{Item.resumeData?.Resumetitle || "Untitled Resume"}</h1>
            <h2 className='absolute top-2 left-2 flex items-center text-sm text-gray-600'>
              Recent <FcDocument className='ml-1 text-xl' />
            </h2>
            <p className='absolute bottom-2 left-2 text-sm text-gray-500'>{getTimeAgo(Item.createdAt)}</p>
          </div>
          
          
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded duration-300 flex items-end justify-center opacity-0 group-hover:opacity-100">
              <div className="flex-1 gap-10 mb-5 items-center justify-center   transition-transform duration-300">
                <div className='flex items-center justify-around mb-4'>
                <button
                   onClick={() =>handelEditResume(Item)}  
                  className="p-2 animate-bounce hover:bg-gray-500 bg-gray-600 rounded px-6 shadow-sm hover:shadow-md transition-all flex items-center space-x-1"
                >
                  <Edit className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-white">Edit</span>
                </button>
                <button
                onClick={()=>DeleteResume(Item)}
                  className="p-2 bg-gray-600 animate-bounce hover:bg-gray-500 rounded px-6 shadow-sm hover:shadow-md transition-all flex items-center space-x-1"
                >
                  <MdDelete className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-white">Delete</span>
                </button>
                </div>
                <button
                onClick={()=>setIsPreviewOpen(true)}
                  className="p-2 animate-bounce bg-gray-600 hover:bg-gray-500 ml-12 rounded px-10 shadow-sm hover:shadow-md transition-all flex items-center space-x-1"
                >
                  <File className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-white">Preview</span>
                </button>
              </div>
            </div>
          </div>
      
      ))}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        templateId={ResumeTemplateId}
      />
    </div>
  )
}

export default RecentResumeCard;



