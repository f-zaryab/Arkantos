import path from "node:path";

const addCommand = (componentName: string) => {
  console.log("process: ", process.cwd());

  const templateRoot = path.resolve(process.cwd(), "templates");
  console.log("Template-Path: ", templateRoot);

  return `01: ${componentName}`;
};

export default addCommand;
