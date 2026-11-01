import { ElectronAPI } from '@electron-toolkit/preload'

interface AppInfo {
  appVersion: string
  electronVersion: string
  nodeVersion: string
  platform: string
}

interface Api {
  getAppInfo: () => Promise<AppInfo>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
