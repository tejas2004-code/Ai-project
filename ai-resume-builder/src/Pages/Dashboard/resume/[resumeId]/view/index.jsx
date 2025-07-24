import { CreativeTemplate } from '@/Pages/ResumetemplateSection/Template/Template1';
import { ExecutiveTemplate } from '@/Pages/ResumetemplateSection/Template/Template2';
import { MinimalTemplate } from '@/Pages/ResumetemplateSection/Template/Template3';
import { ModernTemplate } from '@/Pages/ResumetemplateSection/Template/Template4';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from 'axios';
import { Download } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaShare } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { RWebShare } from 'react-web-share';
import { Template5, Template6, Template7, Template8 } from '@/Pages/ResumetemplateSection/Template/Template5';

const ViewResume = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const handleDownloadPDF = async () => {
   
    const input = document.getElementById("resume-preview");
       if (!input) return;
  
       const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4");
       const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
       pdf.save("resume.pdf"); 
    };

  useEffect(() => {
    const getResumeById = async () => {
      try {
        const res = await axios.get(`https://ai-powered-resume-builder.onrender.com/api/v1/resume/${resumeId}`, {
          withCredentials: true,
        });
        setResumeData(res.data.resumeData);
      } catch (error) {
        console.log(error);
      }
    };

    getResumeById();
  }, [resumeId]);

  const templates = {
    1: ModernTemplate,
    2: CreativeTemplate,
    3: ExecutiveTemplate,
    4: MinimalTemplate,
    5: Template5,
      6:Template6,
      7:Template7,
      8:Template8
  };
  

  return (
    <div className='w-full min-h-fit bg-gradient-to-b from-gray-700 to-[#000000] absolute'>

<div className='my-10 mx-10 md:mx-20 lg:mx-36'>
            <h2 className='text-center text-2xl font-medium text-gray-300'>
                Congrats! Your Ultimate AI generates Resume is ready ! </h2>
                <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share unique 
                    resume url with your friends and family </p>
            <div className='flex justify-between px-44 my-10'>
                <button onClick={handleDownloadPDF} className='px-4 py-3 bg-blue-500 text-white flex rounded'><Download className="text-green-900  mr-2" />Download</button>
               
                <RWebShare
        data={{
          text: "Hello Everyone, This is my resume please open url to see it",
          url: import.meta.env.VITE_BASE_URL+"/resume/"+resumeId+"/view",
          title: resumeData?.personalInfo?.name+" resume",
         
        }}
        
      > <button className='px-4 py-2 bg-green-700 flex text-white rounded'> <FaShare className="mr-2 mt-1 text-[20px] text-green-400" />Share</button>
      </RWebShare>
           
        </div>
            
        </div>
<div className='w-full flex items-center justify-center'>
      <div id="resume-preview" className="h-[900px]  scrollbar-hideee border-black border-1 w-[900px] overflow-y-auto">
        {resumeData && React.createElement(templates[resumeData?.ResumeTemplateId])}
      </div></div>
    </div>
  );
};

export default ViewResume;
