import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";
import { useResumeStore } from "../../../../Store/useResumeStore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AichatSession } from "@/Pages/Service/geminiapi";
import { FaSpinner } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { IoSend } from "react-icons/io5";



const generateMonthYearOptions = (startYear = 2000, endYear = new Date().getFullYear()) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const options = [];
  for (let year = startYear; year <= endYear; year++) {
    for (let month of months) {
      options.push({ value: `${month} ${year}`, label: `${month} ${year}` });
    }
  }
  options.push({ value: "Present", label: "Present" });
  return options;
};

export default function Experience() {
  const { experience, addExperience, updateExperience, removeExperience } = useResumeStore();
  const [content, setcontent] = useState({});
  const [aiPrompts, setAiPrompts] = useState({});
  const [AiPromptInput, setAiPromptInput] = useState({});
  const monthYearOptions = generateMonthYearOptions(2000, new Date().getFullYear());

  const handleChange = (index, value) => {
    setcontent((prev) => ({ ...prev, [index]: value }));
    const updatedExperience = [...experience];
    updatedExperience[index] = { ...updatedExperience[index], description: value };
    updateExperience(index, updatedExperience[index]);

  };
  useEffect(() => {
    if (experience.length > 0) {
      setcontent(
        experience.map((exp) =>
          Array.isArray(exp.description) ? exp.description.join("") : exp.description || "<p></p>"
        )
      );
    }
  }, [experience]);



  const handleModifyDescription = async (position, index) => {
    const prompt = aiPrompts[index];
    if (!prompt) return;

    const updatedExperience = [...experience];
    updatedExperience[index] = { ...updatedExperience[index], isLoading: true };
    updateExperience(index, updatedExperience[index]);


    try {
      const result = await AichatSession.sendMessage(`Modify this job description: ${content[index]} based on this prompt: ${prompt} and  Generate 4-5 bullet points for a job experience section for the position of "${position}". 
    Only return a valid JSON array without any additional text. Example output:
    ["Bullet point 1", "Bullet point 2", "Bullet point 3", "Bullet point 4", "Bullet point 5"]`);
      const data = await result.response.text();

      let cleanData = data.replace(/```json|```/g, "").trim();
      if (cleanData.startsWith("[") && cleanData.endsWith("]")) {
        const parsedData = JSON.parse(cleanData);


        updatedExperience[index] = {
          ...updatedExperience[index],
          aiDescriptions: parsedData,
          isLoading: false,
        };
        updateExperience(index, updatedExperience[index]);
        setAiPrompts({});

      } else {
        console.error("Invalid AI response format:", cleanData);
      }
    } catch (error) {
      console.error("Error generating work summary:", error);
      updatedExperience[index] = { ...updatedExperience[index], isLoading: false };
      updateExperience(index, updatedExperience[index]);
    }

  };
  const appendDescriptionToQuill = (index, description) => {
    const currentContent = experience[index]?.description || "";

    const newContent = `${currentContent}<ul><li>${description}</li></ul>`;
    handleChange(index, newContent);
  };

  const GenerateWorkSummary = async (position, index) => {

    const updatedExperience = [...experience];
    updatedExperience[index] = { ...updatedExperience[index], isLoading: true };
    updateExperience(index, updatedExperience[index]);

    const prompt = `You are a resume AI assistant. Generate 4-5 bullet points for a job experience section for the position of "${position}". 
Only return a valid JSON array without any additional text. Example output:
["Bullet point 1", "Bullet point 2", "Bullet point 3", "Bullet point 4", "Bullet point 5"]`;

    try {
      const result = await AichatSession.sendMessage(prompt);
      const data = await result.response.text();

      let cleanData = data.replace(/```json|```/g, "").trim();
      if (cleanData.startsWith("[") && cleanData.endsWith("]")) {
        const parsedData = JSON.parse(cleanData);


        updatedExperience[index] = {
          ...updatedExperience[index],
          aiDescriptions: parsedData,
          isLoading: false,
        };
        updateExperience(index, updatedExperience[index]);
        setAiPromptInput({ [index]: true });
      } else {
        console.error("Invalid AI response format:", cleanData);
      }
    } catch (error) {
      console.error("Error generating work summary:", error);
      updatedExperience[index] = { ...updatedExperience[index], isLoading: false };
      updateExperience(index, updatedExperience[index]);
    }
  };


  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#374151",
      borderColor: "#4B5563",
      borderRadius: "0.5rem",
      padding: "0.25rem",
      color: "white",
      ":hover": {
        borderColor: "#3B82F6",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1F2937",
      borderRadius: "0.5rem",
      color: "#D1D5DB",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#3B82F6" : "#1F2937",
      color: state.isFocused ? "#FFFFFF" : "#D1D5DB",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#FFFFFF",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#9CA3AF",
      ":hover": {
        color: "#3B82F6",
      },
    }),
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white flex items-center mb-4">
        <Briefcase className="w-5 h-5 mr-2 text-blue-400" />
        Work Experience
      </h2>

      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="space-y-4 bg-gray-700/30 p-4 rounded-lg">
            <div className="flex justify-between">
              <h3 className="text-lg text-white">Experience #{index + 1}</h3>
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, { ...exp, company: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Company Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(index, { ...exp, position: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Job Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                <Select
                  options={monthYearOptions}
                  value={monthYearOptions.find((opt) => opt.value === exp.startDate)}
                  onChange={(option) =>
                    updateExperience(index, { ...exp, startDate: option.value })
                  }
                  styles={customStyles}
                  placeholder="Start Date"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                <Select
                  options={monthYearOptions}
                  value={monthYearOptions.find((opt) => opt.value === exp.endDate)}
                  onChange={(option) =>
                    updateExperience(index, { ...exp, endDate: option.value })
                  }
                  styles={customStyles}
                  placeholder="End Date"
                />
              </div>

              <div className="md:col-span-2  w-full">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Work Description</label>
                  <button
                    type="button"
                    onClick={() => GenerateWorkSummary(exp.position, index)}
                    disabled={
                      exp.isLoading ||
                      !exp.company ||
                      !exp.position
                    }
                    className={`mb-2 px-3 py-2 rounded text-white flex items-center ${exp.isLoading || !exp.company || !exp.position
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700"
                      }`}
                  >
                    {exp.isLoading ? (
                      <>
                        <FaSpinner className="h-5 w-5 mr-2 animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" /> Generate Description
                      </>
                    )}
                  </button>


                </div>

                <ReactQuill
                  value={content[index]}

                  onChange={(value) => handleChange(index, value)}
                  theme="snow"
                  className="h-40 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />



              </div>
            </div>
          
            {exp.isLoading ? (
              <SkeletonTheme baseColor="#b3b1b1" highlightColor="#444">
                <p className="w-full">
                  <Skeleton count={4} />
                </p>
              </SkeletonTheme>
            ) : (exp.aiDescriptions?.map((Des, descIndex) => (
              <div
                className="bg-gray-600 relative w-full  mt-1 rounded p-2 flex-col"
                key={`${Des}-${descIndex}`}
              >
                <p className="text-white  text-sm">{Des}</p>
                <button
                  type="button"
                  className="px-3 py-2 bg-blue-500 absolute right-1 top-0 rounded text-white hover:bg-blue-700 transition-colors mt-2"
                  onClick={() => appendDescriptionToQuill(index, Des)}
                >
                  <Plus />
                </button>
              </div>
            )))
            }

            {AiPromptInput[index] && (
              <div className="mt-6">
                <h2 className="text-gray-400 font-semibold mb-2">Modify your Description with AI</h2>
                <div className="flex items-center bg-gray-700 p-2 rounded">
                  <input
                    type="text"
                    value={aiPrompts[index] || ""}
                    onChange={(e) => setAiPrompts((prev) => ({ ...prev, [index]: e.target.value }))}
                    placeholder="Enter your prompt"
                    className="flex-1 px-3 text-white py-2 bg-transparent outline-none border-none"
                  />
                  <button type="button" onClick={() => handleModifyDescription(exp.description, index)} className="ml-2 p-2 hover:bg-gray-600 rounded">
                    <IoSend className="text-white hover:text-gray-200 text-2xl" />
                  </button>
                </div>
              </div>
            )}


          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addExperience}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Experience
      </button>
    </div>
  );
}
