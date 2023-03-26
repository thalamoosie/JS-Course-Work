'use strict';

/*
///////////////////////////////////////////////
// Coding Challenge #1
///////////////////////////////////////////////

Let's build a simple polling app.

A poll has a quesiton, an Array of options from which people can choose, and an array with the number of replies for each option. The data is stored in the starter 'poll' object below.

Tasks:

1) Create a method called 'registerNewAnswer' on the 'poll' object. The method should do the following things:

   ✅  a) Display a prompt window for the user to input the number of the selected option
        ie: What is your favorite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)

    ✅ b) Based on the input number, update the 'answers' array property. For example, if the option is 3, increase the value at POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense.

✅ 2) Call this method whenever a user clicks the "Answer Poll" button (document.querySelector('.class').addEventListner('click', poll.registerNewAnswer.bind(poll)))

✅3) Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. 

    a) If type 'array' simply display the rsults array as it is using console.log()
    b) if type 'String', display a string like "Poll results are 1, 2, 3, 4, a, b"
    
✅4) Run the 'displayResults' method ad the end of each new 'registerNewAnswer' call

/////
BONUS ✅
/////

Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and'string option. Do NOT put the array sin the poll object! So.. what should the keyword look like in this situation?

*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    // Initialize empty string for poll, or else it will be undefined!
    let pollString = '';
    for (let option of this.options) {
      pollString += `${option} \n`;
    }
    // Prompt for user input while it does not meet the criteria of answers in the key
    let userInput;
    do {
      userInput = prompt(
        `${this.question} \n ${pollString} \n (Write answer number)`
      );
      if (!userInput) {
        console.log(`User cancelled poll prompt`);
        alert('No');
      }
    } while (
      userInput === '' ||
      Number(userInput) < 0 ||
      Number(userInput > 3) ||
      isNaN(Number(userInput))
    );
    this.answers[userInput] += 1;
    console.log(`You selected: ${userInput}`);
    this.displayResults();
    this.displayResults('string');
  },

  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      // This was a cool idea but doesn't work for passing in an array of a length greater than the options available in the poll, so its commented out:

      //   let res = '';
      //   for (let i = 0; i < this.answers.length; i++) {
      //     res += `${this.options[i]}: ${this.answers[i]} \n`;
      //   }
      //   console.log(`The final poll results are:\n${res}`);

      const res = `Poll results are: ${this.answers.join(', ')}`;
      console.log(res + '.');
    }
  },
};

// BONUS TOPIC

const data1 = [5, 2, 3];
const data2 = [1, 5, 3, 9, 6, 1];

const displayOther = poll.displayResults;
displayOther.call({ answers: data1 });
displayOther.call({ answers: data2 });
displayOther.call({ answers: data1 }, 'string');
displayOther.call({ answers: data2 }, 'string');

// It's worth noting that I could actually bind options too such as:
// displayOther.call({ answers: data1, options: poll.options})
// However this does not work if the array in this test data is longer than the options in the object
// It still works but it'll say "undefined" since that index doesn't exist

// Prompt user for input only when they click on the "Answer Poll !?" button
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));
