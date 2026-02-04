import express from 'express';
import { getProjects, createProject, deleteProject } from '../controllers/projectController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// @route   GET & POST /api/projects
router.route('/')
  .get(getProjects)
  .post(protect, admin, (req, res, next) => {
    // 🛡️ Ensure 'image' here matches the key used in Frontend FormData.append('image', ...)
    upload.single('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  }, createProject);

// @route   DELETE /api/projects/:id
router.route('/:id')
  .delete(protect, admin, deleteProject);

export default router;