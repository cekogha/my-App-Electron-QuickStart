const electron = require('electron');
const url = require('url');
const path = require('path');

const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
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
        width: 300,
        height: 300,
        title: 'Add Shopping List Items'
    });

    // Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'components/addItemsComponent/addItemsComponent.html'),
        protocol: 'file',
        slashes: true
    }));

    // Quit app when window is closed
    mainWindow.on('closed', function () {
        app.quit();
    });

    // Garbage ollection handle
    addWindow.on('closed', function () {
        addWindow = null;
    });

    // Build the menu from the template
    const addItemsMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert menu
    Menu.setApplicationMenu(addItemsMenu);

};

// Catch item:add
ipcMain.on('item:add', function(e, item) {
    console.log(item);
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
});

// Create a menu template
const mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Add Item',
        click() {
            createAddWindow();
        }
    }, {
        label: 'Clear Items',
        click() {
            mainWindow.webContents.send('item:clear');
        }
    }, {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q', // depends on if we are on mac or windows
        click() {
            app.quit();
        }
    }]
}];

// Create a menu template
const addItemsMenuTemplate = [{
    label: 'File',
    submenu: [
       {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q', // depends on if we are on mac or windows
        click() {
            addWindow.close();
        }
    }]
}];


// If mac had empty object in menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({})
};

// ADd developper tools item if not in prod
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [{
            label: 'Toogle DevTools',
            accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I', // depends on if we are on mac or windows
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }, {
            role: 'reload'
        }]
    });
}