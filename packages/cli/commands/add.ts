import collectInstallPlan from "../src/lib/collect-install-plan.js";
import resolveComponentTree from "../src/lib/resolve-component-tree.js";

// Add Command function (main)
const addCommand = async (componentName: string) => {
  // const resolvedComponents = await resolveComponentTree(componentName);
  const installPlan = await collectInstallPlan(componentName);

  console.log("\nInstall Plan:\n");

  // for (const component of resolvedComponents) {
  //   console.log(`- ${component.meta.id} (${component.folderPath})`);
  //   console.log({
  //     id: component.meta.id,
  //     deps: component.meta.registryDependencies,
  //     files: component.meta.files,
  //   });
  // }

  for (const item of installPlan) {
    console.log(`Component: ${item.componentId}`);
    console.log(`Source: ${item.sourcePath}`);
    console.log(`Target: ${item.targetPath}`);
    console.log("");
  }

  return `Install plan for "${componentName}" generated successfully.`;

  // return `Resolved "${componentName}" successfully.`;
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
