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

const getItems = () => {
    const dataBuffer = fs.readFileSync('lists.json');
    const dataAsString = dataBuffer.toString();
    return JSON.parse(dataAsString);
}



module.exports = {
    listAllItems:listAllItems,
    listAllTodos:listAllTodos
}