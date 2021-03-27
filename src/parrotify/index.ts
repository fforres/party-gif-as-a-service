import fs from "fs";
// import sharp from "sharp";
import path from "path";
import PartyPartyParty from "party-party-party";
import { v4 } from "uuid";
import Jimp from "jimp";
const { mkdir } = fs.promises;

const createRandomFilePath = (extension: string = "") => {
  const tempFileName = v4();
  const filePath = path.resolve(`/tmp`, `${tempFileName}${extension}`);
  return filePath;
};

const getBufferFromStream = (stream: fs.WriteStream): Promise<Buffer> => {
  if (!stream) {
    throw "FILE_STREAM_EMPTY";
  }
  return new Promise((resolve, reject) => {
    let buffer = Buffer.from([]);
    stream.on("data", (buf) => {
      buffer = Buffer.concat([buffer, buf]);
    });
    stream.on("end", () => resolve(buffer));
    stream.on("error", reject);
  });
};

const makeParty = () =>
  new Promise<string>((resolve, reject) => {
    const tempFileName = createRandomFilePath();
    const outputFileStream = fs.createWriteStream(tempFileName);
    outputFileStream.on("finish", () => resolve(tempFileName));
    outputFileStream.on("error", reject);
    PartyPartyParty(tempFileName, outputFileStream, 10);
  });

// const resize = async (fileBuffer: Buffer) => {};

export const parrotify = async (
  fileBuffer: Buffer,
  originalname: string,
  mime: string
) => {
  const { name, ext } = path.parse(originalname);
  const sharpFilePath = createRandomFilePath(ext);
  const image = await Jimp.read(fileBuffer);
  const resizedImage = await image.resize(128, 128);
  const buffer = await resizedImage.getBufferAsync(mime);
  await fs.promises.writeFile(sharpFilePath, buffer);
  const partyGifPath = await makeParty();
};

// start().catch((e) => console.error(e));
// const outputFileStream = fs.createWriteStream("my-output-file.gif");
// PartyPartyParty("my-input.png", outputFileStream, 10);
