import { create } from 'zustand';
import { persist} from 'zustand/middleware';

export const useResumeStore = create(
  persist(
    (set, get) => {
      const addDummyData = () => ({
        personalInfo: {
          name: 'John Doe',
          profileImageUrl: '',
          email: 'johndoe@example.com',
          phone: '123-456-7890',
          location: 'San Francisco, CA',
          linkedin: { 
            text: 'linkedin.com/in/john-doe',
            link: 'linkedin.com/in/john-doe'      
          },
          portfolio: { 
            text: 'https://johndoe.com',
            link: 'https://johndoe.com'      
          },
          GithubUrl: { 
            text: 'www.github.com/sumit-singh',
            link: 'www.github.com/sumit-singh'      
          },
        },
        Resumetitle: 'Full stack',
        experiencelevel: false,
        position: 'Full stack developer',
        level: "fresher",
        ResumeTemplateId: '1',
        summary: 'Passionate software developer with experience in building scalable web applications and a strong background in full-stack development.',
        experience: [
          {
            company: 'TechCorp',
            position: 'Software Engineer',   
            startDate: 'Jan 2021',
            endDate: 'Present',
            description: 'Developed and maintained full-stack web applications, collaborated with cross-functional teams to implement new features.',
          },
          {
            company: 'Innovatech',
            position: 'Intern',
            startDate: 'Jun 2020',
            endDate: 'Dec 2020',
            description: [
              'Assisted in developing web applications and performed code reviews to improve code quality.',
            ]
          },
        ],
        education: [
          {
            school: 'University of Technology',
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            graduationDate: 'May 2020',
            achievements: 'Graduated with honors, Dean’s List recipient.',
          },
        ],
        projects: [
          {
            title: 'AI Resume Builder',
            description: 'A web app for generating resumes using AI.',
            technologies: ['React', 'Node.js', 'Zustand'],
            link: 'https://github.com/example/ai-resume-builder',
          },
          {
            title: 'Portfolio Website',
            description: 'Personal portfolio showcasing my projects and skills.',
            technologies: ['Next.js', 'Tailwind CSS'],
            link: 'https://johndoe.com',
          },
        ],
        certifications: [
          {
            name: 'Certified JavaScript Developer',
            description: 'TechCertify',
            date: 'Mar 2023',
          },
          {
            name: 'AWS Certified Solutions Architect',
            description: 'Amazon Web Services',
            date: 'Jun 2022',
          },
        ],
        skills: {
          technical: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
          soft: ['Communication', 'Teamwork', 'Problem-Solving'],
        },
      });

      return {
        ...addDummyData(),
        isToggled: false,
        
        // Actions
        setIsToggled: (value) => set({ isToggled: value }),
        addDummyData: () => set(addDummyData),
        setResumeData: (newResumeData) => set(() => newResumeData),
        updatePersonalInfo: (info) => set((state) => ({
          personalInfo: { ...state.personalInfo, ...info },
        })),
        updateResumeTemplateID: (ResumeTemplateId) => set({ ResumeTemplateId }),
        updateLevel: (level) => set({ level }),
        updateExperiencelevel: (experiencelevel) => set({ experiencelevel }),
        updateSummary: (summary) => set({ summary }),
        updatePosition: (position) => set({ position }),
        updateTitle: (Resumetitle) => set({ Resumetitle }),

        // Experience actions
        addExperience: () => set((state) => ({
          experience: [
            ...state.experience,
            { company: '', position: '', startDate: '', endDate: '', description: '' },
          ],
        })),
        updateExperience: (index, experience) => set((state) => ({
          experience: state.experience.map((e, i) => i === index ? { ...e, ...experience } : e),
        })),
        removeExperience: (index) => set((state) => ({
          experience: state.experience.filter((_, i) => i !== index),
        })),

        // Education actions
        addEducation: () => set((state) => ({
          education: [
            ...state.education,
            { school: '', degree: '', field: '', graduationDate: '', achievements: '' },
          ],
        })),
        updateEducation: (index, education) => set((state) => ({
          education: state.education.map((e, i) => i === index ? { ...e, ...education } : e),
        })),
        removeEducation: (index) => set((state) => ({
          education: state.education.filter((_, i) => i !== index),
        })),

        // Project actions
        addProject: () => set((state) => ({
          projects: [
            ...state.projects,
            { title: '', description: '', technologies: [], link: '' },
          ],
        })),
        updateProject: (index, project) => set((state) => ({
          projects: state.projects.map((p, i) => i === index ? { ...p, ...project } : p),
        })),
        removeProject: (index) => set((state) => ({
          projects: state.projects.filter((_, i) => i !== index),
        })),

        // Certification actions
        addCertification: () => set((state) => ({
          certifications: [
            ...state.certifications,
            { name: '', description: '', date: '' },
          ],
        })),
        updateCertification: (index, certification) => set((state) => ({
          certifications: state.certifications.map((c, i) => i === index ? { ...c, ...certification } : c),
        })),
        removeCertification: (index) => set((state) => ({
          certifications: state.certifications.filter((_, i) => i !== index),
        })),

        // Skill actions
        addSkill: (category, skill) => set((state) => ({
          skills: {
            ...state.skills,
            [category]: [...state.skills[category], skill],
          },
        })),
        removeSkill: (category, index) => set((state) => ({
          skills: {
            ...state.skills,
            [category]: state.skills[category].filter((_, i) => i !== index),
          },
        })),

        // Reset state
        resetState: () => set(() => ({
          personalInfo: {
            name: '',
            email: '',
            phone: '',
            location: '',
            linkedin: { text: '', link: '' },
            portfolio: { text: '', link: '' },
            GithubUrl: { text: '', link: '' },
          },
          summary: '',
          Resumetitle: '',
          experience: [],
          education: [],
          projects: [],
          certifications: [],
          jobDescription: '',
          AtsScore: '',
          AtsKeyword: [],
          skills: {
            technical: [],
            soft: []
          },
        })),
      };
    },
    {
      name: 'resume-storage',
      getStorage: () => localStorage,
    }
  )
);