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
            demandOption: true,
            describe: 'The category given will hold all to-do items you place under it.',
            type: 'string'
        }
    },
    handler(argv) {
        trackedItems.addCategory(argv.category);
    }
});

yargs.command({
    command: 'delete-todo',
    describe: 'Remove a todo from your tracked items.',
    builder: {
        category: {
            demandOption: true,
            describe: 'The todo will be deleted from a given category. A category is needed in case you have the same todo listed in different categories.',
            type: 'string'
        },
        todo: {
            demandOption: true,
            describe: 'The todo item you\'d like deleted.',
            type: 'string'
        }
    },
    handler(argv) {
        trackedItems.deleteTodo(argv.todo, argv.category);
    }
});

yargs.command({
    command: 'rename-todo',
    builder: {
        category: {
            demandOption: true,
            describe: 'Category for the todo you wish to rename.',
            type: 'string'
        },
        oldTodo: {
            demandOption: true,
            describe: 'The todo you want to rename',
            type: 'string'
        },
        newTodo: {
            demandOption: true,
            describe: 'The new name for your todo',
            type: 'string'
        }
    },
    handler(argv) {
        trackedItems.renameTodo(argv.category, argv.oldTodo, argv.newTodo);
    }
});

yargs.command({
    command: 'rename-category',
    builder: {
        oldCategory: {
            demandOption: true,
            describe: 'The name of the category you wish to change',
            type: 'string'
        },
        newCategory: {
            demandOption: true,
            describe: 'What you wish the new category name to be',
            type: 'string'
        }
    },
    handler(argv) {
        trackedItems.renameCategory(argv.oldCategory, argv.newCategory);
    }
});

yargs.command({
    command: 'delete-category',
    builder: {
        category: {
            demandOption: true,
            describe: 'The category you wish to delete',
            type: 'string'
        }
    },
    handler(argv) {
        trackedItems.deleteCategory(argv.category);
    }
})


yargs.parse();

/*
TODO
- Fix bug in which renaming categories doesn't check for duplicates.
  The issue is you can rename a category to another category that already exists.

- Data should print to console wheter it's capitalized or not.
- Add the ability to delete categories
- Add ability to manually set the last worked on date.
- Make ability to create todos without a date as a requirement.
*/