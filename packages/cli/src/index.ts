#!/usr/bin/env node

import { Command } from "commander";
import kleur from "kleur";

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
  .action((component: string) => {
    console.log(kleur.green(`npm add ${component}`));
  });

program.parse();
