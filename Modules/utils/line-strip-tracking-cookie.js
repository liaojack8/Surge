// 從 Cookie header 移除 LINE 自家的追蹤 cookie, 其他 cookie (登入狀態、LIFF 狀態等) 原樣保留
// 第三方 (GA / Facebook / Google Ads 等) 交由通用去廣告模組處理
//
// _uts_*    LINE UTS 分析 SDK 的 client / session ID (_uts_cid, _uts_cs, _uts_cs_a 及其後綴)
// _ldbrbid  LINE Tag (廣告轉換追蹤) 的瀏覽器 ID
// _trmccid  追蹤用 client ID
// ldsuid    伺服器端發放的訪客 ID (nginx userid 格式)
// A, XA     LY Corp (Yahoo 系) 瀏覽器 ID

const BLOCKED = /^(?:_uts_[^=]*|_ldbrbid|_trmccid|ldsuid|A|XA)$/;

const headers = $request.headers;
let changed = false;

for (const key of Object.keys(headers)) {
  if (key.toLowerCase() !== "cookie") continue;
  const cookies = String(headers[key])
    .split(";")
    .map((c) => c.trim())
    .filter(Boolean);
  const kept = cookies.filter((c) => !BLOCKED.test(c.split("=")[0].trim()));
  if (kept.length === cookies.length) continue;
  if (kept.length) {
    headers[key] = kept.join("; ");
  } else {
    delete headers[key];
  }
  changed = true;
}

$done(changed ? { headers } : {});
