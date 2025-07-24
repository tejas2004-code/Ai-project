import React from 'react';
import { Mail, Phone, MapPin, Link2, Award, Briefcase, GraduationCap } from 'lucide-react';
import { useResumeStore } from "../../Store/useResumeStore";

export function ExecutiveTemplate() {
  const { 
     personalInfo = {}, 
     summary = '', 
     experience = [], 
     skills = { technical: [] }, 
     projects=[],
     education = [], 
     certifications = [] 
   } = useResumeStore();

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white text-gray-800">
      <header className="text-center  border-gray-900 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 tracking-wide">{personalInfo.name}</h1>
        <h2 className="text-xl text-gray-700 mt-2">{personalInfo.title}</h2>

        <div className="mt-4 flex justify-center gap-6 text-gray-600">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            {personalInfo.email}
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            {personalInfo.phone}
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {personalInfo.location}
          </div>
          <div className="flex items-center" >
            <Link2 className="h-4 w-4 mr-2" />
            <a href={personalInfo.linkdin?.link} target="_blank" rel="noopener noreferrer">
                {personalInfo.linkdin?.text}
              </a>
          </div>
        </div>
      </header>

      <section className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4 flex items-center">
          <Award className="h-5 w-5 mr-2" />
          EXECUTIVE SUMMARY
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {summary}
        </p>
      </section>

      <section className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4 flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          PROFESSIONAL EXPERIENCE
        </h3>
        <div className="space-y-6">
          {experience.map((job, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">{job.company}</h4>
                  <div className="text-gray-700 font-semibold">{job.position}</div>
                </div>
                <span className="text-gray-600">{job.startDate} - {job.endDate}</span>
              </div>
              <ul className="mt-2 space-y-2 text-gray-700" dangerouslySetInnerHTML={{ __html: job.description }}>
             
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <section>
          <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4 flex items-center">
            <GraduationCap className="h-5 w-5 mr-2" />
            EDUCATION
          </h3>
          <div className="space-y-4">
            {education.map((degree, index) => (
              <div key={index}>
                <div className="font-bold text-gray-900">{degree.degree}</div>
                <div className="text-gray-700">{degree.institution}</div>
                <div className="text-gray-600">{degree.duration}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">
            CORE COMPETENCIES
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {skills.technical.map((skill, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <span className="h-1.5 w-1.5 bg-gray-700 rounded-full mr-2" />
                {skill}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">
          BOARD MEMBERSHIPS & AWARDS
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <div key={index} className="flex items-center bg-gray-50 px-4 py-3 rounded-lg">
              <Award className="h-5 w-5 mr-3 text-gray-700" />
              <span className="text-gray-700">{cert.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
