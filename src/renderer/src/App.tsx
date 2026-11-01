import { useState } from 'react'

interface AppInfo {
  appVersion: string
  electronVersion: string
  nodeVersion: string
  platform: string
}

function App(): React.JSX.Element {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null)
  const [loading, setLoading] = useState(false)

  const getAppInfo = async () => {
    try {
      setLoading(true)

      // 调用 Preload 暴露的 API
      const info = await window.api.getAppInfo()

      setAppInfo(info)
    } catch (error) {
      console.error('获取应用信息失败：', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Electron IPC Demo</h1>

      <button onClick={getAppInfo} disabled={loading}>
        {loading ? '获取中...' : '获取应用信息'}
      </button>

      {appInfo && (
        <div style={{ marginTop: 24 }}>
          <h3>主进程返回的数据：</h3>

          <pre>{JSON.stringify(appInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App
