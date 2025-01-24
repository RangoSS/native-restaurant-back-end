import bucket from '../config/firebase.js'; // Import the configured Firebase bucket
import { v4 as uuidv4 } from 'uuid'; // To generate unique file names

export const uploadImageToFirebase = async (file) => {
  // Define the folder name and file path
  const folderName = 'restaurant-images';
  const fileName = `${folderName}/${uuidv4()}-${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  return new Promise((resolve, reject) => {
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype, // Set the file's MIME type
      },
    });

    // Handle stream errors
    stream.on('error', (error) => {
      reject(error);
    });

    // Handle stream finish event
    stream.on('finish', async () => {
      try {
        // Make the file publicly accessible
        await fileUpload.makePublic();

        // Resolve with the public URL of the uploaded file
        resolve(`https://storage.googleapis.com/${bucket.name}/${fileName}`);
      } catch (error) {
        reject(error);
      }
    });

    // End the stream with the file buffer
    stream.end(file.buffer);
  });
};
