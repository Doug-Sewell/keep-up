const chalk = require('chalk');
const fs = require('fs');

//Lists all categories being tracked.
const listAllItems = () => {
    console.log(chalk.blue.inverse('Your tracked task categories:'))
    const items = getItems();
    items.forEach(item => console.log(`-${item.category}`));
}

//Lists all todos in a user provided category.
const listAllTodos = (category) => {
    const items = getItems();

    //Check if the category exists. If no category is found, the else statement executes.
    const itemTodos = items.find(topic => {
        return topic.category == category;
    });
    if (itemTodos) {

        console.log(chalk.blue.inverse('Your tracked tasks:'));
        itemTodos.items.forEach(item => {
            //Reference created to the amount of days since work was last done and the current date.
            const daysDifference = getDaysSinceWorked(item.date);
            const date = new Date(item.date);

            //Check if todo is overdue or not. Green for good standing, yellow for about to be overdue, or red for overdue.
            if (daysDifference < item.daysToWork) {
                console.log(chalk.bold.green.inverse('Topic: ' + item.topic));
            } else if (daysDifference == item.daysToWork) {
                console.log(chalk.bold.yellow.inverse('Topic: ' + item.topic));
            } else if (daysDifference > item.daysToWork) {
                console.log(chalk.bold.red.inverse('Topic: ' + item.topic));
            }
            console.log('- Last Worked on ' + date.toDateString());
            console.log('- Days to work without being overdue: ' + item.daysToWork);
            console.log(`- Days since worked: ${daysDifference}`);
            if (daysDifference < item.daysToWork) {
                console.log('- Status: Good Standing');
            } else if (daysDifference == item.daysToWork) {
                console.log('- Status: Must progress today to remain in good standing');
            } else if (daysDifference > item.daysToWork) {
                console.log('- Status: Overdue');
            }
        });
    } else {
        console.log(chalk.inverse.red('Category not found. Please enter a valid category'));
    }
}

//Add a Todo
const addTodo = (todo, category, daysToWork) => {
    //Acquires the saved data
    const items = getItems();

    //Checks for duplicate todos. If there are any, it will be in this new array.
    const duplicateTodo = items.filter(item => {
        if (item.category == category) {
            for (let x = 0; x < item.items.length; x++) {
                if (todo == item.items[x].topic) {
                    return true;
                }
            }
        }
    });

    //If there are no duplicates found, a secondary check looks for the category to place the todo and then saves it.
    if (duplicateTodo.length === 0) {
        const doesCategoryExist = items.find(item => item.category === category);
        if (doesCategoryExist === undefined) {
            console.log(chalk.red.inverse(`Error: The category of ${category} does not exist.`));
            console.log(chalk.red.inverse(`Please add the category and try again or place the new tracked item in a category that already exists.`));
        } else {
            //Automatically creates a new todo with the current date.
            const now = new Date();
            //New object for the todo
            const newTodo = {
                topic: todo,
                date: now,
                daysToWork
            }

            //Locates where to add the new todo
            items.find(item => {
                if (item.category === category) {
                    item.items.push(newTodo);
                }
            });
            //Saves the new todos as JSON and logs it to hte console.
            saveTodos(items);
            console.log(chalk.green.inverse(`Success! Added ${todo} under ${category}.`));
        }
    } else {
        //Error if the todo name already exists within a given cateogory.
        console.log(chalk.red.inverse(`Error: ${todo} already exists under ${category}.`));
    }
}

//Add a category
const addCategory = categoryInput => {
    const items = getItems();
    let addCategory = true;

    items.forEach(category => {
        if (category.category.toLowerCase() == categoryInput.toLowerCase()) {
            addCategory = false;
        }
    });

    if (addCategory) {
        console.log(chalk.green.inverse(`Success! Created ${categoryInput} as a category.`));
        const newCategory = {
            'category': categoryInput,
            'items': []
        }
        items.push(newCategory);
        saveTodos(items);
    } else {
        console.log(chalk.red.inverse('Error: A category with this name already exists. Please use another category name.'));
    }
}

//Returns the saved data as JSON
const getItems = () => {
    const dataBuffer = fs.readFileSync('lists.json');
    const dataAsString = dataBuffer.toString();
    return JSON.parse(dataAsString);
}

//Saves the updated JSON file
const saveTodos = (notes) => {
    const updatedNotes = JSON.stringify(notes);
    fs.writeFileSync('lists.json', updatedNotes);
}

//Returns the amount of days (rounded down) that have gone by since a given date.
const getDaysSinceWorked = (givenDate) => {
    const now = getToday();
    const date = new Date(givenDate);
    const dateMilliseconds = date.getTime();
    const difference = now - dateMilliseconds;
    const days = Math.floor(difference / 1000 / 60 / 60 / 24);
    return days;
}

//Returns the current time in milliseconds since January 1, 1970
const getToday = () => {
    const now = new Date().getTime();
    return now;
}

module.exports = {
    listAllItems,
    listAllTodos,
    addTodo,
    addCategory
}