import execa from "execa";
import os from "os";
import { promises } from "fs";
import rmfr from "rmfr";
import { join, dirname } from "path";
import getConfig from "next/config";
import { YeetGifSettings } from "./types";

const { mkdir } = promises;
const { serverRuntimeConfig } = getConfig();

const isMac = (platform: string) => platform === "darwin";

const isLinux = (platform: string) => platform === "linux";

const getExecutable = () => {
  const platform = os.platform();
  if (isMac(platform)) {
    return join(serverRuntimeConfig.PROJECT_ROOT, "./src/yeetgif/gif_osx");
  }
  if (isLinux(platform)) {
    return join(serverRuntimeConfig.PROJECT_ROOT, "./src/yeetgif/gif_linux");
  }
  throw new Error(`Unsupported OS ${platform}`);
};

export const yeetGif = async (
  inputPath: string,
  outputPath: string,
  settings: YeetGifSettings
) => {
  if (!inputPath) {
    throw new Error("No input path defined for yeetGif");
  }
  if (!outputPath) {
    throw new Error("No output path defined for yeetGif");
  }
  if (!settings.commands.length) {
    throw new Error("No commands passed to yeetGif");
  }

  const yeetGifArguments: string[] = [];
  settings.commands.forEach(({ command, options = {} }) => {
    const commandOptions = Object.entries(
      options as { [key: string]: string }
    ).map(([key, value]) => `--${key} ${value}`);
    yeetGifArguments.push(
      [getExecutable(), `--quiet`, command, ...commandOptions].join(" ")
    );
  });

  try {
    await mkdir(dirname(outputPath), { recursive: true });
    await rmfr(outputPath);
    await execa(
      `<${inputPath}`,
      [yeetGifArguments.join(" | "), `>${outputPath}`],
      {
        shell: true,
      }
    );
  } catch (error) {
    console.error("/////  errror  /////");
    console.error(error);
    error.message = error.stderr || error.message;
    throw error;
  }
};
