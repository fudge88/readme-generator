// import inquirer
const inquirer = require("inquirer");
const fs = require("fs");

//questions
const questions = [
  {
    type: "input",
    name: "projectTitle",
    message: "What is your project title?",
  },
  {
    type: "input",
    name: "projectDesc",
    message: "Please enter a description of your project?",
  },
  {
    type: "confirm",
    name: "installScript",
    message: "Do you have an installation Script?",
    default: false,
  },
  {
    type: "input",
    name: "hasInstallScript",
    message: "What is the installation script?",
    when(answers) {
      return answers.installScript;
    },
  },
  {
    type: "confirm",
    name: "projectDirections",
    message: "Do you have directions for the use of this project?",
    default: false,
  },
  {
    type: "input",
    name: "hasDirections",
    message: "What are the directions? or How would I use your project?",
    when(answers) {
      return answers.projectDirections;
    },
  },
  {
    type: "confirm",
    name: "projectTest",
    message: "Do you have tests for this project?",
    default: false,
  },
  {
    type: "input",
    name: "hasTests",
    message: "How do I test the application?",
    when(answers) {
      return answers.projectTest;
    },
  },
  {
    type: "list",
    name: "license",
    message: "Choose a license: ",
    choices: [
      {
        name: "Academic Free License v3.0",
        value: "academic",
        short: "a",
      },
      {
        name: "MIT",
        value: "mit",
        short: "m",
      },
      {
        name: "GNU General Public License v2.0",
        value: "general",
        short: "g",
      },
      {
        name: "zLib License",
        value: "zlib",
        short: "z",
      },
    ],
  },
  {
    type: "input",
    name: "gitHubUserName",
    message: "What is your github username",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?",
  },
  {
    type: "input",
    name: "contribution",
    message: "How can people contribute to this app?",
  },
];

const constructTitle = (projectTitle) => {
  return ` ${projectTitle}`;
};
const constructDesc = (projectDesc) => {
  return `## Description \n ${projectDesc}`;
};
const constructInstall = (hasInstallScript) => {
  return `## Installation \n ${hasInstallScript}`;
};
const constructDirections = (hasDirections) => {
  return `## Directions \n ${hasDirections}`;
};
const constructTest = (hasTests) => {
  return `## Tests \n ${hasTests}`;
};
const constructLicense = (license) => {
  return `## License \n ${license}`;
};
const constructUserName = (gitHubUserName) => {
  return `#### GitHub User Name: ${gitHubUserName}`;
};
const constructEmail = (email) => {
  return `#### Email: ${email}`;
};
const constructContribution = (contribution) => {
  return `## Contribution \n ${contribution}`;
};

const readMeData = (projectAnswer) => {
  const {
    projectTitle,
    projectDesc,
    hasInstallScript,
    hasDirections,
    hasTests,
    license,
    gitHubUserName,
    email,
    contribution,
  } = projectAnswer;
  return `${constructTitle(projectTitle)}
  ${constructDesc(projectDesc)}
  ${constructInstall(hasInstallScript)}
  ${constructDirections(hasDirections)}
  ${constructTest(hasTests)}
  ${constructLicense(license)}
  ${constructUserName(gitHubUserName)}
  ${constructEmail(email)}
  ${constructContribution(contribution)}`;
};

const start = async () => {
  const projectAnswer = await inquirer.prompt(questions);
  console.log(projectAnswer);
  const generateReadme = readMeData(projectAnswer);
  console.log(generateReadme);
  writeToFile("generated_readme.md", generateReadme);
};

const writeToFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, data);
  } catch (error) {
    console.log(error.message);
  }
};

start();
