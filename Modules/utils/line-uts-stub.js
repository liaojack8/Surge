// 以空殼取代 LINE UTS 追蹤 SDK (static.line-scdn.net/uts/.../uts.js)
// 直接擋掉 uts.js 會讓官方帳號頁面因 uts 未定義而出錯, 回傳空白也一樣
// 這裡回傳一個 no-op 的 uts: 任何屬性/呼叫都回傳自己, 不寫 cookie / localStorage, 不送任何資料
// 有傳 callback 的 send* 呼叫會非同步回呼, 避免頁面等待 callback 卡住 (例如點擊後才跳轉)

const stub = `var uts=(function(){
var p;
var f=function(){
var a=arguments,cb=a.length&&a[a.length-1];
if(typeof cb==="function")setTimeout(function(){try{cb()}catch(e){}},0);
return p};
p=new Proxy(f,{
get:function(t,k){
if(k===Symbol.toPrimitive)return function(){return ""};
if(k==="then"||k==="toJSON")return undefined;
return p},
apply:function(t,s,a){return f.apply(s,a)},
construct:function(){return p}});
return p})();`;

$done({
  response: {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: stub,
  },
});
