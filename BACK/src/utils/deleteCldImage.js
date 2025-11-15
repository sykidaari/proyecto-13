import cloudinary from '../config/cld';

const deleteCloudinaryImg = (url) => {
  const splitImg = url.split('/');
  const folder = splitImg.at(-2);
  const fileWithExt = splitImg.at(-1);
  const fileName = fileWithExt.split('.')[0];

  const publicId = `eventsPage/${folder}/${fileName}`;

  cloudinary.uploader.destroy(publicId, () => {
    console.log('img deleted in Cloudinary');
  });
};

export default deleteCloudinaryImg;
