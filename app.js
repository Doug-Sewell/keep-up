const yargs = require('yargs');
const trackedItems = require('./tracked-items');

//List all tracked items.
yargs.command({
    command: 'list-all',
    describe:'List all items you are tracking as well as their current status.',
    handler(){
        trackedItems.listAllItems();
    }
});

yargs.command({
    command:'list-category',
    describe:'List all items within a category',
    builder: {
       category: {
           demandOption:true,
           type:'string',
           describe:'topic you want to see todos for'
       }
    },
    handler(argv){
        trackedItems.listAllTodos(argv.category);
    }
})


yargs.parse();