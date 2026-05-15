import checkFileConflicts from "../src/lib/check-file-conflicts.js";
import collectInstallPlan from "../src/lib/collect-install-plan.js";
import confirmOverwrite from "../src/lib/confirm-overwrite.js";
import copyComponentFiles from "../src/lib/copy-component-files.js";

// Add Command function (main)
const addCommand = async (componentName: string) => {
  const installPlan = await collectInstallPlan(componentName);

  // Check conflict results
  const conflictResult = await checkFileConflicts(installPlan);

  // Check whether can continue based on conflicts and users input
  const canContinue = await confirmOverwrite(conflictResult);

  if (!canContinue) {
    return `Installation cancelled. No files were changed.`;
  }

  // All checks passed, copy files
  await copyComponentFiles(installPlan);

  return `Component "${componentName}" installed successfully.`;
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
