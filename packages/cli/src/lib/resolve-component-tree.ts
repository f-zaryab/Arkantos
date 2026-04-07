import type { RegistryItem } from "../../types/registry.js";
import findComponentFolder from "./find-component.js";
import readComponentMeta from "./read-component-meta.js";

export type ResolvedComponent = {
  folderPath: string;
  meta: RegistryItem;
};

const resolveComponentTree = async (
  componentId: string,
  seen = new Set<string>(),
  resolved: ResolvedComponent[] = [],
): Promise<ResolvedComponent[]> => {
  if (seen.has(componentId)) {
    return resolved;
  }

  const folderPath = await findComponentFolder(componentId);

  if (!folderPath) {
    throw new Error(
      `Component "${componentId}" was not found in the templates.`,
    );
  }

  seen.add(componentId);

  const meta = await readComponentMeta(folderPath);

  for (const dependencyId of meta.registryDependencies) {
    await resolveComponentTree(dependencyId, seen, resolved);
  }

  resolved.push({
    folderPath,
    meta,
  });

  return resolved;
};

export default resolveComponentTree;
