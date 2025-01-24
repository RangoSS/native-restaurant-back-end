import multer from 'multer';
// Set up multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Save file in memory buffer for Firebase
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
});
export default upload;
