// import inquirer
const inquirer = require("inquirer");

//questions
const questions = [
  {
    type: "input",
    name: "projectTitle",
    message: "what is your project title?",
  },
];

const start = async () => {
  const titleAnswer = await inquirer.prompt(questions);
  console.log(titleAnswer);
};

start();
