// import inquirer
const inquirer = require("inquirer");
const util = require("./util");

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
        name: "zLib",
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

// constructing the dynamic README.md
// project title
const constructTitle = (projectTitle) => {
  return `# ${projectTitle}`;
};

// Table of Contents
// const constructToc = ({ hasInstallScript, hasDirections, hasTests }) => {
//   return `## Contents\n
//   - [Description](#description)
//   - ${hasInstallScript ? " - [Installation](#installation)n" : ""}
//   - ${hasDirections ? " - [Directions](#directions)" : ""}
//   - ${hasTests ? " - [Testing](#Testing)" : ""}
//   - [License](#license)
//   - [Contribution](#contribution)
//   - [Questions](#questions)`;
// };

// project description
const constructDesc = (projectDesc) => {
  return `## Description\n${projectDesc}`;
};

// project installation
const constructInstall = (hasInstallScript) => {
  return `## Installation
  Follow these steps for installation: 
  \`\`\`
  ${hasInstallScript}
  \`\`\``;
};

// project directions
const constructDirections = (hasDirections) => {
  return `## Directions
  To use this application you:
  \`\`\`
  ${hasDirections};
  \`\`\``;
};

// project tests
const constructTest = (hasTests) => {
  return `## Tests\n${hasTests}`;
};

// project license
const constructLicense = (license) => {
  return `## License\n
  [MIT](https://img.shields.io/static/v1?label=${license}&message=Licence&color=<COLOR>)\n
  This project is licensed under the terms of the ${license} license`;
};

// project questions
const constructQuestion = (gitHubUserName, email) => {
  return `## Questions\n
  If you have any questions about this project, or would like further information please contact me via:
  Email: ${email}\n
  GitHub User Name: ${gitHubUserName}`;
};

// project contributions
const constructContribution = (contribution) => {
  return `## Contribution
  All contributions are welcomed, you can contribute to this repository by ${contribution}`;
};

// constructing the readme
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
  ${constructContribution(contribution)}
  ${constructQuestion(gitHubUserName, email)}`;
};

// start function
const start = async () => {
  const projectAnswer = await inquirer.prompt(questions);
  console.log(projectAnswer);
  const generateReadme = readMeData(projectAnswer);
  console.log(generateReadme);
  util.writeToFile("generated_readme.md", generateReadme);
};

start();
