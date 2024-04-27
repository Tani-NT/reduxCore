import { compose } from "redux";

function removeSpaces(string){
    return string.split(" ").join("")
}
function repeatString(string){
    // return string + string
    return string.repeat(3)
}
function convertToUpper(string){
    return string.toUpperCase();
}
const input = " abc def ghi";
const  output = convertToUpper(repeatString(removeSpaces(input)));
console.log(output);

// compose can take multiple arguments
const composedFunction = compose(removeSpaces, repeatString,convertToUpper);
console.log(composedFunction(input));