const inquirer = require('inquirer')
// const fs = require('fs')
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github)

// fs.writeFile('index.html', generatePage(name, github), err => {
//   if (err) throw err


//   console.log('Portfolio complete! Check out index.html to see the output!')
// })

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if (nameInput) {
          return true
        } else {
          console.log("please enter a name")
          return false
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username',
      validate: gitInput => {
        if (gitInput) {
          return true
        } else {
          console.log("please enter a github name")
          return false
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
  name: 'about',
  message: 'Provide some information about yourself:',
  when: ({ confirmAbout }) => {
    if (confirmAbout) {
      return true;
    } else {
      return false;
    }
  }

    }
  ]);
};

const promptProject = portfolioData => {
  
 
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  

  
  
  console.log(`
=================
Add a New Project
=================
`);
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?',
      validate: projectNameInput => {
        if (projectNameInput) {
          return true
        } else {
          console.log("please enter a project name")
          return false
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descInput => {
        if (descInput) {
          return true
        } else {
          console.log("please enter a description")
          return false
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: linkInput => {
        if (linkInput) {
          return true
        } else {
          console.log("please enter a link")
          return false
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  });
};


promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });





