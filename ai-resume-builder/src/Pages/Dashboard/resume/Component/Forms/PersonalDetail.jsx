import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Link2,
  LinkIcon,
  Copy,
 
} from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useResumeStore } from '@/Pages/Store/useResumeStore';

import { Avatar } from '@mui/material';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';



const PersonalDetail = () => {
  const { personalInfo, updatePersonalInfo, } = useResumeStore();
  const [isPortfolioVisible, setIsPortfolioVisible] = useState(false);
  const [isGithubVisible, setIsGithubVisible] = useState(false);
  const [isLinkedinVisible, setIsLinkedinVisible] = useState(false);
 const [ImageUrl,setImageUrl]=useState();
  const [errors, setErrors] = useState({});

  const validateInput = (name, value) => {
    let error = '';
    if (!value.trim()) {
      error = 'This field is required.';
    } else {
      switch (name) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) error = 'Enter a valid email address.';
          break;
        case 'phone':
          const phoneRegex = /^\+?[0-9]{10,15}$/;
          if (!phoneRegex.test(value)) error = 'Enter a valid phone number.';
          break;

        case 'portfolio':
          const  PortfolioUrl =/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/;
          if(!PortfolioUrl.test(value)) error='Please enter a valid URL (e.g., https://example.com).';
          break;

        case 'linkedin':
            const  linkedinUrl =/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/;
            if(!linkedinUrl.test(value)) error='Please enter a valid URL.';
            break;

        case 'github':
              const  githubUrl =/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/;
              if(!githubUrl.test(value)) error='Please enter a valid URL.';
              break;
        default:
          break;
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (name, value) => {
    
    validateInput(name, value);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageUrl(imageURL); 
      updatePersonalInfo({ profileImageUrl: imageURL });
    }
  }

  return (
    <>
      <div className="bg-gray-800/50 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-400" />
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className='relative flex-1 items-center'>
          <label className="block text-sm font-medium text-gray-300 mb-1">
              Profile Photo <span className='text-[#0ef]'>...Optional</span>
            </label>
          <Avatar className='' sx={{ width: 100, height: 100  ,bgcolor:"rgb(55 65 81 / 0.5)"}}  src={ImageUrl}/>
           <input type="file"  className='mt-1 text-gray-500'  onChange={handleFileChange} name="upload profile Photo" id="" /></div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={personalInfo?.name}
              onChange={(e) =>{ handleChange('name', e.target.value);
                updatePersonalInfo({name:e.target.value})
              }}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Desi Trogen"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <div className=''>
              <Mail className="absolute left-3 top-5  transform -translate-y-1/2 text-gray-400 w-5 h-5 peer-focus:text-blue-600" />
              <input
                type="email"
                value={personalInfo?.email}
                onChange={(e) => { handleChange('email', e.target.value);
                  updatePersonalInfo({email:e.target.value})
                }}
                className="peer w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="desiTrogen@example.com"
              /></div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>
    
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-5 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={personalInfo?.phone}
                onChange={(e) =>{ handleChange('phone', e.target.value);
                  updatePersonalInfo({phone:e.target.value})
                }}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="(+91) 9186465384"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Location
            </label>
            <div className="relative ">
              <MapPin className=" icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={personalInfo?.location}
                onChange={(e) =>{handleChange('location', e.target.value);
                  updatePersonalInfo({location:e.target.value})
                }}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:icon-text-blue-500 focus:ring-blue-500 text-white"
                placeholder="City, State"
              />
            </div>
            
          </div>

          {/* Portfolio Website */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-1 ">
              Portfolio Website 
            </label>
            <div className="relative flex ">
              <Link2  className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={personalInfo.portfolio.text}
                onChange={(e) =>
                  updatePersonalInfo({
                    portfolio: { ...personalInfo.portfolio, text: e.target.value },
                  })
                
                }
                
                
                className=" w-full pl-10 pr-4 py-2 bg-gray-700/50 border  border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Portfolio website"
              />
       <button onClick={()=>setIsPortfolioVisible((prev)=>!prev)} className='absolute right-0 w-10 items-center content-center justify-center flex rounded text-[#0ef] h-full border-2 bg-gray-700 shadow-2xl '  type='button'><LinkIcon/></button>
            </div>
            { isPortfolioVisible &&
            <div className="flex items-center mt-2 bg-gray-700">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              value={personalInfo.portfolio.link || "https://"}
              onChange={(e)=>{updatePersonalInfo({
                portfolio:{...personalInfo.portfolio,link:e.target.value},
              });
               handleChange("portfolio",e.target.value)}}
              className='bg-gray-700/50 py-5 placeholder:text-gray-500 text-white focus:ring-2 focus:ring-blue-500'
              placeholder='www.linkedin.com/jone-nike'
            />
          </div>
          <Button type="button"  className="bg-gray-700 h-10 w-11 border-2 text-[#0ef] rounded">
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>}
          
            {errors.portfolio && <p className="text-red-500 text-sm mt-1">{errors.portfolio}</p>}
          </div>
          {/* LinkedIn Profile */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
              LinkedIn Profile
            </label>
            <div className="relative flex">
              <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={personalInfo.linkedin?.text}
                onChange={(e) =>
                  updatePersonalInfo({
                    linkedin: { ...personalInfo.linkedin, text: e.target.value },
                  })
                
                }
                className="w-full  pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="LinkedIn profile"
              />
                 <button onClick={()=>setIsLinkedinVisible((prev)=>!prev)} className='absolute right-0 w-10 items-center content-center justify-center flex rounded text-[#0ef] h-full border-2 bg-gray-700 shadow-2xl '  type='button'><LinkIcon/></button>
            </div>
            { isLinkedinVisible &&
            <div className="flex items-center mt-2 bg-gray-700">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              value={personalInfo.linkedin?.link || "https://"}
              onChange={(e)=>{updatePersonalInfo({
                linkedin:{...personalInfo.linkedin,link:e.target.value},
              });
              handleChange('linkedin',e.target.value)
            }}
              className='bg-gray-700/50 py-5  placeholder:text-gray-500 text-white focus:ring-2 focus:ring-blue-500'
              placeholder='www.linkedin.com/jone-nike'
            />
          </div>
          <Button type="button"  className="bg-gray-700 h-10 w-11 border-2 text-[#0ef] rounded">
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>}
            {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>}
          </div>

          {/* GitHub */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-1">
              GitHub URL     
            </label>
            <div className="relative flex">
              <FaGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
              value={personalInfo.GithubUrl.text}
                type="text"
                onChange={(e) =>{
                  updatePersonalInfo({
                    github: { ...personalInfo.GithubUrl, text: e.target.value },
                  });
                 
                
                }}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="GitHub URL"
              />
                 <button onClick={()=>setIsGithubVisible((prev)=>!prev)} className='absolute right-0 w-10 items-center content-center justify-center flex rounded text-[#0ef] h-full border-2 bg-gray-700 shadow-2xl '  type='button'><LinkIcon/></button>

            </div>
            { isGithubVisible &&
            <div className="flex items-center mt-2 bg-gray-700">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
            value={personalInfo.GithubUrl.link || "https://"}
              id="link"
              onChange={(e)=>{updatePersonalInfo({
                github:{...personalInfo.GithubUrl,link:e.target.value},
              });
              handleChange('github',e.target.value);
            }}
              className='bg-gray-700/50  placeholder:text-gray-500 py-5 text-white focus:ring-2 focus:ring-blue-500'
              placeholder='www.linkedin.com/jone-nike'
            />
          </div>
          <Button type="button"  className="bg-gray-700 h-10 w-11 border-2 text-[#0ef] rounded">
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>}
            {errors.github && <p className="text-red-500 text-sm mt-1">{errors.github}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDetail;
