import React, { useState } from 'react';
import { Award, Sparkles } from 'lucide-react';
import { IoSend } from 'react-icons/io5';
import { useResumeStore } from '@/Pages/Store/useResumeStore';
import { AichatSession } from '@/Pages/Service/geminiapi';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Summary = () => {
  const [prompt, setPrompt] = useState('');
  const [Aisummary, setAisummary] = useState([]);
  const[AipromptVisible,setAipromptVisible]=useState(false);
  const { position, level, updateLevel, updatePosition, jobDescription, summary, updateSummary } = useResumeStore();
  const [isPositionFocused, setIsPositionFocused] = useState(false);
  
  const [isExperienceFocused, setIsExperienceFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helper function to extract a JSON array from a string
  const extractJsonArray = (text) => {
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');
    if (start !== -1 && end !== -1 && end > start) {
      return text.slice(start, end + 1);
    }
    throw new Error('No valid JSON array found in the response.');
  };

  const GenerateSummary = async () => {
    setLoading(true);
   
    try {
      const Aiprompt = `
        Generate a JSON array containing 4 different ATS-friendly summaries for the given job title and experience level, and consider job description for better output if it was availbale if it not than based on reast data generate ats friendly summary.
        Each entry should include a 3-4 line description highlighting key responsibilities, skills, and expertise, tailored for ATS optimization.

        Structure:
        [
          { "summary": "<summary>" },
          { "summary": "<summary>" },
          { "summary": "<summary>" },
          { "summary": "<summary>" }
        ]

        Job Title: ${position}
        Experience Level: ${level}
        Job Description: ${jobDescription}
      `;

      const result = await AichatSession.sendMessage(Aiprompt);
      const data = await result.response.text();

      console.log(data);
      const cleanData = data.replace(/```json|```/g, '').trim();

      
      let parsedData;
      try {
        parsedData = JSON.parse(cleanData);
      } catch (jsonError) {
       
        console.warn('Direct JSON.parse failed. Attempting to extract JSON array from the response.');
        const extracted = extractJsonArray(cleanData);
        parsedData = JSON.parse(extracted);
      }

      if (!Array.isArray(parsedData)) {
        console.error('Parsed data is not an array:', parsedData);
        setAisummary([]);
      } else {
        setAisummary(parsedData);
      }
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setAipromptVisible(true);
      setLoading(false);
    }
  };

  const AiPrompt = async () => {
  
    const PromptwithAi = `${prompt} Modify the previous result and return output in the same JSON format: ${JSON.stringify(Aisummary)}`;
    setPrompt('');

    setLoading(true);
    try {
      const result = await AichatSession.sendMessage(PromptwithAi);
      const data = await result.response.text();

      const cleanData = data.replace(/```json|```/g, '').trim();

      let parsedData;
      try {
        parsedData = JSON.parse(cleanData);
      } catch (jsonError) {
        console.warn('Direct JSON.parse failed for AiPrompt. Attempting to extract JSON array from the response.');
        const extracted = extractJsonArray(cleanData);
        parsedData = JSON.parse(extracted);
      }

      if (!Array.isArray(parsedData)) {
        console.error('Parsed data is not an array:', parsedData);
        setAisummary([]);
      } else {
        setAisummary(parsedData);
      }
    } catch (error) {
      console.error('Error sending prompt:', error);
    } finally {
      setLoading(false);
      setAipromptVisible(true);
    }
  };

  const AddSummary = (sum) => updateSummary(sum);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="bg-gray-800/50 relative rounded-xl p-10">
        <h2 className="text-xl font-semibold text-white flex items-center mb-4">
          <Award className="w-5 h-5 mr-2 text-blue-400" />
          Professional Summary
        </h2>
        <textarea
          rows={5}
          value={summary}
          onChange={(e) => updateSummary(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
          placeholder="Write a brief summary of your professional background and key achievements..."
        />
        <div className="mt-2">
          <div className="flex items-center">
            <h2 className="text-white">Enter Position:</h2>
            <input
              className={`text-white px-3 py-4 border-b-2 w-72 outline-none bg-transparent ml-3 ${
                isPositionFocused ? 'border-blue-500' : 'border-gray-600'
              }`}
              placeholder="e.g., Full Stack Developer"
              onChange={(e) => updatePosition(e.target.value)}
              onFocus={() => setIsPositionFocused(true)}
              onBlur={() => setIsPositionFocused(false)}
            />
          </div>
          <div className="flex mt-5 items-center">
            <h2 className="text-white">Select Experience Level:</h2>
            <select
              id="experience"
              className={`px-4 ml-5 py-2 w-72 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 ${
                isExperienceFocused ? 'border-blue-500' : ''
              }`}
              onFocus={() => setIsExperienceFocused(true)}
              onBlur={() => setIsExperienceFocused(false)}
              onChange={(e) => updateLevel(e.target.value)}
            >
              <option value="">Select Experience Level</option>
              <option value="Fresher">Fresher</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Experienced">Experienced</option>
            </select>
          </div>
        </div>
        <button
          type="button"
          onClick={GenerateSummary}
          className="mt-4 px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-700 transition-colors flex items-center"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          AI Suggestion
        </button>

        {loading ? (
          <SkeletonTheme baseColor="#b3b1b1" highlightColor="#444">
            <p>
              <Skeleton count={4} />
            </p>
          </SkeletonTheme>
        ) : (
         
          Array.isArray(Aisummary) &&
          Aisummary.length > 0 &&
          Aisummary.map((item, index) => (
            <div className="bg-gray-600 mt-2 rounded p-3 relative" key={index}>
              <p className="text-white text-sm">{item.summary}</p>
              <button
                type="button"
                onClick={() => AddSummary(item.summary)}
                className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-700 transition-colors mt-2 ml-[520px]"
              >
                ADD
              </button>
            </div>
          ))
        )}
   {AipromptVisible &&
   <div className="mt-6">
   <h2 className="text-gray-400 font-semibold mb-2">Modify your summary with AI</h2>
   <div className="flex items-center bg-gray-700 p-2 rounded">
     <input
       type="text"
       value={prompt}
       onChange={(e) => setPrompt(e.target.value)}
       placeholder="Enter your prompt"
       className="flex-1 px-3 text-white py-2 bg-transparent outline-none border-none"
     />
     <button type="button" onClick={AiPrompt} className="ml-2">
       <IoSend className="text-white hover:text-gray-200 text-4xl" />
     </button>
   </div>
 </div>
 }
        

      </div>
    </form>
  );
};

export default Summary;
