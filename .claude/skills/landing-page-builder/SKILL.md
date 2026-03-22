---
name: landing-page-builder
description: "為 EnGenius 產品建立 Landing Page，採用「架構確認 → 視覺產出」兩階段流程。當使用者提到「做 Landing Page」、「建產品頁面」、「寫 LP」、「做一個產品介紹頁」時觸發。涵蓋文案撰寫、圖片規劃、HTML 視覺產出。"
---

# EnGenius Landing Page Builder

為 EnGenius 產品建立完整的 Landing Page，包含文案、圖片規劃、視覺排版。

**核心原則：架構先行，視覺後做。**

---

## 執行流程

### 🔍 Phase 0：資訊收集

啟動時，先向使用者確認：

```
1. 哪個產品/解決方案？（例：ECC500、AI Cloud Surveillance 全線、MSP Portal）
2. 目標受眾？（IT 管理者 / SI・MSP / 零售業主 / 通用）
3. 頁面目的？（產品介紹 / 新品發表 / 促銷活動 / 解決方案展示）
4. 語言版本？（EN / ZH / 兩者）
5. 有沒有特殊需求？（活動倒數、表單、影片嵌入、比較表等）
```

### 📚 Phase 1：自動讀取參考資料

根據使用者回答，自動讀取以下檔案：

**必讀（每次都讀）：**
- `context/brand-voice.md` — 語氣規範
- `context/brand-context.md` — 品牌定位
- `context/target-audience.md` — 對應 Persona
- `context/style-references/visual-style-analysis.md` — 視覺規範
- `examples/marketing-content/landing-page-examples.md` — 現有 LP 結構參考

**依產品讀取：**
- `context/product-specs/` — 該產品的規格文件（Excel / PDF）
- `context/product-photos/` — 該產品的照片
- `data/market-research_surveillance.md` — 若為監控產品，必讀市場研究

**依需求讀取：**
- `examples/marketing-content/` — 相關 Press Release 或 Feature Guide

---

### 📝 Phase 2：架構提案（產出 → 等待確認）

產出 **Landing Page 架構文件**，包含：

```markdown
# [產品名] Landing Page 架構提案

## 頁面資訊
- 產品：
- 目標受眾：
- 頁面目的：
- 預估區塊數：

---

## 區塊架構

### Section 1：Hero
- **標題**：[主標題文案]
- **副標題**：[副標文案]
- **CTA**：[按鈕文字] → [連結目標]
- **📸 圖片規劃**：
  - 類型：Hero Banner
  - 描述：[圖片內容描述]
  - 來源：AI 生成 / 產品照 / 設計師
- **Logo**：[使用哪個版本的 Logo、放置位置]

### Section 2：[區塊名稱]
- **標題**：
- **內文摘要**：[2-3 句重點，非完整文案]
- **📸 圖片規劃**：
  - 類型：[產品照 / 情境圖 / Icon / 架構圖]
  - 描述：
  - 來源：

### Section 3-N：...（同上格式）

---

## 頁面流程邏輯
[說明為什麼這樣排序：注意力抓取 → 痛點共鳴 → 解決方案 → 產品細節 → 社會證明 → CTA]

## Logo 使用計畫
- Header：[哪個 Logo 版本]
- Footer：[哪個 Logo 版本]

## 需要確認的問題
1. [任何需要使用者補充的資訊]
2. [對區塊順序的建議與替代方案]
```

**⚠️ 重要：Phase 2 產出後必須暫停，等待使用者確認或修改。不可自動進入 Phase 3。**

明確詢問使用者：
> 「架構 OK 嗎？有沒有要調整的地方？確認後我會開始產出完整文案和視覺。」

---

### ✍️ Phase 3：完整內容產出（架構確認後）

使用者確認架構後，產出每個區塊的完整內容：

```markdown
### Section N：[區塊名稱]

**文案（EN）：**
Headline: ...
Subheadline: ...
Body: ...
CTA: ...

**文案（ZH）：**（如需要）
Headline: ...
Subheadline: ...
Body: ...
CTA: ...

**📸 圖片規格：**
- 類型：[Hero Banner / 產品照 / 情境圖 / Icon / 架構圖]
- 建議尺寸：[例：1920x800px]
- 風格：[參考 visual-style-analysis.md]
- 圖片來源：[product-photos/ 引用 | AI 生成 | 設計師製作]

**🎨 AI 圖片生成提示詞（nanobanana）：**
[完整英文 prompt，包含：主題、構圖、色調、光線、風格、品牌元素]
範例格式：
"Professional photograph of [scene], [product] visible in frame, [lighting], [color tone matching EnGenius brand blue #03A9F4], clean modern aesthetic, 16:9 aspect ratio, commercial photography style"
```

**⚠️ 重要：Phase 3 產出後再次暫停，等待使用者確認文案內容。確認後才進入 Phase 4。**

---

### 🎨 Phase 4：視覺製作（文案確認後）

使用者確認完整文案後，執行視覺產出：

**Step 1：生成圖片**
- 使用 `mcp__nanobanana__generate_image` 生成所需圖片
- 產品照從 `context/product-photos/` 引用
- Logo 從 `context/style-references/logos/` 引用

**Step 2：產出 HTML 頁面**
- 建立完整的 HTML/CSS/JS Landing Page
- 儲存至 `outputs/marketing-content/[產品名]-landing-page/`
- 包含：`index.html` + `assets/` 資料夾（圖片、CSS）

**Step 3：預覽與確認（必須執行）**
- 先儲存 HTML 檔案（讓使用者留存、可分享給同事）
- 再使用 Claude Preview 啟動即時預覽，讓使用者在瀏覽器中直接查看
- 使用者提出修改 → 直接修改 HTML → 重新預覽
- 迭代到使用者滿意為止

**HTML 製作規範（遵循 EnGenius 品牌）：**
- 字體：Manrope（Google Fonts 載入）
- 品牌藍：#03A9F4
- CTA 橙：#FFA200
- 深色背景：#291734
- 最大內容寬度：1100px
- CTA 按鈕：橙色實心 + 白色文字 + 圓角
- Logo 根據背景色選用黑/白/藍版
- 響應式設計（桌面 + 平板 + 手機）
- Hero 區域：全寬背景圖 + 深色半透明遮罩

**Step 4：最終交付**
- 確認最終版本的 HTML 已儲存
- 產出文案備份（copy-en.md / copy-zh.md）方便後續使用

---

## Landing Page 區塊模板庫

根據 EnGenius 現有 Landing Page 分析，以下是常用區塊模板：

### 常用區塊類型

| 區塊 | 用途 | 參考 |
|------|------|------|
| **Hero（輪播式）** | 品牌印象、主要訊息 | AI Surveillance LP |
| **Hero（靜態式）** | 單一產品聚焦 | MSP Portal LP |
| **產品生態系** | 展示產品線全貌 | AI Surveillance LP |
| **產品卡片網格** | 多型號展示 | Camera Lineup |
| **左右交替圖文** | 功能詳細介紹 | 通用 |
| **功能 Icon 列表** | 快速掃描重點功能 | 通用 |
| **架構/拓撲圖** | 技術部署說明 | How It Works |
| **規格比較表** | 型號對比 | 產品頁 |
| **CTA 區塊** | 引導下一步行動 | 所有 LP |
| **客戶案例/證言** | 社會證明 | 待建立 |
| **FAQ 折疊** | 常見問題解答 | 待建立 |

### 建議的區塊排序邏輯

```
1. Hero          → 抓住注意力、傳遞核心價值
2. 痛點/挑戰      → 引起共鳴（為什麼需要這個產品？）
3. 解決方案概覽    → 我們怎麼解決（產品生態系/架構圖）
4. 功能亮點       → 具體能力（Icon 列表或左右圖文）
5. 產品展示       → 型號選擇（卡片網格或比較表）
6. 使用情境/案例   → 證明有效（情境圖或客戶案例）
7. CTA           → 引導行動（Demo 申請/聯絡業務/購買）
```

---

## 文案風格指引（與 EnGenius 官網一致）

### 標題公式
1. **價值主張型**：「Surveillance that Tells the Whole Story」
2. **祈使句型**：「Discover the EnGenius AI Camera Lineup」
3. **簡化概念型**：「One Cloud, Seamless Cameras Managed」
4. **動作導向型**：「Ask Anything, Get Everything」

### 文案原則
- 以產品能力為主語，強調「做到什麼」
- 技術名詞搭配商業價值（edge storage → efficient surveillance）
- 句子簡潔，多用分詞結構（enabling, integrating）
- CTA 動詞導向：Explore, Discover, Get Started, Learn More

### 語氣
- 專業但不艱澀
- 技術準確但強調商業價值
- 自信但不誇大
- 參考 `context/brand-voice.md` 的完整規範

---

## 檔案輸出結構

```
outputs/marketing-content/[產品名]-landing-page/
  index.html              ← 完整 Landing Page
  assets/
    css/style.css          ← 樣式（如從 HTML 分離）
    images/                ← 生成的圖片
    logos/                 ← 使用的 Logo（從 style-references/logos/ 複製）
  content/
    copy-en.md             ← 英文文案備份
    copy-zh.md             ← 中文文案備份（如有）
    architecture.md        ← 架構提案紀錄
```
