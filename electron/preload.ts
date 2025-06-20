import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  // Sending messages to the main process
  send: (channel: string, ...args: any[]) => {
    ipcRenderer.send(channel, ...args);
  },

  // Receiving a response from the main process (one-time)
  invoke: async (channel: string, ...args: any[]): Promise<any> => {
    try {
      return await ipcRenderer.invoke(channel, ...args);
    } catch (error) {
      console.error(`Error invoking channel "${channel}":`, error);

      throw error;
    }
  },

  // Subscribing to messages from the main process
  on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.on(channel, listener);

    return () => ipcRenderer.removeListener(channel, listener); // Функция для отписки
  },

  // Subscribe to messages with the Single Call Guarantee
  once: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => {
    ipcRenderer.once(channel, listener);
  },

  // Remove all listeners for a channel
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },

  // List of active channels (for debugging)
  getChannels: () => {
    return ipcRenderer.eventNames();
  },

  writeFile: (filename, content) => ipcRenderer.send('write-file', { filename, content }),

  openReadFileDialog: () => ipcRenderer.invoke('open-read-file'),
});
