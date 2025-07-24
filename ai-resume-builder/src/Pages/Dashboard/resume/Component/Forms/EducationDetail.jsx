import React from 'react';
import { GraduationCap, Plus, Sparkles, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../../../Store/useResumeStore';
import Select from "react-select";
export default function EducationDetail() {
  const { education, addEducation, updateEducation, removeEducation } = useResumeStore();
  
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
  const monthYearOptions = generateMonthYearOptions(2000, new Date().getFullYear());
  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white flex items-center mb-4">
        <GraduationCap className="w-5 h-5 mr-2 text-blue-400" />
        Education
      </h2>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="space-y-4 bg-gray-700/30 p-4 rounded-lg">
            <div className="flex justify-between">
              <h3 className="text-lg text-white">Education #{index + 1}</h3>
              <button
                onClick={() => removeEducation(index)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  School/University
                </label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateEducation(index, { ...edu, school: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="University Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Degree
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, { ...edu, degree: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Bachelor's, Master's, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => updateEducation(index, { ...edu, field: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Graduation Date
                </label>
                <Select
                  options={monthYearOptions}
                  
                  value={monthYearOptions.find((date)=>date.value== edu?.graduationDate) }
                  onChange={(e) => updateEducation(index, { ...edu, graduationDate:e.value })}
                  styles={customStyles}
                  placeholder="Start Date"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                <span> Optional</span> <br/>
                  Achievements/Activities 
                </label>
                <textarea
                  value={edu.achievements}
                  onChange={(e) => updateEducation(index, { ...edu, achievements: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="List relevant achievements, activities, or honors"
                />
              </div>
            </div>
           
          </div>
        ))}
         
      </div>

      <button
        type="button"
        onClick={() => addEducation()}
        className="mt-4 ml-[450px] right-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Education
      </button>
    </div>
  );
}