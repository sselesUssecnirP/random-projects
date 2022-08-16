const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path')
let win;
let windows = {};

function createWindow(options, file) {

    if (Object.keys(windows).length == 0) {
        windows['mainWindow'] = new BrowserWindow(options);
        windows['mainWindow'].loadFile(file);
    }
    //windows[options.title] = new BrowserWindow(options);
    //windows[options.title].loadFile(file)
}

app.whenReady().then(() => {

    /*
    tray = new Tray('./icon.ico')
    tray.setToolTip('FreeHugs')

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Close App', type: 'normal' }
    ])

    tray.setContextMenu(contextMenu)

    tray.on('click', () => {
        
    })
    */

    createWindow({ height: 1600, width: 900, webPreferences: { nodeIntegration: true, contextIsolation: false } }, "index.html");

    console.log('loaded!')
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow({ height: 1600, width: 900, webPreferences: { nodeIntegration: true, contextIsolation: false } }, "index.html");
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});