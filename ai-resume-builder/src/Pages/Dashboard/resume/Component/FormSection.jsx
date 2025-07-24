import React, { useState } from 'react';
import PersonalDetail from './Forms/PersonalDetail';
import Summary from './Forms/Summary';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Experience from './Forms/Experience';
import EducationDetail from './Forms/EducationDetail';
import ProjectsSection from './Forms/ProjectDetail';

import { SkillsSection } from './Forms/Skills';
import { AchievementsSection } from './Forms/Achivement';

export default function FormSection() {
  const [count, setCount] = useState(1);

  const handleNext = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const handleBack=()=>{
    setCount((prevCount)=>prevCount -1 );
  }

  const steps = [
    <PersonalDetail />,
    <Summary />,
    <Experience /> ,
    <EducationDetail/>,
    <ProjectsSection/>,
    <SkillsSection/>,
    <AchievementsSection/>
  ];

  return (
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      {steps[count - 1]} 
     
        <div className="flex-1 h-8 w-full relative">
          {count > 1 && (
          <button
            type="button"
            onClick={handleBack}
           className="py-2 absolute px-6 bg-blue-500 rounded left-0 text-white font-semibold flex hover:bg-blue-600"
          >
            <FaArrowLeft className="mr-2 mt-1" />
            Back
          </button>
        )}
         {count < steps.length && (
          <button
            type="button"
            onClick={handleNext}
            className="py-2 absolute px-6 bg-blue-500 rounded right-0 text-white font-semibold flex hover:bg-blue-600"
          >
            Next <FaArrowRight className="ml-2 mt-1" />
            
          </button>
          )}
          {
            (count===steps.length &&(
              <button
              type="button"
           
              className="py-2 absolute px-6 bg-blue-500 rounded right-0 text-white font-semibold flex hover:bg-blue-600"
            >
              Save <FaArrowRight className="ml-2 mt-1" />
              
            </button>
            )

            )
          }
        </div>
      
    </form>
  );
}
