import Resume from "../Models/ResumeSchema.js";

// Create a new resume
export const createResume = async (req, res) => {
    try {
      
      const { resumeData } = req.body;
      console.log("Received request body:", req.body);

  
      if (!resumeData) {
        return res.status(400).json({ message: "Resume data is required" });
      }
  
      
      if (!req.id) {
        return res.status(400).json({ message: "User ID is required for this operation" });
      }
  
      const newResume = new Resume({
        userId: req.id, 
        resumeData,
      });
  
      const savedResume = await newResume.save();
      res.status(201).json({ message: "Resume created successfully", resume: savedResume });
    } catch (error) {
      console.error("Error creating resume:", error);
      res.status(500).json({ message: "Failed to create resume", error });
    }
  };
  

// Get all resumes for a user
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.id });
    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ message: "Failed to fetch resumes", error });
  }
};

// Get a single resume by ID
export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findOne({ _id: id, userId: req.id });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({ message: "Failed to fetch resume", error });
  }
};

// Update a resume by ID
export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;
    const { resumeData } = req.body;

    if (!resumeData) {
      return res.status(400).json({ message: "Resume data is required" });
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: id, userId: req.id },
      { resumeData },
      { new: true } 
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ message: "Resume updated successfully", resume: updatedResume });
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ message: "Failed to update resume", error });
  }
};

// Delete a resume by ID
export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedResume = await Resume.findOneAndDelete({ _id: id, userId: req.id });

    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ message: "Failed to delete resume", error });
  }
};
