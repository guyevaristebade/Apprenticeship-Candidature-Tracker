import cloudinary from "../config/cloudinary";

export const uploadFileToCloudinary = async (
  file: Express.Multer.File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      { resource_type: "raw" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error.message);
          reject(error);
        } else {
          console.log("Cloudinary upload success:", result?.url);
          resolve(result?.url || "");
        }
      }
    );
  });
};
