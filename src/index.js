// import inquirer
const inquirer = require("inquirer");

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
    type: "confirm",
    name: "projectDirections",
    message: "Do you have directions for the use of this project?",
    default: false,
  },
  {
    type: "confirm",
    name: "projectTest",
    message: "Do you have tests for this project?",
    default: false,
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

const installScriptQs = [
  {
    type: "input",
    name: "hasInstallScript",
    message: "What is the installation script?",
  },
];
const projectDirectionQs = [
  {
    type: "input",
    name: "hasDirections",
    message: "What are the directions? or How would I use your project?",
  },
];
const projectTestQs = [
  {
    type: "input",
    name: "hasTests",
    message: "How do I test the application?",
  },
];

const start = async () => {
  const projectAnswer = await inquirer.prompt(questions);
  console.log(projectAnswer);

  if (projectAnswer.installScript) {
    //   ask installation script question if true
    const installScriptAns = await inquirer.prompt(installScriptQs);
    console.log(installScriptAns);
  }
  if (projectAnswer.projectDirections) {
    //   ask installation script question if true
    const projectDirectionAns = await inquirer.prompt(projectDirectionQs);
    console.log(projectDirectionAns);
  }
  if (projectAnswer.projectTest) {
    //   ask installation script question if true
    const projectTestAns = await inquirer.prompt(projectTestQs);
    console.log(projectTestAns);
  }
};

start();
