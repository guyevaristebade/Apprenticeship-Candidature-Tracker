import { Router } from "express";
import { authenticated } from "../middlewares";
import { upload, uploadFileToCloudinary } from "../services";
import fs from "fs";
export const CandidacRouter = Router();

CandidacRouter.post(
  "/create",
  authenticated,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const resume = files?.resume?.[0];
      const coverLetter = files?.coverLetter?.[0];

      if (!resume || !coverLetter) {
        return res
          .status(400)
          .json({ success: false, message: "Both files are required." });
      }

      // Téléverser les fichiers sur Cloudinary
      const [resumeUrl, coverLetterUrl] = await Promise.all([
        uploadFileToCloudinary(resume),
        uploadFileToCloudinary(coverLetter),
      ]);

      // Supprimer les fichiers locaux après téléchargement
      fs.unlinkSync(resume.path);
      fs.unlinkSync(coverLetter.path);

      res.status(200).json({
        success: true,
        resumeUrl,
        coverLetterUrl,
      });
    } catch (error) {
      console.error("Error uploading files:", error);

      res.status(500).json({
        success: false,
        message: "An error occurred while uploading files.",
        error: error,
      });
    }
  }
);
