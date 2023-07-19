import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  get: async (key) => await ipcRenderer.invoke('_get', key),
  set: async ({ key, value }) => ipcRenderer.invoke('_send', { key, value }),
  update: async ({ key, value }) => ipcRenderer.invoke('_update', { key, value }),
  delete: async (key) => await ipcRenderer.invoke('_delete', key),
  sayHello: (name) => `Hello ${name}`
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
