import { GridFSBucket } from 'mongodb';  // Importing GridFSBucket from MongoDB

let gfs; // This will hold the GridFSBucket instance

// Initialize GridFS bucket when the MongoDB connection is opened
const initGridFSBucket = (conn) => {
  // Check if connection exists before initializing
  if (!gfs) {
    gfs = new GridFSBucket(conn.db, { bucketName: 'uploads' });
    console.log('GridFS bucket initialized');
  } else {
    console.log('GridFS bucket already initialized');
  }
  return gfs; // Return the bucket instance
};

// Get the current instance of the GridFS bucket
const getGridFSBucket = () => {
  if (!gfs) {
    throw new Error('GridFS bucket is not initialized. Call initGridFSBucket first.');
  }
  return gfs;
};

export { initGridFSBucket, getGridFSBucket };
