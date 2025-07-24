import React, { useState } from 'react';
import { FileText, Star, Cpu, KeyRound, X, Plus, PlusCircle, FileEdit } from 'lucide-react';
import { useResumeStore } from '@/Pages/Store/useResumeStore';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AichatSession } from '@/Pages/Service/geminiapi';
import { motion } from 'framer-motion';

import { FcPlus } from 'react-icons/fc';

export default function ResumeCreateHeader() {
  const [activeTab, setActiveTab] = useState('description');
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [atsData, setAtsData] = useState({ score: null, keywords: [] });

  const [enhancementResults, setEnhancementResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState('');

  const { personalInfo, position, level, addSkill, summary, experience, education, projects, certifications, skills } = useResumeStore();
  const { isToggled, setIsToggled } = useResumeStore();
  const parseAIResponse = (rawData) => {
    try {
      const cleanedData = rawData.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanedData);
    } catch (e) {
      console.error("Parsing failed:", e);
      setError("Failed to process AI response. Please try again.");
      return null;
    }
  };

  const HandleResumeEnhancement = async () => {
    setLoading(true);
    setError('');
    setEnhancementResults(null);
  
    try {
      const currentState = useResumeStore.getState();
      const hasJobDescription = jobDescription.trim().length > 0;
  
      const prompt = `Analyze and enhance this resume for ${currentState.position} (${currentState.level} level)
      ${hasJobDescription ? `using this job description: "${jobDescription.replace(/"/g, "'")}"` : ''}.
      
      Return STRICT JSON with:
      {
        "summary": {
          "original": "<current>",
          "enhanced": "<job-targeted profile>",
          "keywords": ["JD-matched terms"]
        },
        "experience": [{
          "index": 0,
          "original": "<text>",
          "enhanced": "<JD-aligned STAR statements>",
          "relevance": "<job requirement match>"
        }],
        "skills": {
          "technical": ["JD-specific technologies"],
          "soft": ["JD-mentioned competencies"]
        },
        "jobAlignment": {
          "matchedKeywords": ["list"],
          "missingKeywords": ["list"],
          "score": 0-100
        },
        "suggestions": ["JD-focused improvements"]
      }
  
      STRICT RULES:
      - Prioritize skills from JD: ${hasJobDescription ? 'Required' : 'N/A'}
      - Mirror job description language patterns
      - Highlight ${hasJobDescription ? 'JD-specific' : 'general'} achievements
      - Validate JSON structure
      -  DO NOT include any text outside the JSON format. 
      - DO NOT add explanations.  `;
  
      const result = await AichatSession.sendMessage(prompt);
      const rawData = await result.response.text();
      const enhancements = parseAIResponse(rawData);
      console.log(rawData);
  
      if (!enhancements) return;
  
      // Update store with JD-specific enhancements
      useResumeStore.setState(state => ({
        summary: enhancements.summary?.enhanced || state.summary,
        skills: {
          technical: [
            ...new Set([
              ...(enhancements.skills?.technical || []),
              ...state.skills.technical
            ])
          ].sort(a => enhancements.skills?.technical.includes(a) ? -1 : 1),
          soft: [
            ...new Set([
              ...(enhancements.skills?.soft || []),
              ...state.skills.soft
            ])
          ]
        },
        experience: enhancements.experience?.reduce((acc, exp) => {
          if (acc[exp.index]) {
            acc[exp.index].description = exp.enhanced;
          }
          return acc;
        }, [...state.experience]) || state.experience
      }));
  
      setEnhancementResults({
        suggestions: enhancements.suggestions || [],
        jobAlignment: enhancements.jobAlignment || {},
        keywords: enhancements.summary?.keywords || []
      });
  
    } catch (error) {
      console.error("JD enhancement failed:", error);
      setError("Job-specific enhancement failed. Please check the job description format.");
    } finally {
      setLoading(false);
    }
  };


  const HandelAtsScore = async () => {
    setLoading(true);
    setError('');
    const hasJobDescription = jobDescription.trim().length > 0;
    const prompt = `Calculate ATS compatibility score (0-100) for this resume applying to ${position} ans ${hasJobDescription ? `using this job description: "${jobDescription.replace(/"/g, "'")}"` : ''}.
    Job Description: ${jobDescription}
    Resume Data: ${JSON.stringify({
      skills,
      experience,
      education,
      projects,
      certifications
    })}
    
    Respond with JSON containing:
    - score: number
    - matchedKeywords: array
    - missingKeywords: array
    - optimizationTips: array`;

    try {
      const result = await AichatSession.sendMessage(prompt);
      const response = parseAIResponse(await result.response.text());

      if (response) {
        setAtsData({
          score: response.score,
          keywords: response.matchedKeywords,
          missing: response.missingKeywords,
          tips: response.optimizationTips
        });
      }
    } finally {
      setLoading(false);
    }
  };


  const renderAtsScore = () => (
    <div className="space-y-4">
      <button onClick={HandelAtsScore} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded hover:opacity-90">
        Check ATS Score
      </button>
      <div className="flex items-center gap-2 mb-4">
        <Star className="text-yellow-500" />
        <span className="text-lg font-semibold text-white">
          ATS Score: {atsData.score}/100
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-700 rounded-lg">
          <h4 className="text-blue-400 mb-2">Matched Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {atsData.keywords.map((kw, i) => (
              <span key={i} className="px-2 py-1 bg-green-700/30 rounded text-sm">
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-700 rounded-lg">
          <h4 className="text-red-400 mb-2">Missing Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {atsData.missing?.map((kw, i) => (
              <span key={i} className="px-2 py-1 bg-red-700/30 rounded text-sm">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {atsData.tips?.length > 0 && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg">
          <h4 className="text-purple-400 mb-2">Optimization Tips</h4>
          <ul className="list-disc pl-4 space-y-2">
            {atsData.tips.map((tip, i) => (
              <li key={i} className="text-gray-300 text-sm">{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderEnhancements = () => (
    <div className="space-y-4">
      <button
        onClick={HandleResumeEnhancement}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded hover:opacity-90"
      >
        {jobDescription ? 'Job-Targeted Enhancement' : 'Enhance Resume'}
      </button>
  
      {enhancementResults && (
        <div className="mt-4 space-y-4">
          {enhancementResults.jobAlignment?.score && (
            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="text-green-400 mb-2">
                Job Match Score: {enhancementResults.jobAlignment.score}/100
              </h4>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <h5 className="text-blue-300 text-sm">Matched Keywords</h5>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {enhancementResults.jobAlignment.matchedKeywords?.map((kw, i) => (
                      <span key={i} className="px-2 py-1 bg-green-700/30 rounded text-xs">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="text-red-300 text-sm">Missing Keywords</h5>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {enhancementResults.jobAlignment.missingKeywords?.map((kw, i) => (
                      <span key={i} className="px-2 py-1 bg-red-700/30 rounded text-xs">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
  
          <div className="p-4 bg-gray-700 rounded-lg">
            <h4 className="text-yellow-400 mb-2">Optimization Suggestions</h4>
            <ul className="list-disc pl-4 space-y-2">
              {enhancementResults.suggestions.map((s, i) => (
                <li key={i} className="text-gray-300 text-sm">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );


  


  const renderContent = () => {
    if (loading) return (
      <SkeletonTheme baseColor="#b3b1b1" highlightColor="#444">
        <div className="space-y-4">
          <Skeleton height={40} />
          <Skeleton count={3} />
        </div>
      </SkeletonTheme>
    );

    if (error) return <div className="text-red-500">{error}</div>;

    switch (activeTab) {
      case 'description':
        return (
          <div className=''>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full h-32 p-3 border rounded-lg bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Paste the job description here..."
            />
          </div>
        );
      case 'ats-score':
        return renderAtsScore();
      case 'ai-enhancement':
        return renderEnhancements();
      case 'custom edit':
        return (
          <div >
            <label className="flex items-center cursor-pointer mb-6">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  id="toggle"
                  checked={isToggled}
                  onChange={() => setIsToggled(!isToggled)}
                />
                <div
                  className="toggle__line w-32 h-12 rounded-full shadow-inner flex items-center justify-between px-2"
                  style={{
                    backgroundColor: isToggled ? '#4ade80' : '#9ca3af'
                  }}
                >
                  <span className="text-xs text-white font-bold">OFF</span>
                  <span className="text-xs text-white font-bold">ON</span>
                </div>
                <div
                  className="toggle__dot absolute w-16 h-12 top-0 bg-white rounded-full shadow left-0 flex items-center justify-center text-gray-900 font-bold"
                  style={{
                    transform: isToggled ? 'translateX(64px)' : 'translateX(0)'
                  }}
                >
                  <span>{isToggled ? 'ON' : 'OFF'}</span>
                </div>
              </div>
              <div className="ml-4 text-gray-200 font-medium text-lg">
                {isToggled ? (
                  <p className="text-green-100">Custom edit enabled</p>
                ) : (
                  'Custom edit disabled'
                )}
              </div>
             
            </label>
            {
                !isToggled || <p className='text-green-600 mt-5'>  You can directly edit your resume by clicking and Dowload the Updated Resume. These changes are temporary. </p>
              }


          </div>
        );
      case 'ats-keywords':
        return (
          <div className="space-y-4">
            <button onClick={HandelAtsScore} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded hover:opacity-90">
              ATS Keyword
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-green-400 mb-2">Present Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {atsData.keywords.map((kw, i) => (
                    <span key={i} className="px-2 py-1 bg-green-700/30 rounded text-sm">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-red-400 mb-2">Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {atsData.missing?.map((kw, i) => (
                    <span key={i} className="px-2 py-1 flex bg-red-700/30 rounded text-sm">
                      {kw} <FcPlus
                        onClick={(e) => handelAddSkills(kw)}
                        className=' text-2xl ml-2 shadow-xl hover:scale-110' />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  const handelAddSkills = (kw) => {

    addSkill('technical', kw);
    setAtsData(prev => ({
      ...prev,
      missing: prev.missing.filter(value => value !== kw)
    }));

  };


  return (
    <div className="w-full  p-3 pb-0 animate-fade-in bg-gray-900">
      <div className="rounded shadow-lg p-4 items-center content-center animate-slide-up bg-gray-800">
        <div className="flex items-center justify-between ">
          <div className="flex items-center ml-3 gap-3">
            <FileText className="w-8 h-10 text-[#0ef]" />
            <h2 className="text-xl font-semibold text-white">
              Let's build something amazing
            </h2>
          </div>
          <div className="flex gap-4">
            {['description', 'ats-score', 'custom edit', 'ai-enhancement', 'ats-keywords'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsBoxOpen(true);
                }}
                className={`px-4 py-2 rounded transition-all ${activeTab === tab
                    ? 'bg-blue-600 text-white rounded'
                    : 'text-gray-300 hover:bg-gray-700'
                  }`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {isBoxOpen && (
          <div className="border rounded-lg p-6 mt-4 animate-slide-up border-gray-700 bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                {activeTab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h3>
              <button
                onClick={() => setIsBoxOpen(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {renderContent()}
          </div>
        )}
      </div>
    </div>
  );
}