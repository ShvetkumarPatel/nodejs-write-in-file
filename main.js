let stdin = process.openStdin(); //input coming from the terminal
let fs = require('fs'); //To include the File System module
const readline = require('readline'); // provides a way of reading a datastream, one line at a time
let allowedKeyword; //declare variables 
let writeStream = fs.createWriteStream("data.txt", { flags: 'a' }); //creates a writable stream
let noOfTries;  //variable to inform user regarding remainig tries or attempt to make
let noOfLinesAllowed //variable to count number of lines 

const rin = readline.createInterface({ // creates a new readline.Interface instance to listen line event
    input: process.stdin,
    output: process.stdout // terminal console output
});

rin.question('Enter the keyword: ', (answer) => { //give user input( keyword ) to answer 
    allowedKeyword = answer;                      //assign answer parameter to variable
    rin.question('Enter the no of lines allowed: ', (answer2) => { //give user input( lines ) to answer2 
        noOfLinesAllowed = answer2;                                    ////assign answer2 parameter to variable
        noOfTries = noOfLinesAllowed;
        rin.on("line", (d) => {
            let input = d.toString().trim(); // used to remove whitespace characters from the start and end of a string
            if (input.includes(allowedKeyword)) {
                if (noOfTries != noOfLinesAllowed - (noOfLinesAllowed - 1) && noOfLinesAllowed > 0) {
                    noOfTries--;
                    writeStream.write(`${input}\n`);
                    console.log(`${noOfTries} line remaining`)
                }
                else {
                    writeStream.write(`${input}\n`);
                    writeStream.close();
                    console.log('Done');
                    process.exit();
                }
            }
            else {
                console.log("Wrong keyword, Try again!"); //print a line to the terminal
                // noOfTries = noOfLinesAllowed; //comment this out if you wanna start over
            }
        });
    });
});