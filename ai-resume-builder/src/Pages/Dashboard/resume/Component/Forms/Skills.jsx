import React, { useState } from 'react';
import { Wrench, Plus, X } from 'lucide-react';
import { useResumeStore } from '../../../../Store/useResumeStore';

export function SkillsSection() {
  const { skills, addSkill, removeSkill, updateSkillCategory } = useResumeStore();
  const [newSkill, setNewSkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('technical');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill(selectedCategory, newSkill.trim());
      setNewSkill('');
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white flex items-center mb-4">
        <Wrench className="w-5 h-5 mr-2 text-blue-400" />
        Skills
      </h2>

      <div className="space-y-6">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-white capitalize">{category} Skills</h3>
              <button
                onClick={() => updateSkillCategory(category, '')}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Edit Category
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skillList.map((skill, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-gray-700/50 text-white rounded-full flex items-center"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(category, index)}
                    className="ml-2 text-gray-400 hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="space-y-3">
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="technical">Technical</option>
              <option value="soft">Soft</option>
             
            </select>

            <div className="flex-1 relative">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(e)}
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Add a new skill"
              />
              <button
              type='button'
                onClick={handleAddSkill}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}