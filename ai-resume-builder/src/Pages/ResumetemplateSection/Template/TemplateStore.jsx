import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { TemplateSection } from '../TemplateSection';
import { CiSearch } from 'react-icons/ci';

const TemplateStore = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [filteredTemplates, setFilteredTemplates] = useState([]);

  const templates = [
    { id: '1', name: 'Modern Professional', description: 'Clean and contemporary design with a focus on readability', category: 'Experience', preview: '/TemplateImage/template1.png' },
    { id: '2', name: 'Creative Portfolio', description: 'Stand out with a unique layout perfect for creative roles', category: 'Experience', preview: '/TemplateImage/template2.png' },
    { id: '3', name: 'Executive Suite', description: 'Professional template ideal for senior positions', category: 'Experience', preview: '/TemplateImage/template3.png' },
    { id: '4', name: 'Minimal Classic', description: 'Traditional layout with a modern minimal twist', category: 'Experience', preview: '/TemplateImage/template4.png' },
    { id: '5', name: 'Corporate Elite', description: 'A refined template for experienced professionals', category: 'Experience', preview: '/TemplateImage/template5.png' },
    { id: '6', name: 'Startup Founder', description: 'Sleek and modern for business leaders', category: 'Experience', preview: '/TemplateImage/template6.png' },
    {id: '7', name: 'Startup Founder', description: 'Sleek and modern for business leaders', category: 'Experience', preview: '/TemplateImage/template7.png'},
    {id: '8', name: 'Startup Founder', description: 'Sleek and modern for business leaders', category: 'Fresher', preview: '/TemplateImage/template6.png'},
  ];

  useEffect(() => {
    const filtered = templates.filter((item) =>
      (category === 'All' || item.category === category) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTemplates(filtered);
  }, [search, category]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800/50 bg-opacity-90 z-50 flex justify-center items-center">
          <div className="bg-gray-800 w-[95vw] h-[99vh] absolute top-10 rounded-lg shadow-lg flex flex-col">
            
            {/* Header & Filters */}
            <div className="p-5 flex justify-between items-center bg-gray-800/50 pt-10 sticky top-0 z-10">
              <h2 className="text-[1.5rem] text-white">Select Resume</h2>
              
              {/* Search Bar */}
              <div className="flex items-center bg-gray-700/50 rounded px-3 py-2 w-1/3">
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-white outline-none bg-transparent"
                  placeholder="Search here..."
                />
                <CiSearch className="text-white  text-2xl" />
              </div>

            
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-700/50 px-3 py-2 rounded outline-none text-white"
              >
                <option value="All">All</option>
                <option value="Fresher">Fresher</option>
                <option value="Experience">Experience</option>
              </select>

             
              <button onClick={onClose}>
                <X className="h-7 w-7 text-white" />
              </button>
            </div>

           
            <div className="flex-1 overflow-y-auto p-5 "   
            >
              <h1 className="text-white text-lg">Top Rated Resume</h1>
              <hr className="my-3" />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
                
                className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template) => (
                    <TemplateSection key={template.id} {...template} />
                  ))
                ) : (
                  <p className="text-white text-center col-span-3">No templates found.</p>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TemplateStore;
