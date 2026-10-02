# Jack's Surge Rules

> LINE 系列模組皆需啟用 MitM over HTTP/2, 三個模組可各自選用, 不必同時安裝

[LINE 去廣告 + 隱私](https://github.com/liaojack8/Surge/blob/master/Modules/LINE-ADs.sgmodule?raw=true)
```
https://github.com/liaojack8/Surge/blob/master/Modules/LINE-ADs.sgmodule?raw=true
```
- 以 [jkgtw 版本](https://github.com/jkgtw/Surge/blob/master/Modules/LINE-ADs.sgmodule) 為基礎, 補上舊版的 OBS 廣告素材、LINE 購物推薦等規則
- 阻擋主頁 / 錢包分頁的廣告與推廣圖 (`lcp-prod-obs`、`vos` landpress 素材), 錢包分頁會留下空白的推廣框
- 阻擋 UTS / NELO2 / CIX 等遙測與分析
- 需啟用腳本:
  - UTS 分析 SDK (`uts.js`) 以空殼取代, 直接擋掉會讓官方帳號頁面出現 `Application error`
  - 官方帳號頁面 (`page.line.me`) 移除 LINE 自家的追蹤 cookie (`_uts_*`、`_ldbrbid`、`_trmccid`、`ldsuid`、`A`、`XA`), 第三方追蹤 cookie 交由通用去廣告模組處理

[把LINE VOOM / 逛逛 擋起來](https://github.com/liaojack8/Surge/blob/master/Modules/LINE-Kill-VOOM.sgmodule?raw=true)
```
https://github.com/liaojack8/Surge/blob/master/Modules/LINE-Kill-VOOM.sgmodule?raw=true
```
- 封鎖 VOOM 影片、推薦 / 追蹤動態、搜尋, 保留好友與官方帳號的貼文串 (需自行點進頁面才看得到)
- 封鎖取代 VOOM 的「逛逛 (Discover)」電商分頁 (`/EXT/ectab/`、GCS 內容模組) 及逛逛賺點數回報
- 整個封鎖 LINE 購物、LINE 旅遊的圖片 (`buy-obs`、`shopping`、`travel-tw`), 有使用這兩個服務請勿安裝
- 逛逛分頁會一直轉圈, 這是 LINE 本身的重試設計 (斷網時也一樣), 無法透過網路規則解決

[去除LINE TODAY的興趣追蹤與留言](https://github.com/liaojack8/Surge/blob/master/Modules/LINE-TODAY-NoTrace.sgmodule?raw=true)
```
https://github.com/liaojack8/Surge/blob/master/Modules/LINE-TODAY-NoTrace.sgmodule?raw=true
```
- 瀏覽 LINE TODAY 時移除登入狀態 (cookie、LIFF token), 阻擋閱讀紀錄、興趣追蹤與留言互動
- 阻擋 LINE 網頁廣告 SDK, 但放行 `lineads/.../loader.js`, 避免 LINE Points 等頁面載入失敗
- 需啟用重寫 Header

[Talkatone 台灣分流 + 去廣告](https://github.com/liaojack8/Surge/blob/master/Modules/talkatone-tw.sgmodule?raw=true)
```
https://github.com/liaojack8/Surge/blob/master/Modules/talkatone-tw.sgmodule?raw=true
```
- 中華電信固網連不上 Talkatone, 本模組將 Talkatone 流量以 `CELLULAR-ONLY` 強制走行動網路, Wi-Fi 下也能登入與通話
- 使用時需開啟行動數據, 並允許 Surge 使用行動網路
- Talkatone 相關網域改用公共 DNS (8.8.8.8) 解析, 避免 Wi-Fi 下經行動網路查詢路由器 DNS 而 timeout
- 更新模組後請一併至「外部資源」更新 `talkatone.list` 規則集

[ADList-217heidai](https://github.com/liaojack8/Surge/blob/master/Modules/ADList-217heidai.sgmodule?raw=true)
```
https://github.com/liaojack8/Surge/blob/master/Modules/ADList-217heidai.sgmodule?raw=true
```

[巴哈姆特簽到腳本](https://github.com/jimmyorz/Surge/raw/master/BahamutDailyBonus.sgmodule)（安裝前請先閱讀模組內容）
```
https://github.com/jimmyorz/Surge/raw/master/BahamutDailyBonus.sgmodule
```
- 或參考 https://www.jkg.tw/p3603/ 手動設定

[ADList](https://raw.githubusercontent.com/jkgtw/Surge/master/Modules/ADList.sgmodule)
```
https://raw.githubusercontent.com/jkgtw/Surge/master/Modules/ADList.sgmodule
```

[PTT 跳過年齡驗證](surge:///install-module?url=https://kinta.ma/surge/modules/ptt.sgmodule)
```
https://kinta.ma/surge/modules/ptt.sgmodule
```

[PTT Imgur 修正](https://kinta.ma/surge/modules/ptt_imgur_fix.sgmodule)
```
https://kinta.ma/surge/modules/ptt_imgur_fix.sgmodule
```