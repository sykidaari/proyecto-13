import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cld';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'movieApp/users',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
  }
});

const upload = multer({ storage });

export default upload;
