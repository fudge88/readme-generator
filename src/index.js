// import inquirer
const inquirer = require("inquirer");
const { writeToFile } = require("./util");
const { questions } = require("./questions");

//questions

const getOtherContents = ({ installation, usage, tests }) => {
  const contents = [];
  if (installation) contents.push("- [Installation](#installation)");
  if (usage) contents.push("- [Usage](#usage)");
  if (tests) contents.push("- [Tests](#tests)");
  return contents;
};

// constructing the dynamic README.md
// project title
const constructTitle = (projectTitle, license) => {
  return `# ${projectTitle} ![${license}](https://img.shields.io/static/v1?label=${license}&message=Licence&color=<COLOR>)`;
};

// table of contents
const generateTableOfContents = (installation, usage, tests) => {
  const contents = [
    "- [Description](#description)",
    ...getOtherContents(installation, usage, tests),
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
## Description

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
const constructDirections = (usage) => {
  if (usage) {
    return `
## Usage

${usage
  .map(function (usageSteps) {
    return `
\`\`\`
${usageSteps.hasUsage}
\`\`\``;
  })
  .join("\n")}`;
  } else {
    return "";
  }
};

// test table
const constructTestingTable = (projectAnswer) => {
  return `## Testing\n
  <table>
<tbody><tr>
<th>Browser</th>
<th>Working Links</th>
<th>Formatting Correctly</th>
<th>Notes</th> 
</tr>
<tr>
<th>Chrome</th>
<td>${projectAnswer.chromeLinks}</td>
<td>${projectAnswer.chrome}</td>
<td>${projectAnswer.chromeNotes}</td>
</tr>
<tr>
<th>FireFox</th>
<td>${projectAnswer.firefoxLinks}</td>
<td>${projectAnswer.firefox}</td>
<td>${projectAnswer.firefoxNotes}</td>
</tr>
<tr>
<th>Internet Explorer</th>
<td>${projectAnswer.explorerLinks}</td>
<td>${projectAnswer.explorer}</td>
<td>${projectAnswer.explorerNotes}</td>
</tr>
</tbody></table>`;
};

// further tests
const constructTest = (tests) => {
  if (tests) {
    return `
## Further Testing

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
    usage,
    license,
    gitHubUserName,
    email,
    contribution,
    tests,
  } = projectAnswer;

  return `${constructTitle(projectTitle, license)}
  ${generateTableOfContents({ installation, usage, tests })}
  ${constructDesc(projectDesc)}
  ${constructInstall(installation)}
  ${constructDirections(usage)}
  ${constructTestingTable(projectAnswer)}
  ${constructTest(tests)}
  ${constructLicense(license)}
  ${constructContribution(contribution)}
  ${constructQuestion(gitHubUserName, email)}`;
};

// looping prompts
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
  let usage;

  const projectAnswer = await inquirer.prompt(questions);

  // test questions
  const { projectTest } = await inquirer.prompt({
    type: "confirm",
    name: "projectTest",
    message: "Do you have more tests for this project?",
    default: false,
  });
  if (projectTest) {
    tests = await loopQuestion({
      type: "input",
      name: "hasTests",
      message: "How do I test the application?",
    });
  }

  // installation questions
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

  // Usage questions
  const { projectUsage } = await inquirer.prompt({
    type: "confirm",
    name: "projectUsage",
    message: "So you have instructions on how to use the project?",
    default: false,
  });
  if (projectUsage) {
    usage = await loopQuestion({
      type: "input",
      name: "hasUsage",
      message: "What are the instruction on how to your project?",
    });
  }

  projectAnswer.tests = tests;
  projectAnswer.installation = installation;
  projectAnswer.usage = usage;
  const generateReadme = readMeData(projectAnswer);
  writeToFile("generated_readme.md", generateReadme);
};

start();
