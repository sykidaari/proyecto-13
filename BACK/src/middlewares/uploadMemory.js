import multer from 'multer';

// regular multer instead of cloudinary-multer-storage, to avoid unwanted uploads to cloudinary. cloudinary-multer-storage uploads before reaching controller, not optimal

const uploadMemory = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];

    if (allowed.includes(file.mimetype)) {
      cb(null, true); // accept file
    } else {
      cb(
        new Error('Invalid file format. Only JPG, PNG and WEBP are allowed.'),
        false
      );
    }
  }
});

export default uploadMemory;
