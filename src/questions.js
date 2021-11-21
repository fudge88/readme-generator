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
  {
    type: "confirm",
    name: "chrome",
    message:
      "When testing on different browsers did your app work as expected on chrome?",
  },
  {
    type: "confirm",
    name: "firefox",
    message:
      "When testing on different browsers did your app work as expected on Firefox?",
  },
  {
    type: "confirm",
    name: "explorer",
    message:
      "When testing on different browsers did your app work as expected on Internet Explorer?",
  },
  {
    type: "confirm",
    name: "chromeLinks",
    message: "Did your links work on chrome?",
  },
  {
    type: "confirm",
    name: "firefoxLinks",
    message: "Did your links work on Firefox?",
  },
  {
    type: "confirm",
    name: "explorerLinks",
    message: "Did your links work on Internet Explorer?",
  },
  {
    type: "input",
    name: "chromeNotes",
    message: "Do you have notes to add for Chrome testing?",
  },
  {
    type: "input",
    name: "firefoxNotes",
    message: "Do you have notes to add for FireFox testing?",
  },
  {
    type: "input",
    name: "explorerNotes",
    message: "Do you have notes to add for Internet Explorer testing?",
  },
];

module.exports = { questions };
