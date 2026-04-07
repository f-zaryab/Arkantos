import fs from "node:fs/promises";
import path from "node:path";
import { type RegistryItem } from "../../types/registry.js";
import { RegistryItemSchema } from "../../schemas/schema-registry.js";

const readComponentMeta = async (
  componentFolderPath: string,
): Promise<RegistryItem> => {
  const metaPath = path.resolve(componentFolderPath, "meta.json");

  // Reading file content
  const raw = await fs.readFile(metaPath, {
    encoding: "utf-8",
  });

  // Parsing JSON
  const json = JSON.parse(raw);

  // Validating via schema
  const parsed = RegistryItemSchema.safeParse(json);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => {
        const fieldPath = issue.path.join(".");
        return fieldPath ? `${fieldPath}: ${issue.message}` : issue.message;
      })
      .join("\n");

    throw new Error(`Invalid meta.json at "${metaPath}"\n${issues}`);
  }

  return parsed.data;
};

export default readComponentMeta;
