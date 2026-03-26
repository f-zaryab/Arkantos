import findComponentFolder from "../src/lib/find-component.js";

// Add Command function (main)
const addCommand = async (componentName: string) => {
  const component = await findComponentFolder(componentName);
  console.log("Component-Path >>> ", component);

  return `01: ${componentName}`;
};

export default addCommand;

/* 
1. process.cwd(): console.log("Process (Current-Dir): ", process.cwd());
      ----| Process (Current-Dir):  C:\_Atlantis\MyCodes\WebDev_Spc\Arkantos\packages\cli
2. path.resolve(process.cwd(), "templates"): 
      const templateRoot = path.resolve(process.cwd(), "templates");
      console.log("Template-Path: ", templateRoot);
      ----| Template-Path:  C:\_Atlantis\MyCodes\WebDev_Spc\Arkantos\packages\cli\templates

*/

/* 
  // fs.readdir(templateRootCli, (err, files) => {
  //   if (err) {
  //     console.log("error-in-reading: ", err);
  //   }

  //   console.log("files >>> ", files);

  //   files.forEach((element) => {
  //     console.log("Ele: ", element);
  //   });
  // });

  // const components = fs.readdirSync(templateRootCli, {
  //   withFileTypes: true,
  // });

  // components.forEach((item) => {
  //   console.log("Item: ", item);

  //   if (item.isDirectory()) {
  //     console.log("Component >>> ", item.name);
  //   }
  // });

*/
