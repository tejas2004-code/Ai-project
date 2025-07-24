import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  Palette,
  Code,
  Lightbulb,
} from "lucide-react";
import { useResumeStore } from "../../Store/useResumeStore";



export function CreativeTemplate() {
  const {
    personalInfo = {},
    summary = "",
    experience = [],
    skills = { technical: [], design: [] },
    education = [],
    certifications = [],
    projects = [],
  } = useResumeStore();

  return (
    <div  className="grid grid-cols-3 min-h-[1000px] bg-white">
      {/* Sidebar */}
      <div className="col-span-1 bg-gradient-to-b from-purple-600 to-blue-600 text-white p-8">
        <div className="sticky top-8">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full bg-white/10 mx-auto mb-6 overflow-hidden">
            <img
              src={
                personalInfo?.profileImageUrl ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=128&h=128"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Name and Title */}
          <h1 className="text-2xl font-bold text-center mb-1">
            {personalInfo.name }
          </h1>
          <h2 className="text-lg text-blue-200 text-center mb-6">
            {personalInfo.title }
          </h2>
          {/* Contact */}
          <div className="space-y-3 text-sm">
            {personalInfo.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3" />
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3" />
                {personalInfo.location}
              </div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center"  >
                <Globe className="h-4 w-4 mr-3" />
                <a href={personalInfo.portfolio.link} target="_blank" rel="noopener noreferrer">
                {personalInfo.portfolio.text}
              </a>
              </div>
            )}
          </div>
          {/* Design Skills */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Design Skills
            </h3>
            <div className="space-y-3">

              { Array.isArray(skills)? (skills.design.map((item, index) => (
                <div  className="flex justify-between text-sm mb-1">
                  {item}
                </div>
               
              ))):<span>Add design Skills</span>}
            </div>
          </div>
          {/* Technical Skills */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="col-span-2 p-8">
        {/* Profile Summary */}
        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Lightbulb className="h-6 w-6 mr-2 text-purple-600" />
            Profile
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {summary}
          </p>
        </section>
        {/* Experience */}
        <section className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Award className="h-6 w-6 mr-2 text-purple-600" />
            Experience
          </h3>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900">{exp.position}</h4>
                    <div className="text-purple-600">{exp.company}</div>
                  </div>
                  <span className="text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p
                 
  dangerouslySetInnerHTML={{ __html: exp.description }}
  className="mt-2 text-gray-700"
/>

                
              </div>
            ))}
          </div>
        </section>
        {/* Projects */}
        <section className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Featured Projects</h3>
          <div className="grid grid-cols-1 gap-6">
          {projects?.map((project) => (
  <div
    key={project.title}
    className="p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
  

    {/* Description Section with Bullet Points */}
    <div className="text-gray-700 text-sm mb-2">
      <h4 className="font-semibold text-gray-900">Description:</h4>
      <ul className="list-disc pl-5">
        <li>{project.description}</li>
      </ul>
    </div>
    
    <h4 className="font-semibold text-gray-900">Link:</h4>
    <a href={project.link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
      {project.link}
    </a>
  </div>
))}



          </div>
        </section>
      </div>
    </div>
  );
}
