import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    if (file.originalname.includes(" ")) {
      cb(null, file.originalname.split(" ").join("_"));
    }
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
