import React from 'react';
import { Trophy, Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '@/Pages/Store/useResumeStore';
import Select from 'react-select';

const generateMonthYearOptions = (startYear = 2000, endYear = new Date().getFullYear()) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const options = [];
  for (let year = startYear; year <= endYear; year++) {
    for (let month of months) {
      options.push({ value: `${month} ${year}`, label: `${month} ${year}` });
    }
  }
  
  return options;
};
const monthYearOptions = generateMonthYearOptions(2000, new Date().getFullYear());
export function AchievementsSection() {
  const { certifications, addCertification, updateCertification, removeCertification } = useResumeStore();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#374151',
      borderColor: '#4B5563',
      borderRadius: '0.5rem',
      padding: '0.25rem',
      color: 'white',
      ':hover': {
        borderColor: '#3B82F6',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1F2937',
      borderRadius: '0.5rem',
      color: '#D1D5DB',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#3B82F6' : '#1F2937',
      color: state.isFocused ? '#FFFFFF' : '#D1D5DB',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#FFFFFF',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9CA3AF',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#9CA3AF',
      ':hover': {
        color: '#3B82F6',
      },
    }),
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white flex items-center mb-4">
        <Trophy className="w-5 h-5 mr-2 text-blue-400" />
        Key Achievements & Certification
      </h2>

      <div className="space-y-6">
  {certifications?.map((cert, index) => (
    <div key={index} className="space-y-4 bg-gray-700/30 p-4 rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-lg text-white">Certification #{index + 1}</h3>
        <button
          onClick={() => removeCertification(index)}
          className="text-red-400 hover:text-red-300"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-4">
        {/* Certification fields */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
          <input
            type="text"
            value={cert.name}
            onChange={(e) => updateCertification(index, { ...cert, name: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="e.g., AWS Certified Solutions Architect"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1"> <span className='text-[#0ef] mr-2'>Optional</span>Description </label>
          <textarea
            value={cert.description}
            onChange={(e) => updateCertification(index, { ...cert, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
            placeholder="Describe your certification"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
          <Select
           
            value={monthYearOptions.find((option)=>option.value===cert.date)}
            onChange={(e) => updateCertification(index, { ...cert, date: e.value })}
            styles={customStyles}
            placeholder="compilation Date"
            options={monthYearOptions}
          />
        </div>
      </div>
    </div>
  ))}
</div>


      <button
        type="button"
        onClick={() => addCertification()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Achievement
      </button>
    </div>
  );
}
