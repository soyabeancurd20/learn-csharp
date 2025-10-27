const fs = require("fs");
const path = require("path");

function renameSassToScss(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      renameSassToScss(fullPath);
    } else if (path.extname(fullPath) === ".sass") {
      const newPath = fullPath.replace(/\.sass$/, ".scss");
      fs.renameSync(fullPath, newPath);
      console.log(`Renamed: ${file} → ${path.basename(newPath)}`);
    }
  });
}

renameSassToScss("./src");
console.log("✅ Done renaming all .sass files to .scss");
