const electron = require('electron');
const url = require('url');
const path = require('path');

const {
    app,
    BrowserWindow,
    Menu
} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function () {

    // Create new window
    mainWindow = new BrowserWindow({});

    // Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'cekogha-index.html'),
        protocol: 'file',
        slashes: true
    }));

    // Build the menu from the template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert menu
    Menu.setApplicationMenu(mainMenu);

});

// Handle create add window
// Listen for app to be ready
 function createAddWindow() {

    // Create new window
    addWindow = new BrowserWindow({
        width : 300,
        height : 300,
        title : 'Add Shopping List Items'
    });

    // Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'components/addItemsComponent/addItemsComponent.html'),
        protocol: 'file',
        slashes: true
    }));

    // Quit app when window is closed
    mainWindow.on('closed', function(){
        app.quit();
    });

    // Garbage ollection handle
    addWindow.on('closed', function(){
        addWindow = null;
    });

    // Build the menu from the template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert menu
    Menu.setApplicationMenu(mainMenu);
    
};


// Create a menu template
const mainMenuTemplate = [
    {
    label: 'File',
    submenu : [
        {
            label : 'Add Item',
            click(){
                createAddWindow();
            }
        },{
            label : 'Clear Items'
        },{
            label:'Quit',
            accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q', // depends on if we are on mac or windows
            click(){
                app.quit();
            }
        }
    ]
}
];