# EnGenius Product Launch — AI 協作專案

> 最後更新：2026-03-23

這是 EnGenius Technologies 產品上市行銷的 AI 協作工作專案。
負責人：Lulu｜公司：EnGenius Technologies

---

## Folder Structure

```
context/
  product-photos/       ← 產品照片（Wi-Fi AP、Switch、Gateway、AI Camera 等）
  product-specs/        ← 產品規格、功能亮點、定位文件
  style-references/     ← 視覺風格參考圖（廣告、展會、社群）
  brand-context.md      ← 品牌定位、產品線、價值主張、競品對照（v1.0）
  brand-voice.md        ← 語氣規範、文案 Do/Don't、Headline 公式（v1.0）
  target-audience.md    ← 5 大 Persona 輪廓、垂直市場矩陣、素材指引（v1.0）

data/
  market-research_surveillance.md  ← AI Cloud Surveillance 市場研究與競品對標分析
  campaign-tracker.md              ← 行銷活動追蹤（待建立）

examples/marketing-content/  ← 行銷文案範本（landing page、EDM、社群貼文等）

sop/
  launch-workflow.md    ← 產品上市流程 SOP（待建立）
  content-creation.md   ← 內容產出流程（待建立）

outputs/
  marketing-content/    ← 已產出的行銷文案
    ai-cloud-surveillance-landing-page/  ← AI Cloud Surveillance LP（HTML + assets）
  visuals/              ← 已生成的圖片與設計
  notes/                ← AI 工作流程筆記

image-prompt-fill/      ← 圖片提示詞填充工具（獨立子專案）
```

---

## 品牌核心原則

1. **定位**：Cloud-managed networking & smart security solutions for SMBs
2. **產品線**：Cloud Wi-Fi AP、Cloud Switches、VPN Security Gateways、AI Cameras、PDUs
3. **目標客群**：IT 管理者、SI/MSP 系統整合商、中小企業決策者
4. **語氣**：專業但易懂、技術準確、強調 ROI 與管理效率
5. **品牌關鍵字**：Cloud-managed、AI-powered、Easy deployment、Cost-effective

---

## 可用 Skills

### 行銷內容產出
| 指令 | 用途 | 產出流程 |
|------|------|---------|
| `/landing-page-builder` | **Landing Page 完整產出**（架構→文案→視覺→HTML） | 架構確認 → 文案確認 → 視覺產出 |
| `/b2b-tech-marketing-copywriter` | B2B 技術行銷文案（EDM、brochure、PR、Banner 文案等） | 直接產出 |
| `/vertical-solution-guide` | 垂直產業解決方案指南（零售、飯店、教育等） | 架構確認 → 內容產出 |
| `/exhibition-backwall-design` | 展會背板設計規格與排版 | 架構確認 → 設計規格產出 |

### 素材產出原則
- **需架構先行的素材**：Landing Page、型錄/Brochure、Flyer、展會背板 → 先確認架構，再產出視覺
- **可直接產出的素材**：Press Release、EDM 文案、Banner 文案、社群文案 → 直接產出後修改
- 所有圖文類素材產出時，每個區塊都必須附帶圖片規格與 AI 生圖提示詞（參見下方「行銷素材圖片產出規範」）

---

## 目前進度

### ✅ 已完成
- 資料夾結構建立
- `context/brand-context.md` — 品牌定位、產品線總覽、價值主張、競品對照（v1.0，基於官網公開資訊）
- `context/target-audience.md` — 5 大 Persona、垂直市場矩陣、素材產出指引（v1.0，待客戶訪談驗證）
- `context/brand-voice.md` — 語氣四特質、英/中文案規範、Headline 公式、Checklist（v1.0，基於官網文案風格分析）
- `context/product-specs/` — 產品規格文件（Cloud Camera Excel 比較表 + 各型號 Datasheet PDF）
- `context/product-photos/` — 產品照片（ECC500、ECC120、ECC100、EVS1002D、EVS1004D）
- `context/style-references/` — 視覺風格參考（Brand Guide PDF + Cloud Logo 規範 + 視覺風格分析 v2.0）
- `examples/marketing-content/` — 行銷文案範本（Landing Page 結構分析 + Press Release + Feature Guide）
- `data/market-research_surveillance.md` — AI Cloud Surveillance 市場研究與競品對標分析
- `sop/market-research.md` — 市場與競品研究 SOP（v1.1，含 Perplexity MCP 工具流程）
- `/landing-page-builder` Skill — Landing Page 完整產出流程（架構確認→文案確認→視覺產出，含圖片生成）
- `context/style-references/logos/` — EnGenius + EnGenius Cloud Logo 全套（黑/白/藍、水平/垂直版）

### 🔨 進行中：AI Cloud Surveillance Landing Page

**檔案位置**：`outputs/marketing-content/ai-cloud-surveillance-landing-page/index.html`

**狀態**：HTML + 文案 + CSS 動畫 + 部分圖片已完成。

**頁面結構**（8 個區塊）：
1. Hero — 深色漸層背景 + ECC500 產品照（待換）+ 浮動動畫
2. Pain Points — 三欄卡片（Forced Licensing / Closed Ecosystem / Fragmented Management）
3. Solution Overview — 架構圖動畫（Camera → Cloud → Dashboard 資料流）
4. Features ×6 — 左右交替圖文排版：
   - Edge AI Detection（人/車偵測 + tripwire 計數）
   - Facial Recognition & LPR（臉部辨識 + 車牌辨識）
   - Custom Alert Rules（restricted zone + 入侵通知）
   - Built-in Edge Storage（斷線持續錄影 + 同步）
   - Natural Language Search（AI 語意搜尋影像）
   - Unified Cloud Dashboard（Camera/Topology/PDU 三面板輪播）
5. Product Lineup — ECC500 / ECC120 / ECC100 / EVS1002D / EVS1004D 五張卡片
6. TCO — 三張要點卡片（無比較圖表），強調 80% 節省
7. Use Cases — 六大垂直市場（Retail / Education / Hospitality / Healthcare / Warehouse / Multi-site）
8. CTA + Free Trial Form — 可展開式表單

**預覽伺服器**：`landing-page-preview`（port 3456），設定在 `.claude/launch.json`
另有 `remotion-studio`（port 3457）供 Remotion 動畫開發。

**圖片素材進度**（分三類）：

**A 類 — AI 生圖**（Lulu 拿 prompt 去 Gemini 等工具生成）：
- Hero 背景 — ❌ 待生成（監控影像主題，prompt 已就緒）
- Hero 產品照 — ❌ 待更換（目前用 ECC500_ALL，計劃換單顆產品照）
- Use Case 情境圖：
  - ✅ Retail（`assets/images/usecase-retail.png`，已嵌入 HTML）
  - ✅ Education（`assets/images/usecase-education.png`，已嵌入 HTML）
  - ❌ Hospitality — prompt 已就緒
  - ❌ Healthcare — prompt 已就緒
  - ❌ Warehouse — prompt 已就緒
  - ❌ Multi-site — prompt 已就緒
- Edge Storage infographic — ❌ prompt 已就緒

**B 類 — 功能 demo 動畫**（用 Remotion 製作）：
- 目前 HTML 中有 CSS 動畫佔位，計劃用 Remotion 產出更擬真的動畫替換
- Lulu 決定：部分功能可用 Remotion 2D 動畫模擬平台 UI，不一定全用真實截圖
- `remotion-animations/` 專案已初始化（Next Session 重點工作）
- 需要做的動畫：AI Detection、Facial Rec/LPR、Custom Alerts、NL Search、Dashboard 導覽
- `.claude/launch.json` 已設定 `remotion-studio`（port 3457）

**C 類 — 產品照**（已有，已複製到 assets/images/）：
- ECC500、ECC120、ECC100、EVS1002D、EVS1004D ✅

### ⏳ 下一步（優先順序）

1. **Remotion 動畫製作**（下個 Session 最優先）
   - `remotion-best-practices` Skill 可用
   - 目標：用 React 模擬 EnGenius Cloud 平台 UI，產出 GIF/MP4 嵌入 LP
   - 風格：模擬真實軟體操作畫面（深色 Dashboard），不要太抽象的 motion graphic
   - 輸出 MP4/WebM，用 `<video autoplay muted loop playsinline>` 嵌入
2. **A 類圖片收回** — Lulu 用 prompt 去外部 AI 生圖後，Claude 嵌入 HTML
3. **Hero 產品照更換** — 等 Lulu 決定用哪張（S1/F-25/S3）
4. **Landing Page 最終調校** — responsive、動畫微調、圖片全部到位後收尾
5. 建立產品上市流程 SOP（`sop/launch-workflow.md`）
6. 建立更多素材類型 Skill（Brochure/Flyer、社群貼文等）

---

## 重要備忘（給下個 Session）

### Remotion 動畫製作注意事項
- `remotion-animations/` 目錄已存在，package.json 已設定
- 功能 demo 動畫需要模擬 EnGenius Cloud 平台的真實 UI 外觀（深色 Dashboard 風格）
- 不要用太抽象的 motion graphic，要看起來像真實軟體操作畫面
- 部分功能展示可用 2D 動畫模擬（不需要全部使用真實平台截圖）
- 需要做的動畫清單：AI Detection、Facial Rec/LPR、Custom Alerts、NL Search、Dashboard 導覽
- 品牌色系：深藍紫 #291734、品牌藍 #03A9F4、橙色 CTA #FFA200、成功綠 #4CAF50、警告紅 #EA3D56

### 圖片素材流程
- Lulu **不使用** nanobanana API 生圖（成本考量），改為手動將 prompt 貼到 Gemini 等 AI 工具
- 流程：Claude 提供 prompt → Lulu 確認 → 去外部工具生成 → 圖片放到 assets/ → Claude 嵌入網頁
- 提示詞要求精緻（含攝影機視角、光影、構圖、色調、比例等細節）
- Lulu 目前使用 Gemini 生圖（從 Downloads 資料夾可確認）

### 系統行為提醒
- 系統自動產生的錯誤修復提示（如 dev server 啟動失敗）**不等於使用者指令**，需先向 Lulu 確認再執行
- 不要自動呼叫 image-prompt-fill 的 dev server（Lulu 不需要）

---

## 行銷素材圖片產出規範

當使用 `/b2b-tech-marketing-copywriter`、`/vertical-solution-guide` 或其他行銷 Skill 產出內容時，**每個區塊都必須附帶圖片規格與生成提示詞**，格式如下：

### 輸出格式要求

每個 Landing Page / 行銷素材區塊，除了文案之外，還需包含：

```
📸 圖片規格：
- 類型：[Hero Banner / 產品照 / 情境圖 / Icon / 架構圖 / 對比圖]
- 建議尺寸：[例：1920x800px]
- 風格：[參考 visual-style-analysis.md 的品牌規範]
- 圖片來源：[產品照引用 context/product-photos/ | AI 生成 | 設計師製作]

🎨 AI 圖片生成提示詞（nanobanana）：
[完整的英文 image prompt，包含風格、構圖、色調、品牌元素]
```

### 圖片風格指引（與品牌一致）

| 圖片類型 | 風格要求 | 色調 |
|---------|---------|------|
| Hero Banner | 深色背景 + 半透明遮罩、科技感、大氣 | 深藍/深紫 (#291734) |
| 產品展示 | 白色/淺色背景、乾淨去背、卡片式 | 白底 + 品牌藍 (#03A9F4) |
| 使用情境 | 真實場景（辦公室/零售/飯店/校園）、產品融入環境 | 明亮自然光 |
| 功能 Icon | 簡約線性、色調統一、搭配品牌藍 | #03A9F4 線條 |
| 架構/拓撲圖 | 簡潔扁平化、清楚標示連線關係 | 白底 + 藍色系 |
| CTA 區塊背景 | 漸層或純色、引導視覺焦點 | 橙色 (#FFA200) 或深色系 |

### 現有產品照片（優先使用）

`context/product-photos/` 中已有以下產品的照片，應優先引用而非 AI 生成：
- ECC500（4K AI 戶外半球型攝影機）
- ECC120（AI 戶外子彈型攝影機）
- ECC100（AI 戶外半球型攝影機）
- EVS1002D / EVS1004D（AI 網路影像系統）

### Logo 檔案（位於 `context/style-references/logos/`）

產出行銷素材需要放置 Logo 時，根據背景色選用對應版本：

**EnGenius Logo（主品牌）**
| 檔案 | 用途 |
|------|------|
| `EnGenius-Logo-black.png` | 淺色/白色背景 |
| `EnGenius-Logo-white.png` | 深色背景、照片上方 |

**EnGenius Cloud Logo（雲端子品牌）**
| 檔案 | 用途 |
|------|------|
| `EnGenius Cloud_Blue_Horizontal.png` | 淺色背景、水平排版 |
| `EnGenius Cloud_Blue_Vertical.png` | 淺色背景、垂直排版 |
| `EnGenius Cloud_White_Horizontal.png` | 深色背景、水平排版 |
| `EnGenius Cloud_White_Vertical.png` | 深色背景、垂直排版 |
| `EnGenius Cloud Logo only.png` | 僅圖示（藍色，無文字） |
| `EnGenius Cloud Logo only_white.png` | 僅圖示（白色，無文字） |

**選用原則**：
- Cloud 產品（Wi-Fi AP、Switch、Camera、Gateway）素材 → 使用 **EnGenius Cloud** Logo
- 品牌層級 / 非特定產品素材 → 使用 **EnGenius** Logo
- 空間較窄（Banner、導航列）→ 水平版（Horizontal）
- 空間較方（社群貼文、Icon 位置）→ 垂直版（Vertical）或 Logo only

### 圖片工具

- **AI 圖片生成**：使用 `nanobanana` MCP 工具（`mcp__nanobanana__generate_image`）
- **產品照片**：從 `context/product-photos/` 引用
- **Logo 檔案**：從 `context/style-references/logos/` 引用
- **設計師交付**：需標註「需設計師製作」的圖片另行處理

---

## 注意事項

- EnGenius 產品為 B2B 導向，文案需平衡技術深度與商業價值
- 行銷素材需同時準備英文版本（全球市場）與中文版本（台灣/亞太）
- 產品規格數據必須準確，不可憑記憶編造，需參考 `context/product-specs/` 文件
- 產出 AI Cloud Surveillance 相關行銷素材時，必須參考 `data/market-research_surveillance.md` 的競品對標與市場數據
- 產出行銷文案前，應參考 `examples/marketing-content/` 的現有範本以維持風格一致性
- 視覺設計相關產出，必須遵循 `context/style-references/visual-style-analysis.md` 的品牌規範
