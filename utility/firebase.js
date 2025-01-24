import bucket from '../config/firebase.js'; // Import the configured Firebase bucket
import { v4 as uuidv4 } from 'uuid'; // To generate unique file names

export const uploadImageToFirebase = async (file) => {
  const fileName = `${uuidv4()}-${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  return new Promise((resolve, reject) => {
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on('error', (error) => {
      reject(error);
    });

    stream.on('finish', async () => {
      // Make the file public
      await fileUpload.makePublic();
      resolve(`https://storage.googleapis.com/${bucket.name}/${fileName}`);
    });

    stream.end(file.buffer);
  });
};
