const schema = require("./schema.json");

let rules = {};

const allPageSchema = schema.allPagesSchema;


const addToRules = (form) => {

    console.log(form.responseType);

    switch(form.responseType) {
        case "number": {
            const questionId = form.questionId;
            rules[questionId] = {
                responseType: "number",
                mandatory: form.mandatory,
                responseRangeMin: form.responseRangeMin,
                responseRangeMax: form.responseRangeMax
            }
            break;
        }

        case "dropdown": {
            const questionId = form.questionId;
            rules[questionId] = {
                responseType: "dropdown",
                mandatory: form.mandatory,
                dropdownOptions: form.dropdownOptions
            }
            break;
        }

        case "scale": {
            const questionId = form.questionId;
            rules[questionId] = {
                responseType: "scale",
                mandatory: form.mandatory,
                MinScaleValue: form.MinScaleValue,
                MaxScaleValue: form.MaxScaleValue
            }
            break;
        }
    }
}

for(const page of allPageSchema) { // itterate per page

    // console.log(page.formSchema);

    for(const form of page.formSchema) {
        addToRules(form);

        if(form.hasFollowUpQuestions) {
            for(const key in form.followUpQuestions) {

                const followUpQuestionsArray = form.followUpQuestions[key];

                for(const followUpQuestion of followUpQuestionsArray) {
                    addToRules(followUpQuestion);
                }
            }
        }
    }

}

console.log(rules);

module.exports = {
    rules
}