import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { parrotify } from "../../../src/parrotify";

type FileApiRequest = NextApiRequest & { file: Express.Multer.File };

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
  // storage: multer.diskStorage({
  //   destination: "./public/uploads",
  //   filename: (_req, file, cb) => cb(null, file.originalname),
  // }),
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});

const uploadMiddleware = upload.single("theImage");

apiRoute.use(uploadMiddleware);
// Process a POST request
apiRoute.post(async (req: FileApiRequest, res: NextApiResponse) => {
  // console.log(req.file.buffer);
  try {
    const filePath = await parrotify(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );
    console.log({ filePath });
  } catch (e) {
    console.error("////////////");
    console.error(e);
  }
  res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
