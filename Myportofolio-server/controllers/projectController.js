import Project from '../models/Project.js';

// @desc    Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
  }
};

// @desc    Create a project (with AWS S3 Image)
export const createProject = async (req, res) => {
  try {
    // 🛡️ Multer Check: If a file was sent but failed to upload to S3
    // multer-s3 will not attach req.file if it fails.
    if (!req.body || Object.keys(req.body).length === 0) {
       return res.status(400).json({ message: "No form data received. Check Content-Type header." });
    }

    const { title, description, tags, githubUrl, liveUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and Description are required" });
    }

    // 🛡️ PRODUCTION FIX: Handle JSON-stringified tags from Frontend
    // Earlier in Dashboard.jsx, we used JSON.stringify(cleanedTags).
    // We need to parse that back to an array safely.
    let parsedTags = [];
    try {
      if (typeof tags === 'string') {
        // Check if it's a JSON string like '["React", "Node"]'
        if (tags.startsWith('[')) {
          parsedTags = JSON.parse(tags);
        } else {
          // Fallback for comma-separated string
          parsedTags = tags.split(',').map(t => t.trim()).filter(t => t !== "");
        }
      } else if (Array.isArray(tags)) {
        parsedTags = tags;
      }
    } catch (e) {
      parsedTags = [];
    }

    const image = req.file ? req.file.location : ''; 

    const project = new Project({
      title,
      description,
      image, 
      tags: parsedTags,
      githubUrl: githubUrl || '', 
      liveUrl: liveUrl || '',     
      user: req.user._id 
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    console.error("CREATE_PROJECT_ERROR:", error);
    res.status(400).json({ message: "Server failed to process upload" });
  }
};

// @desc    Delete a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // 🛡️ SECURITY CHECK: Ensure only the owner can delete
    // Even if it's just you now, this is a standard interview question!
    if (project.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized to delete this project" });
    }

    await project.deleteOne();
    res.json({ message: 'Project removed from database' });
    
    // NOTE: In a 7+ LPA role, you would also trigger a function 
    // here to delete the image from your AWS S3 bucket too.
  } catch (error) {
    res.status(500).json({ message: "Deletion failed" });
  }
};