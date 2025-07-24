import React, { useEffect, useState } from 'react';
import Params from 'params';
import { useParams } from 'react-router-dom';
import FormSection from '../../Component/FormSection';
import ResumePreview from '../../Component/ResumePreview';
import { ResumeInfoContext } from '@/Pages/Context/ResumeInfoContext';
import { motion } from 'framer-motion';
import ResumeCreateHeader from '../../ResumeCreateHeader';
import MessageToast from '@/components/ui/MessageToast';
import { useSelector } from 'react-redux';
import { useResumeStore } from '@/Pages/Store/useResumeStore';




const EditResume = () => {
  const {setResumeData}=useResumeStore();
  
  
  const params = useParams();
  const ResumeData = useSelector((store) => store.ResumeState.resume);
 
 

  useEffect(() => {
    if (ResumeData) {
      setResumeData(ResumeData);
    }
  }, [ResumeData]);
  return (
   
      <div className='bg-gray-900 min-h-full text-black  overflow-x-hidden'>
      <ResumeCreateHeader/>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 pt-5 p-10 '>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FormSection />
          </motion.div>
          <ResumePreview EditPage={true} />
          <MessageToast message='Help us craft a standout resume by providing the Job Description!' />

        </div></div>
   
  )
}

export default EditResume;