const fs = require("fs");

// write to file
const writeToFile = (filePath, data) => {
  try {
    console.log("hello");
    fs.writeFileSync(filePath, data);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { writeToFile };
