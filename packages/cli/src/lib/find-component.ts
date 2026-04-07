/* 
META-DRIVEN LOOKUP
1. Find every meta.json
2. Read it
3. Match meta.id === componentId

DETAILS
1. Locate path of template folder
2. Use that path to extract folder name
3. Go inside folder, extract path
4. Again use that path to extract folder name
*/

import fs from "node:fs/promises";
import path from "node:path";
import { json, z } from "zod";
import { getTemplatesRoot, gettingCliDistFolder } from "./utils.js";

const RegistryLookupSchema = z.object({
  id: z.string(),
});

const findComponentFolder = async (
  componentId: string,
): Promise<string | null> => {
  const distFolder = gettingCliDistFolder();
  const templatesRoot = getTemplatesRoot(distFolder);

  // Extract folders names of Categories from template-folder path
  const categories = await fs.readdir(templatesRoot, {
    withFileTypes: true,
  });

  // Loop through every folder to extract name of Categories
  for (const cat of categories) {
    if (!cat.isDirectory()) continue;

    // Find path of different categories in template folder
    const categoryPath = path.join(templatesRoot, cat.name);

    // Use that path to find folder (Dirent) names of sub-categories
    const subCategoryFolderNames = await fs.readdir(categoryPath, {
      withFileTypes: true,
    });

    // Loop through every folder to extract name of sub-category
    for (const subCat of subCategoryFolderNames) {
      if (!subCat.isDirectory()) continue;

      // Find path of different sub-categories in categories folder
      const subcategoryPath = path.join(categoryPath, subCat.name);

      // Use that path to find folder (Dirent) names of components in sub-categories
      const componentsFolderNames = await fs.readdir(subcategoryPath, {
        withFileTypes: true,
      });

      // Loop through every component folder to extract component names inside sub-categories
      for (const component of componentsFolderNames) {
        if (!component.isDirectory()) continue;

        // Find path of different components in sub-categories folder
        const componentFolderPath = path.join(subcategoryPath, component.name);

        // Path of meta.json of different components in sub-categories folder (!needed to get here)
        const metaFileComponentPath = path.join(
          componentFolderPath,
          "meta.json",
        );

        try {
          // Find name of different components in sub-categories folder
          const metaRaw = await fs.readFile(metaFileComponentPath, "utf-8");

          // Parsing json of meta.json
          const json = JSON.parse(metaRaw);

          // Validating with Zod
          const parsed = RegistryLookupSchema.safeParse(json);

          if (!parsed.success) continue;

          // Comparing meta.id with component name passed
          if (parsed.data.id === componentId) {
            return componentFolderPath;
          }
        } catch {
          // meta.json does not exist or is invalid JSON
          continue;
        }
      }
    }
  }

  return null;
};

export default findComponentFolder;
