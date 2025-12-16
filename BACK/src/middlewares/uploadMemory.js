import multer from 'multer';

// regular multer instead of cloudinary-multer-storage, to avoid unwanted uploads to cloudinary. cloudinary-multer-storage uploads before reaching controller, not optimal

const uploadMemory = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

export default uploadMemory;
