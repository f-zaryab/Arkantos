import path from "node:path";
import fs from "node:fs/promises";
import type { InstallPlan } from "./collect-install-plan.js";

const copyComponentFiles = async (installPlan: InstallPlan): Promise<void> => {
  for (const item of installPlan) {
    const targetDir = path.dirname(item.targetPath);

    await fs.mkdir(targetDir, {
      recursive: true,
    });

    await fs.copyFile(item.sourcePath, item.targetPath);
  }
};

export default copyComponentFiles;
