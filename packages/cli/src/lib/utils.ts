import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";

// Getting folder name of dist file
export const gettingCliDistFolder = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return __dirname;
};

// Getting templates root folder
export const getTemplatesRoot = (__dirname: string) => {
  return path.resolve(__dirname, "../templates");
};

// Checking Files to be copied already exists or not
export const fileExists = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
};
