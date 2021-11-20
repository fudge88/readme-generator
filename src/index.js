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

const getOtherContents = ({ hasInstallScript, hasDirections, tests }) => {
  const contents = [];
  if (hasInstallScript) contents.push("- [Installation](#installation)");
  if (hasDirections) contents.push("- [Directions](#directions)");
  if (tests) contents.push("- [Tests](#tests)");
  return contents;
};

// constructing the dynamic README.md
// project title
const constructTitle = (projectTitle, license) => {
  return `# ${projectTitle} ![${license}](https://img.shields.io/static/v1?label=${license}&message=Licence&color=<COLOR>)`;
};

// table of contents
const generateTableOfContents = (hasInstallScript, hasDirections, tests) => {
  const contents = [
    "- [Description](#description)",
    ...getOtherContents(hasInstallScript, hasDirections, tests),
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
  return `
## Description\n
${projectDesc}`;
};

// project installation
const constructInstall = (installation) => {
  if (installation) {
    return `
## Installation\n
Follow these steps for installation:

${installation
  .map(function (installSteps) {
    return `
\`\`\`
${installSteps.hasInstallScript}
\`\`\``;
  })
  .join("\n")}`;
  } else {
    return "";
  }
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
const constructTest = (tests) => {
  if (tests) {
    return `
## Tests\n

${tests
  .map(function (testSteps) {
    return `
\`\`\`
${testSteps.hasTests}
\`\`\``;
  })
  .join("\n")}`;
  } else {
    return "";
  }
};

// project license
const constructLicense = (license) => {
  return `## License\n
  
  This project is licensed under the terms of the ${license} license.`;
};

// project questions
const constructQuestion = (gitHubUserName, email) => {
  return `## Questions\n
  If you have any questions about this project, or would like further information please contact me via:\n
  GitHub: ${gitHubUserName}\n
  Email: ${email}\n`;
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
    installation,
    hasDirections,
    license,
    gitHubUserName,
    email,
    contribution,
    tests,
  } = projectAnswer;

  return `${constructTitle(projectTitle, license)}
  ${generateTableOfContents({ installation, hasDirections, tests })}
  ${constructDesc(projectDesc)}
  ${constructInstall(installation)}
  ${constructDirections(hasDirections)}
  ${constructTest(tests)}
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
  let installation;

  const projectAnswer = await inquirer.prompt(questions);
  // test questions
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

  // installation

  const { installScript } = await inquirer.prompt({
    type: "confirm",
    name: "installScript",
    message: "Do you have an installation Script?",
    default: false,
  });
  if (installScript) {
    installation = await loopQuestion({
      type: "input",
      name: "hasInstallScript",
      message: "What is the installation script?",
    });
  }

  projectAnswer.tests = tests;
  projectAnswer.installation = installation;
  console.log(projectAnswer);
  const generateReadme = readMeData(projectAnswer);
  writeToFile("generated_readme.md", generateReadme);
};

start();
