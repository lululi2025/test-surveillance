# 【SOP】EnGenius Technology B2B 產品市場與競品研究作業程序

> 版本：v1.1 ｜ 建立日期：2026-03-20 ｜ 最後更新：2026-03-20 ｜ 負責人：Lulu

---

## 1. 目的與角色定義

- **角色定位**：你是 EnGenius Technology 的資深 B2B 產品行銷專家（Sr. Product Marketing Manager）。
- **任務目標**：根據提供的產品資訊，透過 Perplexity MCP 執行市場需求分析與競品對標，產出《市場與競品策略簡報》Markdown 文件。
- **品牌與產品背景**：請參照 `CLAUDE.md` 的「品牌核心原則」章節，不在此重複。

---

## 2. 啟動條件

### 2.1 輸入模板

每次啟動研究前，使用者需提供以下資訊：

```
產品名稱：___
產品類別：網路 / 安防 / 伺服器 / 通訊 / 電源
產品規格文件（選填）：context/product-specs/___
指定競品（選填）：___
重點關注面向（選填）：定價 / 功能 / 市場趨勢 / 全面分析
```

### 2.2 工具使用原則

- **必須**透過 Perplexity MCP 取得最新市場資料，不可僅依賴 AI 訓練資料。
- 不同步驟使用不同的 Perplexity 工具（見下方各 Step 標註）。
- 策略分析步驟（Step 3）不需呼叫 MCP，基於前兩步結果推導即可。

### 2.3 Perplexity 工具速查表

| 工具 | 用途 | 對應步驟 | 注意事項 |
|------|------|----------|----------|
| `perplexity_research` | 深度多來源研究 | Step 1 | 耗時 30 秒以上，回傳量大（可達 50KB+），適合市場總覽 |
| `perplexity_search` | 精準搜尋特定資料 | Step 2 | 可同時發出多個查詢（產品規格 / 競品定價分開搜），速度較快 |
| `perplexity_ask` | 快速問答 | 補充查詢 | 適合針對單一事實確認（如「某產品是否 NDAA 合規」） |
| `perplexity_reason` | 邏輯推理與比較 | 選用 | 適合需要跨來源交叉分析的複雜比較題 |

> **執行技巧**：Step 1 和 Step 2 可以**平行發出**（同時呼叫 `perplexity_research` + 多個 `perplexity_search`），大幅縮短總耗時。

---

## 3. 執行步驟

### Step 1：市場需求與趨勢分析

> **工具**：`perplexity_research`（深度多來源彙整，耗時約 30 秒以上）

搜尋該產品領域的最新市場報告、技術論壇討論（如 Reddit r/networking、r/sysadmin、ServeTheHome 等）與媒體報導。

**1.1 總體市場環境**
- 該產品分類的市場現況、規模趨勢與增長驅動力。

**1.2 目標受眾與痛點（ICP & Pain Points）**
- 決策者是誰（IT 主管 / 採購 / MSP）？使用者是誰？
- 條列客戶目前的 Top 3 真實痛點。

**1.3 採購驅動力（Buying Triggers）**
- 促使企業客戶尋求此解決方案的觸發事件（如：設備老化、合規要求、遠端管理需求等）。

### Step 2：競品情資收集與解構

> **工具**：`perplexity_search`（精準搜尋特定 datasheet、定價、評測）
>
> 針對 2–3 家主要競品，分別搜尋其官方 Datasheet、白皮書、經銷商報價與使用者評價。

**2.1 規格與功能對標（Feature Matrix）**

依產品類別建立對比重點：

| 產品類別 | 對比重點 |
|----------|----------|
| 網路設備 | Wi-Fi 標準、頻段、最大 AP 數、PoE 預算、雲端管理功能 |
| 安防監控 | 解析度、AI 分析功能、儲存方式、VMS 整合 |
| 伺服器/資料中心 | CPU/RAM 規格、擴充性、管理介面 |
| 通訊設備 | SIP 支援、通話容量、整合能力 |
| 電源管理 | 插座數、遠端管理、環境監控、串接能力 |

**2.2 商業模式與定價（Pricing & Licensing）**
- 精準列出競品的定價策略（硬體售價 + 軟體/雲端授權費）。
- 估算 3–5 年 TCO（Total Cost of Ownership），特別標註隱藏的雲端授權費。
- 若無法取得最新報價，標註「⚠️ 需由業務端確認」，**不可捏造數據**。
- 同一產品建議搜尋 EnGenius 自家 datasheet 確認規格（用 `perplexity_search` 搜 `EnGenius [型號] datasheet specifications`）。

### Step 3：EnGenius 競爭優勢定位

> **工具**：無需呼叫 MCP。基於 Step 1 + Step 2 的結果進行策略推導。
>
> 若 `context/product-specs/` 有該產品規格文件，請先讀取作為分析依據。

**3.1 價值主張（Value Proposition）**
- 結合 EnGenius 核心優勢定義價值主張：
  - 單一 EnGenius Cloud 平台統一管理全產品線
  - 免雲端授權費（Zero Licensing Fee）
  - 跨產品線整合綜效（Cross-sell：網路 + 安防 + 電源）
  - AI 驅動的智慧管理與分析

**3.2 SWOT 分析**
- S / W / O / T 各 1–2 點關鍵精華，避免流水帳。

**3.3 攻防腳本（Battle Card）**
- **How to Win**：遇到競品 X 時，我們的突圍話術。
- **How to Defend**：客戶質疑我們弱勢時的回應策略。

### Step 4：策略文件產出

> **格式**：Markdown 文件，以簡報 Slide 結構組織，方便後續轉製 PPTX。

將分析結果整理為以下結構：

```
## Slide 1: Executive Summary
- 產品定位一句話（Elevator Pitch）
- 市場機會與 EnGenius 核心勝率總結

## Slide 2: Market Overview & ICP
- 總體趨勢重點（3 個 Bullet points）
- 目標客群畫像與 Top 3 痛點

## Slide 3: Competitive Landscape
- Markdown 表格：EnGenius vs 2–3 家競品
- 欄位：規格重點 / 雲端管理 / 定價 / 3 年 TCO / 授權模式

## Slide 4: SWOT Analysis
- S / W / O / T 各 1–2 點

## Slide 5: Battle Card & GTM Strategy
- Top 3 USPs
- 攻擊腳本（vs 各競品）
- 防禦腳本（應對常見質疑）
```

---

## 4. 品質控管

| 檢查項目 | 要求 |
|----------|------|
| 資訊時效性 | 所有市場數據與定價須為 MCP 即時搜尋結果，非訓練資料 |
| 數據誠實度 | 找不到的資料標註「⚠️ 需進一步確認」，不可捏造。實測顯示 Meraki 等大廠精確定價較難公開取得，務必誠實標註 |
| TCO 突顯 | Slide 3 與 Slide 5 必須強調 EnGenius 無隱藏授權費優勢 |
| 規格準確性 | EnGenius 產品規格以 `context/product-specs/` 文件為準，不可僅依賴搜尋結果 |
| 來源標註 | 關鍵數據需附上資料來源（URL 或報告名稱） |
| 待確認清單 | 文件末尾須彙整所有標註「⚠️」的待確認事項，方便業務端逐項補齊 |

---

## 5. 輸出規範

### 5.1 檔案存放

| 檔案類型 | 路徑 | 命名規則 |
|----------|------|----------|
| 策略文件（主要產出） | `data/market-research/` | `[產品名]-[YYYY-MM-DD].md`<br>例：`ECW336-2026-03-20.md` |
| 簡報版本（需要時轉製） | `outputs/marketing-content/` | `[產品名]-strategy-deck.pptx` |

### 5.2 文件 Frontmatter

每份產出文件開頭須包含：

```yaml
---
product: [產品名稱]
category: [產品類別]
competitors: [競品列表]
date: [YYYY-MM-DD]
status: draft / reviewed / final
---
```

---

## 6. 實測心得與最佳實踐

> 以下為 2026-03-20 以 ECC120 實際測試本 SOP 後的經驗紀錄。

### 6.1 執行效率

- Step 1（`perplexity_research`）+ Step 2（多個 `perplexity_search`）可**平行發出**，總耗時約 40–60 秒
- `perplexity_research` 單次回傳可達 50KB+，資訊量非常充足，通常一次即可涵蓋 Step 1 所有子項
- Step 2 建議拆成 2–3 個獨立搜尋（自家產品規格 + 競品比較 + 競品定價），比一個大查詢更精準

### 6.2 常見限制

| 限制 | 應對方式 |
|------|----------|
| 競品精確定價（尤其 Meraki）難以公開取得 | 標註「⚠️ 需由業務端確認」，引用區間估計 |
| EnGenius 自家產品定價通常非公開 | 不寫具體數字，以相對定位描述（如「對標 UniFi 區間」） |
| PDF 規格書可能無法直接讀取 | 用 `perplexity_search` 搜尋線上版 datasheet 作為備案 |
| 部分合規資訊（NDAA/TAA）搜尋結果不一致 | 列為待確認事項，由產品團隊提供官方資訊 |

### 6.3 產出品質檢核

首次測試產出的 `ECC120-2026-03-20.md` 涵蓋：
- ✅ 5 張 Slide 結構完整
- ✅ 競品對標矩陣含規格 + TCO
- ✅ 攻防腳本含具體數字與話術
- ✅ 待確認事項已彙整於文件末尾
- ✅ 資料來源已標註
