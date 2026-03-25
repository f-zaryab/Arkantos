// NO LONGER IN USE: FOR DEBUGGING PURPOSE

// #!/usr/bin/env node

console.log("Arkantos CLI running...");

const args = process.argv.slice(2);

// console.log("args: ", process.argv)

if (args[0] === "init") {
  console.log("👉 npm init");
}

if (args[0] === "add") {
  console.log("👉 npm install <package>");
}
