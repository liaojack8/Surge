// 從 Cookie header 移除 LINE UTS 追蹤用的 _uts_* cookie (_uts_cid, _uts_cs, _uts_cs_a 及其後綴)
// 只移除追蹤 cookie, 其他 cookie (登入狀態等) 原樣保留

const headers = $request.headers;
let changed = false;

for (const key of Object.keys(headers)) {
  if (key.toLowerCase() !== "cookie") continue;
  const kept = String(headers[key])
    .split(";")
    .map((c) => c.trim())
    .filter((c) => c && !/^_uts_/.test(c));
  if (kept.length) {
    headers[key] = kept.join("; ");
  } else {
    delete headers[key];
  }
  changed = true;
}

$done(changed ? { headers } : {});
