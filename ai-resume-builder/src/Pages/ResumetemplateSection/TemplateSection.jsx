import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { PreviewModal } from './TemplatePreview';
import { toast } from 'react-toastify';
import { useResumeStore } from '../Store/useResumeStore';


export function TemplateSection({ id, name, description, preview, popular }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const {updateResumeTemplateID} =useResumeStore();
 const setTemplate=()=>{
  updateResumeTemplateID(id);
  toast.success("template Selected !");
 }
  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 }
        }}
        className="group relative bg-white rounded-2xl shadow-lg overflow-hidden "
      >
        {popular && (
          <div className="absolute top-4 right-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Star className="h-4 w-4 mr-1" fill="currentColor" />
            Popular
          </div>
        )}
        <div className='temp h-6 aspect-[2/2] bottom-0 flex-1 items-center content-center text-center absolute inset-x-0 z-10 bg-gray-700/80   transition-opacity duration-300 opacity-0 group-hover:opacity-100 '>
        <h2 align="center " className='text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white text-xl font-semibold'>{name}<br/> ATS :81%</h2>
        </div>
       
        <div className="aspect-[7/10] relative ">
         <div className='max-h-[40px]'>
          <img 
            src={preview}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          </div>
          <div className="p-6 flex items-center justify-center absolute z-10 inset-x-0 bottom-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <div className="flex mt-8 space-x-4 pt-3 ">
              <button onClick={()=>setTemplate(id)} className="flex-1 w-200 shadow-2xl bg-blue-500 text-white px-2 py-2 h-18  whitespace-nowrap rounded hover:bg-blue-500 transition-colors">
                Use Template
              </button>
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="px-2 py-2 text-white border-2 shadow-2xl bg-slate-700 rounded  hover:bg-slate-700 transition-colors"
              >
                Preview
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        templateId={id}
      />
    </>
  );
}
