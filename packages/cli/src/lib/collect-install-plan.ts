import path from "node:path";
import resolveComponentTree from "./resolve-component-tree.js";

export type InstallPlanItem = {
  componentId: string;
  sourcePath: string;
  targetPath: string;
};

export type InstallPlan = InstallPlanItem[];

const collectInstallPlan = async (
  componentId: string,
  targetRoot: string = process.cwd(),
): Promise<InstallPlan> => {
  const resolvedComponents = await resolveComponentTree(componentId);

  const installPlan: InstallPlan = [];

  for (const component of resolvedComponents) {
    const { folderPath, meta } = component;

    for (const file of meta.files) {
      const sourcePath = path.resolve(folderPath, file.source);
      const targetPath = path.resolve(folderPath, file.target);

      installPlan.push({
        componentId: meta.id,
        sourcePath,
        targetPath,
      });
    }
  }

  return installPlan;
};

export default collectInstallPlan;

/* 
PURPOSE:

resolved components
   ↓
convert each meta.files entry
   ↓
sourcePath + targetPath
   ↓
return install plan
*/
