import React from 'react';
import { Mail, Phone, MapPin, Link2 } from 'lucide-react';
import { useResumeStore } from "../../Store/useResumeStore";


export  function MinimalTemplate() {
  
 const { 
    personalInfo = {}, 
    summary = '', 
    experience = [], 
    skills = { technical: [] }, 
    education = [], 
    projects=[],
    certifications = [] 
  } = useResumeStore();

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white text-gray-800">
      <header className="mb-8">
        <h1 className="text-3xl font-light text-gray-900">{personalInfo?.name || 'Alex Thompson'}</h1>
        <div className="text-gray-600 mt-2 flex flex-wrap gap-4">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            {personalInfo?.email || 'alex.thompson@email.com'}
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            {personalInfo?.phone || '(555) 234-5678'}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {personalInfo?.location || 'Boston, MA'}
          </div>
          <div className="flex items-center"  >
            <Link2 className="h-4 w-4 mr-2" />
            <a href={personalInfo.portfolio.link} target="_blank" rel="noopener noreferrer">
                {personalInfo.portfolio.text}
              </a>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Professional Summary</h2>
        <div className="h-px bg-gray-200 mb-3" />
        <p className="text-gray-700 leading-relaxed">{summary || 'Product-focused UX Designer with 6+ years of experience creating user-centered digital experiences.'}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Experience</h2>
        <div className="h-px bg-gray-200 mb-3" />
        <div className="space-y-6">
          {experience?.map((exp) => (
            <div key={exp.title}>
              <div className="flex justify-between mb-1">
                <div>
                  <span className="font-medium text-gray-900">{exp.position}</span>
                  <span className="text-gray-600 mx-2">•</span>
                  <span className="text-gray-700">{exp.company}</span>
                </div>
                <span className="text-gray-600">{`${exp.startDate || ''} - ${exp.endDate || ''}`}</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2" dangerouslySetInnerHTML={{ __html: exp.description }}>
              
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-8">
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-2">Skills</h2>
          <div className="h-px bg-gray-200 mb-3" />
          <div className="flex flex-wrap gap-2">
            {skills?.technical.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-2">Education</h2>
          <div className="h-px bg-gray-200 mb-3" />
          <div className="space-y-4">
            {education?.map((edu) => (
              <div key={edu.degree}>
                <div className="font-medium text-gray-900">{edu.degree}</div>
                <div className="text-gray-700">{edu.school}</div>
                <div className="text-gray-600 text-sm">{edu.year}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Projects</h2>
        <div className="h-px bg-gray-200 mb-3" />
        <div className="grid grid-cols-2 gap-4">
          {projects?.map((project) => (
            <div key={project.title}>
              <h3 className="font-medium text-gray-900">{project.title}</h3>
              <p className="text-gray-700 text-sm mt-1">{project.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
