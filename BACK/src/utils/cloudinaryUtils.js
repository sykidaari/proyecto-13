import cloudinary from '../config/cloudinary.js';
import ERR from '../constants/domain/errorCodes.js';

export const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) reject(err);
        else resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
};

export const deleteFromCloudinary = async (url) => {
  const parts = url.split('/');
  const folder = parts.at(-2);
  const file = parts.at(-1).split('.')[0];
  const publicId = `movieApp/${folder}/${file}`;

  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== 'ok')
      throw new Error(ERR.system.cloudinaryDeleteFailed);
  } catch (err) {
    throw err;
  }
};
