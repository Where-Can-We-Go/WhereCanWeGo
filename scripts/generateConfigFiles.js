const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

async function copyTemplate(from, to) {
  try {
    await fsPromises.access(to);
    console.log(`${to} already exists, aborting copy operation.`);
  } catch {
    await fsPromises.copyFile(from, to);
  }
}

async function generateConfigFiles() {
  try {
    // Copy template files to correct location & rename
    // Only copy files if they do not already exist (to prevent overwriting)
    await copyTemplate(
      path.resolve(__dirname, "templates", ".env.local.template"),
      path.resolve(__dirname, "..", ".env.local")
    );
  } catch (e) {
    console.log(e);
    console.log("Template file creation failed!");
  }
}

generateConfigFiles();
