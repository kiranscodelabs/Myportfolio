import express from 'express';
import { getProjects, createProject, deleteProject } from '../controllers/projectController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js'; // Ensure filename matches (upload vs uploadMiddleware)

const router = express.Router();

// @route   GET & POST /api/projects
router.route('/')
  .get(getProjects)
  .post(protect, admin, (req, res, next) => {
    // 🛡️ Wrapper to catch Multer-specific errors (5MB limit, file type, etc.)
    upload.single('image')(req, res, (err) => {
      if (err) {
        res.status(400);
        return next(new Error(err.message));
      }
      next();
    });
  }, createProject);

// @route   DELETE /api/projects/:id
router.route('/:id')
  .delete(protect, admin, deleteProject);

export default router;