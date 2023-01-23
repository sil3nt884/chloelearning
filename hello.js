

const userInput= async () => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        readline.question("", input =>{
            resolve(input)
            readline.close()
        })
    })
}


function validateUserInput (choices, userInput) {
    const allChoices = Object.keys(choices).some(choice => choice === userInput)

    if(!allChoices) {
        console.log(`no choices found please pick from ${Object.values(choices).map(c => c+ "")}`)
        return allChoices;
    }
    else {
        return  allChoices
    }
}
function saveUserOption(menuSelection, userPizza, userOption) {
    userPizza.push(menuSelection[userOption])
}

function displayOptions (choices, text) {
    let prefix = text
    let suffix = ""
    const allChoices = Object.keys(choices)
    allChoices.forEach((choice, index) => {
            if(index < allChoices.length -1) {
                suffix+=`${choice} or `
            }
            else if(index < allChoices.length){
                suffix += `${choice}`
            }
    })
    console.log(`${prefix} ${suffix}`)
}


const stagesText = {
    0 : "Please choose your base : ",
    1 : "Please choose your crust : ",
    2: "Please choose your sauce : ",
    3: "Which cheese would you like on your pizza? ",
    4: "please choose your toppings : ",
    5 : "Would you like more pizza?"
}


const createMenu = async (menu) => {
    const usersPizza = []
    let stages = Object.keys(menu).length
    for(let i=0; i<stages;) {
        const stage = menu[i]
        const currentStage = Object.keys(stage)[0]
        displayOptions(stage[currentStage], stagesText[i])
        let userSelectedOption = await userInput();
        if(!validateUserInput(stage[currentStage], userSelectedOption)) {
            i = i;
        }
        else {
            await saveUserOption(stage[currentStage], usersPizza, userSelectedOption)
            i++
        }
    }
    console.log("Selected Pizza", usersPizza.join(" "))
}





(async ()=>{
    let menu = {
        0: { bread : { thin : "thin", thick : "thick"}},
        1: {crust : { garlic : "garlic sprinkled crust", stuffed : "stuffed crust"}},
        2: {sauce : { tomato : "tomato", bbq : "bbq", none : "no sauce"}},
        3: {cheese : { mozzarella : "mozzarella", cheddar : "cheddar", vegan : "vegan cheese", "no cheese" : "no cheese"}},
        4: {toppings : { pepperoni : "pepperoni", veggie : "vegetables", beef : "spicy beef", tropical : "ham and pineapple" }},
    }
    console.log("Welcome to Chloe's Pizzeria, please select what pizza you would like from the options below.")
    await createMenu(menu)
})()