const {rules} = require("./processSchema");

const validateNumberType = (userInput, ruleForThisInput) => {

    if(userInput === "") {
        if(!ruleForThisInput.mandatory) return  true;
        else return false;
    }

    const userInputInNumber = parseInt(userInput, 10);
    // console.log(userInputInNumber);

    if(isNaN(userInputInNumber)) return false;

    if(userInput > ruleForThisInput.responseRangeMax || userInput < ruleForThisInput.responseRangeMin)  return false;

    return true;
}

const validateDropdownType = (userInput, ruleForThisInput) => {

    if(userInput === "") {
        if(!ruleForThisInput.mandatory) return  true;
        else return false;
    }

    let dropdownfoundInOptionsSchema = false;

    console.log(ruleForThisInput);
    console.log(ruleForThisInput.dropdownOptions);


    for(const dropdownOption of ruleForThisInput.dropdownOptions) {
        if(dropdownOption == userInput) {
            dropdownfoundInOptionsSchema = true;
            break;
        }
    }

    if(dropdownfoundInOptionsSchema)  return true;
    else return false;
}

const validateScaleType = (userInput, ruleForThisInput) => {

    if(userInput === "") {
        if(!ruleForThisInput.mandatory) return  true;
        else return false;
    }

    const userInputInNumber = parseInt(userInput, 10);


    if(isNaN(userInputInNumber)) return false;

    if(userInput > ruleForThisInput.MaxScaleValue || userInput < ruleForThisInput.MinScaleValue)  return false;

    return true;
}

/*
userResponse = {
    ageInYears: "13", 
    city: "kolkata"
}

*/

const validateUserResponseHelper = (questionId, userInput) => {

    if(rules[questionId] === undefined) return false;

    switch(rules[questionId].responseType) {
        case "number": {
            if(! validateNumberType(userInput, rules[questionId]) ) {
                return false;
            }
            break;
        }
        case "dropdown": {
            if(! validateDropdownType(userInput, rules[questionId]) ) {
                return false;
            }
            break;
        }
        case "scale": {
            if(! validateScaleType(userInput, rules[questionId]) ) {
                return false;
            }
            break;
        }
    }

    return true;
}

const validateUserResponse = (userResponse) => {

    for(const questionId in userResponse) {
        if(! validateUserResponseHelper(questionId, userResponse[questionId])) {
            return false;
        }
    }

    return true;
}

module.exports = {
    validateUserResponse
}