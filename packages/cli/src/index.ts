#!/usr/bin/env node

import { Command } from "commander";
import kleur from "kleur";
import addCommand from "../commands/add.js";

const program = new Command();

program
  .name("Arkantos")
  .description(
    "A CLI utiltiy to install optimized react components in to React/Nextjs library",
  )
  .version("1.0.0");

program.action(() => {
  console.log(kleur.bgYellow("Welcome to CLI"));
});

program
  .command("init")
  .description("Initialize Arkantos in the current project")
  .action(() => {
    console.log(kleur.cyan("npm init"));
  });

program
  .command("add <component>")
  .description("Add a component to the current project")
  .action(async (component: string) => {
    try {
      const compName = await addCommand(component);
      console.log(kleur.green(compName));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error occurred.";
      console.error(kleur.red("Error: ") + kleur.yellow(message));
      process.exit(1);
    }
  });

program.parse();
