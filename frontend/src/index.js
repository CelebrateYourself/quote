const { app, BrowserWindow } = require('electron');
const { is } = require('electron-util');
const { join } = require('path');
const { execFile } = require('child_process');

const SERVER_PID = process.env.SERVER;
const PORT = process.env.PORT || 9999;
process.env.PORT = PORT;

let SERVER = null;

if (!is.development) {
  SERVER = execFile(join(__dirname, 'server'), [`--port=${PORT}`]);
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      enableRemoteModule: false,
      preload: join(__dirname, 'preload.js'),
    }
  });

  mainWindow.setMenu(null);
  mainWindow.loadFile(join(__dirname, 'index.html'));

  // Open the DevTools.
  if (is.development) {
    mainWindow.webContents.openDevTools();
  }
};

const run = () => {
   setTimeout(createWindow, 1000);
};

app.on('ready', run);
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }

  if (SERVER_PID) {
    process.kill(SERVER_PID, 'SIGKILL');
  }

  if (SERVER) {
    SERVER.kill();
  }
    
  process.exit(0);
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    run();
  }
});
