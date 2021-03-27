import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { extname } from "path";
import { promises } from "fs";
import { yeetGif } from "../../../src/yeetgif";
import { v4 } from "uuid";

const { readFile } = promises;

type FileApiRequest = NextApiRequest & { file: Express.Multer.File };

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
  storage: multer.diskStorage({
    destination: "/tmp",
    filename: (_req, file, cb) =>
      cb(null, `${v4()}${extname(file.originalname)}`),
  }),
  // storage: multer.memoryStorage(),
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
    const outFile = `/tmp/output/${v4()}.gif`;
    console.log({ outFile, file: req.file });
    await yeetGif(req.file.path, outFile, {
      commands: [
        {
          command: "tint",
        },
        {
          command: "hue",
        },
        {
          command: "wobble",
        },
        {
          command: "optimize",
        },
      ],
    });
    res.setHeader("Content-Type", "image/gif");
    // res.setHeader(
    //   "Content-Disposition",
    //   `attachment; filename=${req.file.originalname}`
    // );
    const buffer = await readFile(outFile);
    res.status(200).send(buffer);
  } catch (e) {
    console.error("////////////");
    console.error(e);
    res.status(500).json({ error: "Something happened" });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
