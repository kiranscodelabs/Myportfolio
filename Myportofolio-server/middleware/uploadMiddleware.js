import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '../config/s3Config.js';

// 🛡️ File Filter: Only allow common image formats
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('INVALID_FILE_TYPE: Only images (JPG, PNG, WEBP) are allowed!'), false);
  }
};

const upload = multer({
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 🛡️ 5MB Limit: Prevents huge uploads from slowing your site
  },
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE, // 🚀 CRITICAL: Ensures browser renders image instead of downloading it
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      // Clean filename by removing spaces to prevent broken URLs
      const cleanFileName = file.originalname.replace(/\s+/g, '-').toLowerCase();
      cb(null, `projects/${Date.now()}_${cleanFileName}`);
    },
  }),
});

export default upload;