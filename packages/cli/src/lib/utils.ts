import path from "node:path";
import { fileURLToPath } from "node:url";

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
