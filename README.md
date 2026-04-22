# AI Prompt Generator

這是一個使用 React + Vite 打造的 AI Prompt 產生器專案。

## 🚀 專案啟動與開發

1. **安裝套件**
   請在專案根目錄下執行以下指令安裝所需依賴：
   `ash
   npm install
   `

2. **啟動本地開發伺服器**
   執行以下指令啟動本地端環境（預設開啟在 http://localhost:3000）：
   `ash
   npm run dev
   `

3. **本地打包測試**
   若需要測試編譯打包結果，可執行：
   `ash
   npm run build
   `
   （產生的靜態檔案會放置於 dist/ 資料夾）

## 📦 部署上線 (GitHub Pages)

本專案已設定 **GitHub Actions** 自動化部署。

1. **推送程式碼**：只要將程式碼 git push 到 main 分支，GitHub 就會自動觸發 .github/workflows/deploy.yml 流程。
2. **自動打包與發布**：系統會在雲端執行 
pm run build，並自動將打包好的 dist 資料夾部署至 GitHub Pages。
3. **GitHub Pages 設定**：請確保在 GitHub 儲存庫的 **Settings > Pages** 內，將 Build and deployment 的 Source 選項設定為 **GitHub Actions**。

## 🔒 隱私與暫存檔管理

專案中已經配置了完整的 .gitignore 檔案。
以下內容會被 Git 忽略，**不會** 被上傳至 GitHub 以確保隱私與乾淨的版控環境：
- 
ode_modules/ (依賴套件)
- dist/ (本地打包產物)
- .env* (環境變數、API 金鑰等機密資料)
- *.log, .DS_Store (系統與編譯暫存檔)
