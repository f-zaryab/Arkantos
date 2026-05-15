import { confirm } from "@inquirer/prompts";
import type { ConflictCheckResult } from "./check-file-conflicts.js";

const confirmOverwrite = async (
  conflictResult: ConflictCheckResult,
): Promise<boolean> => {
  if (!conflictResult.hasConflicts) {
    return true;
  }

  console.log("\nExisting files found:\n");

  for (const conflict of conflictResult.conflicts) {
    console.log(`- ${conflict.targetPath}`);
  }

  const shouldOverwrite = await confirm({
    message: `\nSome files already exist. Do you want to overwrite them?`,
    default: false,
  });

  return shouldOverwrite;
};

export default confirmOverwrite;
