import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";
import { yeetGif } from "../../src/yeetgif";

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});

apiRoute.get((_req: NextApiRequest, res: NextApiResponse) => {
  yeetGif(
    "/Users/fforres/github/parrotify-as-a-service/src/images/guillermo.png",
    `/Users/fforres/github/parrotify-as-a-service/src/images/output/${v4()}.gif`,
    {
      commands: [
        {
          command: "erase",
        },
        {
          command: "tint",
        },
        {
          command: "hue",
        },
        {
          command: "wobble",
        },
      ],
    }
  );

  res.status(200).json({ data: "alive ❤️" });
});

export default apiRoute;
