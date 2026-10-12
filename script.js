(function(){
var DATA={"series": {"s1": {"name": "طقم جاكت ستريبس", "price": 2200, "items": [0, 1]}, "s2": {"name": "طقم نص سوستة ستريبس", "price": 2200, "items": [7, 8, 9]}, "s3": {"name": "طقم برنت مريح", "price": 1900, "items": [2, 3, 4, 5, 6]}, "s4": {"name": "طقم نص سوستة بحواف", "price": 2000, "items": [10, 11, 12, 13, 14, 15, 16]}}, "col": {"0": ["بنفسجي", "#4a2468"], "1": ["أحمر عنابي", "#8f1d33"], "2": ["رمادي فاتح", "#c9c9cf"], "3": ["رمادي", "#8c8f96"], "4": ["أزرق", "#5b82c7"], "5": ["تركواز", "#6fa6ae"], "6": ["كحلي", "#1e2f55"], "7": ["وردي قديم", "#d58a85"], "8": ["أخضر مينت", "#a7c4a5"], "9": ["أخضر غامق", "#2f5236"], "10": ["رمادي بخط وردي", "#6b6e75"], "11": ["زيتي", "#4b5a3a"], "12": ["نبيتي", "#6b1a3a"], "13": ["كحلي غامق", "#1c2a52"], "14": ["عسلي", "#c4802d"], "15": ["أسود بخط وردي", "#1a1a1a"], "16": ["بنفسجي غامق", "#3c2352"]}, "sizes": ["S", "M", "L", "XL", "XXL"]};
var IG="https://www.instagram.com/rose.valley.homewear/",WA="";
var SER=DATA.series,COL=DATA.col,K2S={};
Object.keys(SER).forEach(function(s){SER[s].items.forEach(function(k){K2S[k]=s})});
function $(i){return document.getElementById(i)}
function fmt(n){return n.toLocaleString("en-US")+" ج.م"}

/* hero slideshow */
var slides=[].slice.call(document.querySelectorAll(".slide")),hd=[].slice.call($("hdots").children),si=0,timer=null;
var still=window.matchMedia&&window.matchMedia("(prefers-reduced-motion:reduce)").matches;
function go(n){si=(n+slides.length)%slides.length;slides.forEach(function(s,i){s.classList.toggle("on",i===si)});hd.forEach(function(b,i){b.classList.toggle("on",i===si)})}
function start(){if(still)return;stop();timer=setInterval(function(){go(si+1)},6500)}
function stop(){clearInterval(timer)}
hd.forEach(function(b,i){b.onclick=function(){go(i);start()}});
$("hero").addEventListener("mouseenter",stop);$("hero").addEventListener("mouseleave",start);
start();

/* scroll reveal */
var rv=[].slice.call(document.querySelectorAll(".rv"));
if("IntersectionObserver" in window){
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12});
  rv.forEach(function(e){io.observe(e)});
}else rv.forEach(function(e){e.classList.add("in")});

/* quick view */
var dlg=$("pv"),cur=0,size=null,opener=null;
if(!dlg.showModal){dlg.showModal=function(){dlg.setAttribute("open","")};dlg.close=function(){dlg.removeAttribute("open");dlg.dispatchEvent(new Event("close"))}}
function imgOf(k){return document.querySelector('.imgw[data-k="'+k+'"] img').src}
function setColor(k){
  cur=k;var s=SER[K2S[k]];
  $("pvi").src=imgOf(k);$("pvi").alt=s.name+" "+COL[k][0];
  $("pvt").textContent=s.name;$("pvp").textContent=fmt(s.price);$("pvc").textContent=COL[k][0];
  [].forEach.call($("sw").children,function(b){b.setAttribute("aria-pressed",String(+b.dataset.k===k))});
}
function openQV(k,btn){
  opener=btn;var s=SER[K2S[k]];size=null;
  $("pvs").textContent="اختاري مقاسك";$("hint").className="hint";
  $("hint").textContent="هنجهّزلك رسالة الطلب بالطقم واللون والمقاس، وتبعتيها لنا على إنستجرام.";
  $("sw").innerHTML="";
  s.items.forEach(function(c){var b=document.createElement("button");b.type="button";b.dataset.k=c;b.style.background=COL[c][1];b.setAttribute("aria-label",COL[c][0]);b.onclick=function(){setColor(c)};$("sw").appendChild(b)});
  $("sz").innerHTML="";
  DATA.sizes.forEach(function(z){var b=document.createElement("button");b.type="button";b.textContent=z;b.setAttribute("aria-pressed","false");b.onclick=function(){size=z;$("pvs").textContent=z;$("hint").className="hint";[].forEach.call($("sz").children,function(x){x.setAttribute("aria-pressed",String(x===b))})};$("sz").appendChild(b)});
  setColor(k);dlg.showModal();document.body.style.overflow="hidden";
}
[].forEach.call(document.querySelectorAll(".imgw"),function(b){b.addEventListener("click",function(){openQV(+b.dataset.k,b)})});
dlg.addEventListener("close",function(){document.body.style.overflow="";if(opener)opener.focus()});
dlg.addEventListener("click",function(e){if(e.target===dlg)dlg.close()});
$("pvx").onclick=function(){dlg.close()};
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&dlg.hasAttribute("open"))dlg.close()});
var tt;function toast(m){var t=$("toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){t.classList.remove("on")},4200)}
$("ord").onclick=function(){
  if(!size){$("hint").textContent="اختاري المقاس الأول عشان نكمّل الطلب.";$("hint").className="hint err";$("sz").firstChild.focus();return}
  var s=SER[K2S[cur]];
  var msg="أهلاً Rose Valley، عايزة "+s.name+" لون "+COL[cur][0]+" مقاس "+size+" ("+fmt(s.price)+")";
  if(WA){window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(msg),"_blank","noopener");return}
  var ok=function(){toast("اتنسخت رسالة الطلب. الصقيها في محادثتنا على إنستجرام.")};
  try{navigator.clipboard.writeText(msg).then(ok,function(){toast(msg)})}catch(x){toast(msg)}
  window.open(IG,"_blank","noopener");
};

/* video */
var V=$("vid"),S=$("snd"),loaded=false;
function load(){
  if(loaded)return;loaded=true;
  V.poster="assets/poster.jpg";V.src="assets/video.mp4";
}
function play(){var p=V.play();if(p&&p.catch)p.catch(function(){})}
if(still){V.controls=true;S.hidden=true;load()}
else if("IntersectionObserver" in window){
  new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){load();play()}else V.pause()})},{threshold:.35,rootMargin:"300px 0px"}).observe(V);
}else{load();play()}
S.onclick=function(){load();V.muted=!V.muted;if(!V.muted){V.currentTime=0}play();S.textContent=V.muted?"شغّلي الصوت":"اكتمي الصوت"};
V.onclick=function(){V.paused?play():V.pause()};
})();
