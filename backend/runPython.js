const { spawn } = require("child_process");

function runPythonScript(scriptName) {
  return new Promise((resolve, reject) => {
    const process = spawn("python", [scriptName]);
    let output = "";

    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.stderr.on("data", (error) => {
      console.error("Python stderr:", error.toString());
    });

    process.on("close", (code) => {
      if (code !== 0) {
        return reject(`Python process exited with code ${code}`);
      }
      try {
        const result = JSON.parse(output);
        resolve(result);
      } catch (err) {
        reject("Failed to parse Python output as JSON");
      }
    });
  });
}

module.exports = runPythonScript;
