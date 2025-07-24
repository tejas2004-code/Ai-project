
import React, { useContext, useState } from "react";
import { ModernTemplate } from "@/Pages/ResumetemplateSection/Template/Template4";
import { CreativeTemplate } from "@/Pages/ResumetemplateSection/Template/Template1";
import { ExecutiveTemplate } from "@/Pages/ResumetemplateSection/Template/Template2";
import { MinimalTemplate } from "@/Pages/ResumetemplateSection/Template/Template3";
import TemplateStore from "@/Pages/ResumetemplateSection/Template/TemplateStore";
import { useResumeStore } from "@/Pages/Store/useResumeStore";
import { PreviewModal } from "@/Pages/ResumetemplateSection/TemplatePreview";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { Download, Edit, Loader, Share, Share2Icon, ShareIcon, View} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CiMenuKebab } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import { Update } from "@mui/icons-material";
import { FcInspection } from "react-icons/fc";
import { RWebShare } from "react-web-share";
import { Template5, Template6, Template7, Template8 } from "@/Pages/ResumetemplateSection/Template/Template5";

const ResumePreview = ({EditPage}) => {

  const {personalInfo,position,level, summary, experience,education,Resumetitle ,isToggled, projects,certifications,skills} =useResumeStore();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [templatestoreview, settemplatestoreview] = useState(false);
  const [DowloadEnable,setDowloadEnable]=useState(false);
  const [OpenMenu,setOpenMenu]=useState(false);
  const { ResumeTemplateId } = useResumeStore();
  const [Save,isSave]=useState(null);
  const {resumeId}=useParams();
  
  const navigate=useNavigate();
  
  const templates = {
    1: ModernTemplate,
    2: CreativeTemplate,
    3: ExecutiveTemplate,
    4: MinimalTemplate,
    5:Template5,
    6:Template6,
    7:Template7,
    8:Template8
    
  };
  const HandelEditResume=async()=>{
     try {
      isSave(true);
  const resumeData={personalInfo,position,summary,level,experience,education,projects,certifications,skills,Resumetitle,ResumeTemplateId};
   const res= await axios.put(`https://ai-powered-resume-builder.onrender.com/api/v1/resume/${resumeId}`,{resumeData},{
    withCredentials:true,
   })
   console.log(res);
   toast.success(res.data.message);
     } catch (error) {
      console.log(error);
     }finally{
      
      setTimeout(()=>{
        isSave(false);
        setDowloadEnable(true);
      },300)
      
     }
  }
  const SaveResume=async()=>{
    isSave(true);
    const resumeData={personalInfo,position,summary,level,experience,education,projects,certifications,skills,Resumetitle,ResumeTemplateId};

  try {
    axios.defaults.withCredentials=true;
    const res=await axios.post('https://ai-powered-resume-builder.onrender.com/api/v1/resume/add',{resumeData});
   toast.success(res.data.message);
  } catch (error) {
    console.log(error)
    toast.error(res.data.message);
  }finally{
    isSave(false);
    setDowloadEnable(true);
  }
  }
  const handleDownloadPDF = () => {
    const resumeElement = document.getElementById("resume-preview");
  
    if (!resumeElement) return;
  
    const originalContent = document.body.innerHTML; 
    document.body.innerHTML = resumeElement.outerHTML; 
  
    window.print(); // Open print dialog
  
    document.body.innerHTML = originalContent; 
  };
  

  return (
    <>
      <div className="z-10 rounded shadow-xl relative">
        <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <div className="ml-10 flex-1 items-start content-center">
            <button
              onClick={() => settemplatestoreview(true)}
              className="px-6 py-2 shadow-2xl rounded bg-blue-600 mr-3 whitespace-nowrap box-shadow-lg hover:bg-blue-700 transition-colors text-white"
            >
              Change Template
            </button>
            <button
              className="px-8 py-2 rounded shadow-2xl text-white bg-gray-700 whitespace-nowrap hover:bg-gray-600 transition-colors"
              onClick={() => setIsPreviewOpen(true)}
            >
              Preview
            </button>
          </div>
          
          {!DowloadEnable?  !EditPage ? <button
          type="button"
           onClick={SaveResume}
            className="px-5 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors"
          > {!Save?'Save Resume':<span className="flex text-white gap-2 text-[16px]"><Loader  className="animate-spin" />Saving...</span>}  
          </button>: <button
          type="button"
          onClick={HandelEditResume}
            className="px-5 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition-colors"
          > {!Save?'Update Resume':<span className="flex text-white gap-2 text-[16px]"><Loader  className="animate-spin" />Updating...</span>}  
          </button> : <button
          type="button"
            onClick={()=>handleDownloadPDF()}
            className="px-5 py-2 flex gap-3 bg-green-500 rounded font-semibold text-gray-800 hover:bg-green-400 transition-colors"
          ><Download className="text-gray-800" /> Dowload  </button>  }
         <button onClick={()=>setOpenMenu((prev)=>!prev)} ><CiMenuKebab className="text-[25px] ml-2 h-16  text-white" /></button>
         { OpenMenu && 
          <div className="absolute right-3  rounded text-white top-20 h-38 w-48 bg-gray-700"
          onClick={()=>setOpenMenu((prev)=>!prev)}>
          <div onClick={HandelEditResume}  className="flex-col mr-3 ml-5 list-none "><p className="px-4 py-2 rounded hover:bg-slate-600 w-full inline-flex  "><FcInspection className="text-[30px] mr-2" />Update Changes</p>
          <p onClick={handleDownloadPDF} className="px-4 py-2 w-full rounded hover:bg-slate-600 inline-flex"><Download className="text-green-600 mr-2" />Dowload</p>
          <p className="px-4 py-2 rounded w-full hover:bg-slate-600 inline-flex">
            <RWebShare
        data={{
          text: "Hello Everyone, This is my resume please open url to see it",
          url: import.meta.env.VITE_BASE_URL+"/resume/"+resumeId+"/view",  
        }}
       
      >
        <button className=" inline-flex"><FaShare className="mr-2 text-[20px] text-green-400" /> Share</button>
      </RWebShare>
      </p>
      <p onClick={()=>window.location.href=`${import.meta.env.VITE_BASE_URL}/resume/${resumeId}/view`} className="px-4 py-2 w-full rounded hover:bg-slate-600  inline-flex"><View className="text-green-600 mr-2" />View</p>
      </div>
         </div>}
         
        </div>
        <div
          id="resume-preview"
          contentEditable={isToggled}
          className="h-auto overflow-auto "
        >
          {React.createElement(templates[ResumeTemplateId])}
        </div>
      </div>
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        templateId={ResumeTemplateId}
      />
      <TemplateStore
        isOpen={templatestoreview}
        onClose={() => settemplatestoreview(false)}
      />
    </>
  );
};

export default ResumePreview;

