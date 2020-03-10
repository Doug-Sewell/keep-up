const chalk = require('chalk');
const fs = require('fs');

const listAllItems = () => {
    console.log(chalk.blue.inverse('Your tracked task categories:'))
    const items = getItems();
    items.forEach(item => console.log(`-${item.category}`));
}


const listAllTodos = (category) => {
    const items = getItems();
    const itemTodos = items.find(topic => {
        return topic.category == category;
    });
    console.log(chalk.blue.inverse('Your tracked tasks:'));

    itemTodos.items.forEach(item => {
        console.log('Topic: ' + item.topic);
        console.log('Last Worked on ' + item.date);
    });
}






const addTodo = (todo, category) => {
    const items = getItems();

    const duplicateTodo = items.filter(item => {
        if (item.category == category) {
            for (let x = 0; x < item.items.length; x++) {
                if (todo == item.items[x].topic) {
                    return true;
                }
            }
        }
    });

    if (duplicateTodo.length === 0) {
        const doesCategoryExist = items.find(item => item.category === category);
        if (doesCategoryExist === undefined) {
            console.log(chalk.red.inverse(`Error: The category of ${category} does not exist.`)); 
            console.log(chalk.red.inverse(`Please add the category and try again or place the new tracked item in a category that already exists.`));
        } else {
            const now = new Date();

            const newTodo = {
                topic: todo,
                date: now
            }

            items.find(item => {
                if (item.category === category) {
                    item.items.push(newTodo);
                }
            });
            saveTodos(items);
            console.log(chalk.green.inverse(`Success! Added ${todo} under ${category}.`));
        }
    } else {
        console.log(chalk.red.inverse(`Error: ${todo} already exists under ${category}.`));
    }



}

const getItems = () => {
    const dataBuffer = fs.readFileSync('lists.json');
    const dataAsString = dataBuffer.toString();
    return JSON.parse(dataAsString);
}

const saveTodos = (notes) => {
    const updatedNotes = JSON.stringify(notes);
    fs.writeFileSync('lists.json', updatedNotes);
}

module.exports = {
    listAllItems: listAllItems,
    listAllTodos: listAllTodos,
    addTodo: addTodo
}