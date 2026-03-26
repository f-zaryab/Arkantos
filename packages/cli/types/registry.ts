import type { z } from "zod";
import {
  RegistryFileSchema,
  RegistryItemSchema,
} from "../schemas/schema-registry.js";

// export type RegistryFile = {
//   source: string;
//   target: string;
// };

// export type RegistryItem = {
//   id: string;
//   name: string;
//   description: string;
//   category: string;
//   subcategory: string;
//   files: RegistryFile[];
//   dependencies: string[];
//   registryDependencies: string[];
//   tags: string[];
//   keywords: string[];
// };

export type RegistryItem = z.infer<typeof RegistryItemSchema>;
export type RegistryFile = z.infer<typeof RegistryFileSchema>;
