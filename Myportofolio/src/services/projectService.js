import API from './api';

// GET ALL PROJECTS
export const fetchProjects = async () => {
  try {
    const response = await API.get('/projects');
    
    // 🛡️ PRODUCTION CHECK: Handle both wrapped and direct array responses
    const projects = response.data.data || response.data;

    console.log("Service Logic - Extracted Projects:", projects); 
    
    return Array.isArray(projects) ? projects : []; 
  } catch (error) {
    console.error("Error in fetchProjects service:", error.response?.data?.message || error.message);
    throw error; 
  }
};

// CREATE NEW PROJECT
export const createProject = async (projectData) => {
  try {
    // 🛡️ CRITICAL CHANGE 1: 
    // In production, when sending images (files), Axios needs the 'multipart/form-data' header.
    // If projectData is a raw object, we should ideally convert it to FormData in the Dashboard 
    // or here. Let's assume you're passing a FormData object.
    
    const response = await API.post('/projects', projectData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data || response.data;
  } catch (error) {
    // 🛡️ CRITICAL CHANGE 2: Better error logging for debugging API failures
    console.error("Error in createProject service:", error.response?.data?.message || error.message);
    throw error;
  }
};