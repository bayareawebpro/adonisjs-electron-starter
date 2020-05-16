'use strict'

// Boot Adonis Backend Server
require("../server")

// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

// Enable live reload for all the files inside your project directory

// Enable live reload for Electron too
// require('electron-reload')(`${__dirname}/../`, {
//   // Note that the path to electron may vary according to the main file
//   electron: require(`${__dirname}/../node_modules/electron`),
//   server: require(`${__dirname}/../server`),
// });

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create the browser window.
function createWindow() {
  mainWindow = new BrowserWindow({
    height: 1200,
    width: 1600,
    backgroundColor: '#1a202c',
    webPreferences: {
      preload: './preload.js'
    }
  })

  mainWindow.loadURL(`http://localhost:3333`)
  // mainWindow.loadURL(`http://localhost:3000`) //Port 3333 (hot reloading).

  // Open the DevTools.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }
  //mainWindow.setProgressBar(0.5)

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// On OS X it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

