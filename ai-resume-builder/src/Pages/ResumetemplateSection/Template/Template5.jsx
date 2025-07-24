import { useResumeStore } from "@/Pages/Store/useResumeStore";
import { Email, LocalActivity, LocationCity } from "@mui/icons-material";
import { Award, Link, LocateIcon, LucideExternalLink, Phone } from "lucide-react";
import React from "react";
import { FaLocationArrow, FaSearchLocation } from "react-icons/fa";
import { IoLocateSharp, IoLocationSharp } from "react-icons/io5";




export function Template5(){
  const {
    personalInfo,
    Resumetitle,
    position,
    summary,
    experience,
    education,
    projects,
    certifications,
    skills,
  } = useResumeStore();
 

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="flex">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-blue-900 text-white p-6">
        <div className="flex flex-col items-center mb-8">
          <img src={personalInfo.profileImageUrl} 
               alt="Profile" 
               className="rounded-full mb-4" 
               width="100" 
               height="100" />
          <h2 className="text-xl font-bold mb-4">CONTACT</h2>
          <p className="mt-2">
            <i className="fas fa-phone-alt mr-2"></i>
            {personalInfo.phone}
          </p>
          <p className="mt-2">
            <i className="fas fa-envelope mr-2"></i>
            {personalInfo.email}
          </p>
          <p className="mt-2">
            <i className="fas fa-map-marker-alt mr-2"></i>
            {personalInfo.location}
          </p>
          <div className="mt-4 space-y-2">
            {personalInfo.GithubUrl?.link && (
              <a href={personalInfo.GithubUrl.link} className="flex items-center">
                <i className="fab fa-github mr-2"></i>
                {personalInfo.GithubUrl.text}
              </a>
            )}
            {personalInfo.linkedin?.link && (
              <a href={personalInfo.linkedin.link} className="flex items-center">
                <i className="fab fa-linkedin mr-2"></i>
                {personalInfo.linkedin.text}
              </a>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">EDUCATION</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="font-bold">{edu.graduationDate}</p>
              <p className="font-semibold">{edu.school}</p>
              <p>{edu.degree} in {edu.field}</p>
              {edu.achievements && <p className="text-sm mt-1">{edu.achievements}</p>}
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">SKILLS</h2>
          <div className="space-y-2">
            <h3 className="font-semibold">Technical:</h3>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {skill}
                </span>
              ))}
            </div>
            <h3 className="font-semibold mt-3">Soft Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill, index) => (
                <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-900">{personalInfo.name}</h1>
          <h2 className="text-xl text-gray-600">{position || "SoftWare Developer"}</h2>
         
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">SUMMARY</h2>
          <p className="text-gray-700">{summary}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">EXPERIENCE</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-bold">{exp.company}</h3>
              <p className="italic">{exp.position}</p>
              <p className="text-gray-600">{exp.startDate} - {exp.endDate}</p>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {Array.isArray(exp.description) 
                  ? exp.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))
                  : <li>{exp.description}</li>}
              </ul>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">PROJECTS</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-bold">{project.title}</h3>
              <p className="text-gray-700">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} className="text-blue-600 mt-2 inline-block">
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};



export function Template6(){
  
  const {
    personalInfo,
    Resumetitle,
    position,
    summary,
    experience,
    education,
    skills,
    certifications,
  } = useResumeStore();

  return (
    <div className="bg-gray-100 font-roboto p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-700">{personalInfo.name}</h1>
          <h2 className=" font-semibold text-gray-600">{position} || Software Developer</h2>
          <p className="text-gray-600">
            {personalInfo.location} | {personalInfo.email} | {personalInfo.portfolio.link}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold text-blue-700">SUMMARY</h2>
          <p className="text-gray-700 mt-2">{summary}</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold text-blue-700">TECHNICAL SKILLS</h2>
          <div className="grid grid-cols-2 gap-4 mt-2 text-gray-700">
            {skills.technical.map((skill, index) => (
              <p key={index}>{skill}</p>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold text-blue-700">PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mt-2">
              <h3 className="font-semibold text-gray-800">{exp.company}</h3>
              <p className="text-gray-600">{exp.startDate} - {exp.endDate}</p>
              <div className="mt-2 text-gray-700 " dangerouslySetInnerHTML={{ __html: exp.description }}></div>
     
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold text-blue-700">EDUCATION</h2>
          {education.map((edu, index) => (
            <div key={index} className="mt-2">
              <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
              <p className="text-gray-600">{edu.graduationDate}</p>
              <p className="text-gray-700">{edu.school}</p>
              
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold text-blue-700">ADDITIONAL INFORMATION</h2>
          <div className="mt-2 text-gray-700">
            <p>
              <span className="font-semibold text-gray-700">Certifications:</span> {certifications.length ? (
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
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export function Template7(){
  const { personalInfo, skills,summary, Resumetitle, experience, education } = useResumeStore();

  return (
    <div className="bg-gray-100  min-h-screen flex justify-center">
      <div className="max-w-4xl bg-white p-8 rounded-lg shadow-lg border border-gray-300">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
          <p className="text-gray-600">{Resumetitle}</p>
          <div className="border-t border-gray-300 mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">CONTACT</h2>
              <p className="flex items-center"><i className="fas fa-phone mr-2"></i> {personalInfo.phone}</p>
              <p className="flex items-center"><i className="fas fa-envelope mr-2"></i> {personalInfo.email}</p>
              <p className="flex items-center"><i className="fas fa-map-marker-alt mr-2"></i> {personalInfo.address}</p>
              <p className="flex items-center"><i className="fas fa-globe mr-2"></i> {personalInfo.website}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">SKILLS</h2>
              <ul className="list-disc list-inside">
                {skills.technical.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">Soft skills</h2>
              {skills.soft.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
            </div>
          </div>

          <div className="col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-2">PROFILE</h2>
              <p>{summary}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">WORK EXPERIENCE</h2>
              <div className="relative timeline">
                {experience.map((job, index) => (
                  <div key={index} className="timeline-item mb-8">
                    <h3 className="font-bold">{job.company}</h3>
                    <p className="italic">{job.position}</p>
                    <p className="text-gray-600">{job.startDate}-{job.endDate}</p>
                    <div className="mt-2 text-gray-700 " dangerouslySetInnerHTML={{ __html: job.description }}></div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-2">EDUCATION</h2>
              <div className="relative timeline">
                {education.map((edu, index) => (
                  <div key={index} className="timeline-item mb-8">
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="italic">{edu.graduationDate}</p>
                    <p>{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




export function Template8() {
  const {
    personalInfo,
    summary,
    education,
    projects,
    skills,
    position,
    certifications
  } = useResumeStore();

  return (
    <div className="bg-white text-black font-sans max-w-4xl mx-auto p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
        <p className="text-lg">
          {position} 
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a className="text-blue-500 flex" href={`mailto:${personalInfo.email}`}>
           <Email size={16} className="mr-1 mt-1" /> {personalInfo.email}
          </a>
          <a className="text-blue-500   flex" href={`tel:${personalInfo.phone}`}>
            <Phone size={16} className="mt-1 mr-1"/> {personalInfo.phone}
          </a>
          <a className="text-blue-500 flex">
            <IoLocationSharp size={16} className="mt-1 mr-1" /> {personalInfo.location}
          </a>
          <a className="text-blue-500 flex" href={personalInfo.portfolio.link}>
            <Link size={16} className="mt-1 mr-1" /> {personalInfo.portfolio.text}
          </a>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold text-blue-500">SUMMARY</h2>
        <div className="border-t border-gray-300 mt-2"></div>
        <div className="mt-4">
          <p>{summary}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold text-blue-500">EDUCATION</h2>
        <div className="border-t border-gray-300 mt-2"></div>
        {education.map((edu, index) => (
          <div key={index} className="mt-4">
            <div className="flex justify-between">   <h3 className="font-bold">{edu.school}</h3>
            {edu.graduationDate && (
              <p className="text-gray-600 ">{edu.graduationDate}</p>
            )}
            </div>
            <p className="italic">{edu.degree} - {edu.field}</p>
            
            {edu.achievements && (
              <p className="mt-1">{edu.achievements}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold text-blue-500">PROJECTS</h2>
        <div className="border-t border-gray-300 mt-2"></div>
        {projects.map((project, index) => (
          <div key={index} className="mt-4">
            <h3 className="font-bold flex items-center">
              {project.title}
              {project.link && (
                <a className="text-blue-500 ml-1" href={project.link}>
                  <LucideExternalLink size={16} />
                </a>
              )}
            </h3>
            <ul className="list-disc list-inside mt-2 space-y-1" dangerouslySetInnerHTML={{__html:project.description}}>
             </ul>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold text-blue-500">SKILLS</h2>
        <div className="border-t border-gray-300 mt-2"></div>
        <ul className="list-disc list-inside mt-4 space-y-1">
          {skills.technical?.length > 0 && (
            <li>
              <span className="font-bold text-black">Technical:</span>{' '}
              {skills.technical?.join(', ')}
            </li>
          )}
          {skills.soft?.length > 0 && (
            <li>
              <span className="font-bold text-black">Soft:</span>{' '}
              {skills.soft.join(', ')}
            </li>
          )}
        </ul>
      </div>
  {certifications && 
  <div className="mt-6">
  <h2 className="text-xl font-bold text-blue-500">ACHIEVEMENTS</h2>
  <div className="border-t border-gray-300 mt-2"></div>
  <div className="list-disc list-inside mt-4 space-y-1">
    {certifications.map((edu, index) =>
      edu.name ? (
        <div key={index} className="flex justify-between"><h3>• {edu.name}</h3> <p>{edu.date}</p>  </div>
      ) : null
    )}
  </div>
</div> }
      
    </div>
  );
}

const Templates = { Template5, Template6, Template7 ,Template8};
export default Templates;


