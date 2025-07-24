import React from 'react';
import { Mail, Phone, MapPin, Globe, Award, Calendar, Code } from 'lucide-react';
import { useResumeStore } from '../../Store/useResumeStore';

export function ModernTemplate() {
  const { 
    personalInfo = {}, 
    summary = '', 
    experience = [ ], 
    skills = { technical: [] }, 
    education = [], 
    projects=[],
    certifications = [] ,
    experiencelevel,
  } = useResumeStore();

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white text-gray-800">
      <header className="border-b-2 border-blue-600 pb-6">
        <h1 className="text-4xl font-bold text-gray-900">{personalInfo.name || 'Your Name'}</h1>
        <h2 className="text-xl text-blue-600 mt-1 font-semibold">{personalInfo.title || ''}</h2>

        <div className="mt-4 flex flex-wrap gap-4 text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-blue-600" />
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-blue-600" />
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-blue-600" />
              {personalInfo.location}
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2 text-blue-600" />
              <a href={personalInfo.portfolio.link} target="_blank" rel="noopener noreferrer">
                {personalInfo.portfolio.text}
              </a>
            </div>
          )}
        </div>
      </header>
  
      <section className="mt-8">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <Award className="h-5 w-5 mr-2 text-blue-600" />
          Professional Summary
        </h3>
        <div className="mt-3 text-gray-700">{summary || 'Add a summary here.'}</div>
      </section>

      { experiencelevel ? ( 
  <section className="mt-8">
  <h3 className="text-lg font-bold text-gray-900 flex items-center">
    <Code className="h-5 w-5 mr-2 text-blue-600" />
    Projects
  </h3>
  <div className="mt-3 space-y-6">
    {projects.length ? (
       <div className="flex-1  gap-4">
       {projects?.map((project) => (
         <div key={project.title}>
          <div className='flex '>    <h2 className="font-medium text-gray-900">{project.title}</h2>     <span className="flex items-center absolute right-8 text-sm">
                 <Globe className="h-4 w-4 mr-2 text-blue-600" />
                 <a 
                   href={project.link} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-blue-600 hover:underline"
                 >
                   Live Demo
                 </a>
               </span></div>
        

           <div dangerouslySetInnerHTML={{ __html:project.description  }} className="text-gray-700  w-[650px] text-sm mt-1" />

         </div>
       ))}
     </div>
    ) : (
      <p className="text-gray-600">Add your projects here.</p>
    )}
  </div>
</section>) :(
  <section className="mt-8">
  <h3 className="text-lg font-bold text-gray-900 flex items-center">
    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
    Professional Experience
  </h3>
  <div className="mt-4 space-y-6">
    {experience.length ? (
      experience.map((job, index) => (
        <div key={index}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-gray-900">{job.position || 'Position'}</h4>
              <div className="text-blue-600">{job.company || 'Company'}</div>
            </div>
            <span className="text-gray-600 text-sm">{`${job.startDate || ''} - ${job.endDate || ''}`}</span>
          </div>
          <div className="mt-2 text-gray-700 " dangerouslySetInnerHTML={{ __html: job.description }}></div>
     
        </div>
      ))
    ) : (
      <p className="text-gray-600">Add your professional experience here.</p>
    )}
  </div>
</section>)

   }

      <div className="grid grid-cols-2 gap-8 mt-8">
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.technical.length ? (
              skills.technical.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-600">Add your technical skills here.</p>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-3">Education</h3>
          {education.length ? (
            education.map((edu, index) => (
              <div key={index} className="mt-3">
                <div className="font-bold text-gray-900">{edu.degree || 'Degree'}<span className='text-blue-600 ml-1  font-medium'>{edu.field}</span></div>
                <div className="text-blue-600">{edu.school || 'Institution'}</div>
                <div className="text-gray-600 text-sm">{edu.graduationDate || ''}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Add your educational qualifications here.</p>
          )}
        </section>
      </div>

      <section className="mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Certifications</h3>
        <div className="flex-1 flex-wrap gap-4">
          {certifications.length ? (
            certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-50 px-4 py-2 rounded-lg"
              >
                <Award className="h-5 w-5 mr-2 text-blue-600" />
                <span className="text-gray-700">{cert.name || 'Certification Name'}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Add your certifications here.</p>
          )}
        </div>
      </section>
    </div>
  );
}
