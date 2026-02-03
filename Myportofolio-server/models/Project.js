import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
    maxlength: [50, 'Title cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  image: {
    type: String, // This will store the S3 URL
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  liveUrl: String,
  githubUrl: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
export default Project;