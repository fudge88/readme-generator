const fs = require("fs");

// write to file
const writeToFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, data);
    console.log("SUCCESS");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { writeToFile };
