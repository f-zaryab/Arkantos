import resolveComponentTree from "../src/lib/resolve-component-tree.js";

// Add Command function (main)
const addCommand = async (componentName: string) => {
  const resolvedComponents = await resolveComponentTree(componentName);

  console.log("\nInstall order:\n");

  for (const component of resolvedComponents) {
    console.log(`- ${component.meta.id} (${component.folderPath})`);
    console.log({
      id: component.meta.id,
      deps: component.meta.registryDependencies,
      files: component.meta.files,
    });
  }

  return `Resolved "${componentName}" successfully.`;
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
  addCommand() calls resolveComponentTree()
      resolveComponentTree() calls:
          findComponentFolder()
          readComponentMeta()
              readComponentMeta() validates against Zod
*/
