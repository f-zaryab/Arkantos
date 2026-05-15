import type { InstallPlan } from "./collect-install-plan.js";
import { fileExists } from "./utils.js";

export type FileConflict = {
  componentId: string;
  targetPath: string;
};

export type ConflictCheckResult = {
  hasConflicts: boolean;
  conflicts: FileConflict[];
};

const checkFileConflicts = async (
  installPlans: InstallPlan,
): Promise<ConflictCheckResult> => {
  const conflicts: FileConflict[] = [];

  for (const item of installPlans) {
    const exists = await fileExists(item.targetPath);

    if (exists) {
      conflicts.push({
        componentId: item.componentId,
        targetPath: item.targetPath,
      });
    }
  }

  return {
    hasConflicts: conflicts.length > 0,
    conflicts,
  };
};

export default checkFileConflicts;
