import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import log from 'electron-log';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    minWidth: 1200,
    minHeight: 600,
    frame: false,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, 'favicon.ico'),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);

  if (app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
  } else {
    mainWindow.loadURL(`http://localhost:${process.env.VITE_PORT || 8888}`);
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on('minimize-app', () => {
    if (mainWindow) {
      mainWindow.minimize();
    }
  });

  ipcMain.on('maximize-restore-app', () => {
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.restore();

        mainWindow.webContents.send('window-state', 'restored');
      } else {
        mainWindow.maximize();

        mainWindow.webContents.send('window-state', 'maximized');
      }
    }
  });

  ipcMain.on('close-app', () => {
    if (mainWindow) {
      mainWindow.close();
    }
  });

  ipcMain.on('write-file', (event, { filename, content }) => {
    const savePath = path.join(app.getPath('documents'), filename); // or use __dirname
    fs.writeFileSync(savePath, content, 'utf-8');
    console.log(`File saved to ${savePath}`);
    dialog.showMessageBox({
      type: 'info',
      title: 'Export to file',
      message: 'The file was saved successfully!',
    });
  });

  ipcMain.handle('open-read-file', async () => {
    const result = await dialog.showOpenDialog({
      title: 'Select a json file',
      properties: ['openFile'],
      filters: [
        { name: 'Json File', extensions: ['json'] },
        // { name: 'All Files', extensions: ['*'] },
      ],
    });

    if (!result.canceled && result.filePaths.length > 0) {
      const content = fs.readFileSync(result.filePaths[0], 'utf-8');
      return content;
    }
    return null;
  });

  mainWindow.webContents.once('did-finish-load', () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
  log.info(`created window`);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
