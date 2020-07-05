const yargs = require('yargs');
const trackedItems = require('./tracked-items');

//List all tracked categories.
yargs.command({
    command: 'list-all',
    describe: 'List all items you are tracking as well as their current status.',
    handler() {
        trackedItems.listAllItems();
    }
});

//List all items tracked in a specific category
yargs.command({
    command: 'list-category',
    describe: 'List all items within a category',
    builder: {
        category: {
            demandOption: true,
            type: 'string',
            describe: 'topic you want to see todos for'
        }
    },
    handler(argv) {
        trackedItems.listAllTodos(argv.category);
    }
});

//Adds a to-do to a given category
yargs.command({
    command: 'add-todo',
    describe: 'Add a new item to track under a given category.',
    builder: {
        todo: {
            demandOption: true,
            describe: 'The name of the todo to be tracked',
            type: 'string'
        },
        category: {
            demandOption: true,
            describe: 'Under which category you like to add your todo item',
            type: 'string'
        },
        daysUntilOverdue: {
            demandOption: true,
            describe: 'The number of days you have until that todo is considered overdue for having not worked on it for too long.',
            type: 'number'
        }
    },
    handler(argv) {
        trackedItems.addTodo(argv.todo, argv.category, argv.daysUntilOverdue);
    }
});

yargs.command({
    command: 'add-category',
    describe: 'Add a new category of to-do items',
    builder: {
        category: {
            demandOption:true,
            describe:'The category given will hold all to-do items you place under it.',
            type:'string'
        }
    },
    handler(argv){
        trackedItems.addCategory(argv.category);
    }
});


yargs.parse();

/*
TODO:
- Data should print to console wheter it's capitalized or not.
- Add the ability to rename Todos
- Add the ability to create and delete categories
- Add ability to delete a todo
- Add ability to manually set the last worked on date.
*/