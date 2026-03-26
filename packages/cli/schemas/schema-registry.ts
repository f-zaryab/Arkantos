import { z } from "zod";

export const RegistryFileSchema = z.object({
  source: z.string().min(1, "File source is required"),
  target: z.string().min(1, "File target is required"),
});

export const RegistryItemSchema = z.object({
  id: z.string().min(1, "Component id is required"),
  name: z.string().min(1, "Component name is required"),
  description: z.string().min(1, "Component description is required"),
  category: z.string().min(1, "Component category is required"),
  subcategory: z.string().min(1, "Component subcategory is required"),
  files: z.array(RegistryFileSchema).min(1, "At least one file is required"),
  dependencies: z.array(z.string()).default([]),
  registryDependencies: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
});
