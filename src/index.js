// import inquirer
const inquirer = require("inquirer");
const { writeToFile } = require("./util");

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
    when: (answers) => {
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
    when: (answers) => {
      return answers.projectDirections;
    },
  },
  // {
  //   type: "confirm",
  //   name: "projectTest",
  //   message: "Do you have tests for this project?",
  //   default: false,
  // },
  // {
  //   type: "input",
  //   name: "hasTests",
  //   message: "How do I test the application?",
  //   when: (answers) => {
  //     return answers.projectTest;
  //   },
  // },
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

const getOtherContents = ({ hasInstallScript, hasDirections, hasTests }) => {
  const contents = [];
  if (hasInstallScript) contents.push("- [Installation](#installation)");
  if (hasDirections) contents.push("- [Usage](#usage)");
  if (hasTests) contents.push("- [Tests](#tests)");
  return contents;
};

// constructing the dynamic README.md
// project title
const constructTitle = (projectTitle) => {
  return `# ${projectTitle}`;
};

const generateTableOfContents = (hasInstallScript, hasDirections, hasTests) => {
  const contents = [
    "- [Description](#description)",
    ...getOtherContents(hasInstallScript, hasDirections, hasTests),
    "- [Contributing](#contributing)",
    "- [License](#license)",
    "- [Question](#question)",
  ];

  return `## Table of Contents\n
${contents.join("\n")}
`;
};

// project description
const constructDesc = (projectDesc) => {
  return `## Description\n${projectDesc}`;
};

// project installation
const constructInstall = (hasInstallScript) => {
  return hasInstallScript
    ? `## Installation
  Follow these steps for installation: 
  \`\`\`
  ${hasInstallScript}
  \`\`\``
    : "";
};

// project directions
const constructDirections = (hasDirections) => {
  return hasDirections
    ? `## Directions
  To use this application you:
  \`\`\`
  ${hasDirections}
  \`\`\``
    : "";
};

// project tests
const constructTest = (hasTests) => {
  return hasTests ? `## Tests\n${hasTests}` : "";
};

// project license
const constructLicense = (license) => {
  return `## License\n
  ![${license}](https://img.shields.io/static/v1?label=${license}&message=Licence&color=<COLOR>)\n
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
  ${generateTableOfContents({ hasInstallScript, hasDirections, hasTests })}
  ${constructDesc(projectDesc)}
  ${constructInstall(hasInstallScript)}
  ${constructDirections(hasDirections)}
  ${constructTest(hasTests)}
  ${constructLicense(license)}
  ${constructContribution(contribution)}
  ${constructQuestion(gitHubUserName, email)}`;
};

const loopQuestion = async (question) => {
  let inProgress = true;
  const results = [];
  while (inProgress) {
    const answers = await inquirer.prompt(question);
    results.push(answers);
    const { quit } = await inquirer.prompt({
      type: "confirm",
      message: "do you want to quit?",
      name: "quit",
    });

    if (quit) {
      inProgress = false;
    }
  }

  return results;
};

// start function
const start = async () => {
  let tests;

  const projectAnswer = await inquirer.prompt(questions);
  const { projectTest } = await inquirer.prompt({
    type: "confirm",
    name: "projectTest",
    message: "Do you have tests for this project?",
    default: false,
  });
  if (projectTest) {
    tests = await loopQuestion({
      type: "input",
      name: "hasTests",
      message: "How do I test the application?",
    });
  }
  console.log(tests);

  const generateReadme = readMeData(projectAnswer);

  writeToFile("generated_readme.md", generateReadme);
};

start();
