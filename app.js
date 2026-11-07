// Trip data. Each fact lives here once; the subtitle, route strip, rail table and day pages are built from it.
// Cities in route order.
const CITIES={hk:{en:"Hong Kong",zh:"香港"},sz:{en:"Shenzhen",zh:"深圳"},gz:{en:"Guangzhou",zh:"广州"}};
// Rail connections for the Essentials table; a `leg` between neighbouring cities is also shown on the route strip.
const RAIL=[
  {from:"HK West Kowloon",to:"Shenzhen Futian",time:"~15 min",leg:"hk-sz"},
  {from:"Shenzhen Futian",to:"Guangzhou East",time:"~1.5–2 h",leg:"sz-gz"},
  {from:"Guangzhou East",to:"HK West Kowloon",time:"~1 h 50"},
  {from:"MTR East Rail",to:"Lok Ma Chau / Futian Checkpoint",time:"~45 min"}
];
// One entry per day, in order; day numbers come from the position. Plan items are [time, activity].
// `alt` lists swaps to pick from on the day (weather, energy, queues) without breaking the train times.
const DAYS=[
  {city:"hk",title:"Arrive in Hong Kong",plan:[
    ["11:30","Land at HKIA, Airport Express to Kowloon, taxi to the hotel in Tsim Sha Tsui East"],
    ["13:30","Late dim sum lunch at Spring Moon (The Peninsula) or T'ang Court (The Langham). Book ahead"],
    ["15:30","Tsim Sha Tsui promenade, Avenue of Stars, K11 Musea"],
    ["18:30","Star Ferry across to Central"],
    ["19:00","Roast goose dinner at Yung Kee, Wellington Street. Book ahead"],
    ["21:00","Star Ferry back; harbour lights from the Tsim Sha Tsui side"]],
   alt:["Dinner at Kam's Roast Goose, Wan Chai, instead of Yung Kee (no bookings, expect a queue)",
    "Rain: stay in Harbour City and K11 Musea, then dinner",
    "Too tired after the flight: dinner near the hotel and Temple Street night market"]},
  {city:"sz",title:"Hong Kong morning, train to Shenzhen",plan:[
    ["08:00","Dim sum breakfast at Luk Yu Tea House, Central"],
    ["09:45","Peak Tram up to Victoria Peak"],
    ["11:45","Roast goose lunch at Yat Lok, Stanley Street, Central (Michelin-starred, queue early)"],
    ["13:00","Collect bags, taxi to West Kowloon; be there 45 min early for joint immigration"],
    ["14:00","High-speed train West Kowloon → Futian (~15 min)"],
    ["14:45","Didi to the hotel in the Futian Free Trade Zone (~15 min), check in"],
    ["17:00","Lianhuashan Park, sunset over the Futian skyline"],
    ["19:00","Civic Center light show (usually weekend evenings; check the day's schedule)"],
    ["19:45","Dim sum and roast goose dinner at Laurel, Futian"]],
   alt:["Instead of the 14:00 train: MTR East Rail to Lok Ma Chau, walk across Futian Checkpoint; the hotel is about 10 min on foot",
    "Peak fogged in: Mid-Levels escalator, PMQ and Tai Kwun instead",
    "Swap the dinner for Dian Dou De (dim sum chain, branches across Futian)"]},
  {city:"sz",title:"Shenzhen sights",plan:[
    ["09:00","Morning dim sum at Tao Tao Ju or Dian Dou De"],
    ["10:30","Shenzhen Bay Park walk, then OCT Harbour"],
    ["13:00","Cantonese lunch at OCT Harbour or Coastal City"],
    ["15:00","Huaqiangbei electronics market"],
    ["17:30","Coco Park or MixC for a break"],
    ["19:00","Roast goose dinner at Fat Kee (Michelin Bib Gourmand), or The Bay by Chef Fei (two Michelin stars; book weeks ahead)"]],
   alt:["Theme day: Window of the World 10:00–15:00, then OCT Harbour",
    "Old Shenzhen: Nantou Ancient City, then Shekou Sea World",
    "Art: Dafen Oil Painting Village (allow a half day)",
    "Rain: Shenzhen Museum, Book City Central, MixC"]},
  {city:"gz",title:"Futian to Guangzhou East",plan:[
    ["09:00","Morning dim sum near the hotel"],
    ["10:30","Whichever of Huaqiangbei or Coco Park you skipped yesterday"],
    ["12:00","Check out, light lunch"],
    ["13:15","Didi to Futian station (~15 min), passports ready for the ticket gates"],
    ["14:00","Intercity train Futian → Guangzhou East (~1.5–2 h; pick a train with fewer stops)"],
    ["16:00","Taxi to the hotel in Tianhe (~10 min), check in"],
    ["17:45","Canton Tower at dusk"],
    ["19:30","Roast goose and Cantonese classics at Guangzhou Restaurant or Lei Garden"],
    ["21:00","Pearl River night cruise"]],
   alt:["Train sold out near 14:00: take the nearest Futian → Guangzhou East departure; avoid Guangzhou South, which is far from the hotel",
    "Skip the cruise: Huacheng Square and the Zhujiang New Town lights",
    "Dinner nearer the hotel: Cheungloi Cook, Huacheng Avenue (Michelin Bib Gourmand)"]},
  {city:"hk",title:"Guangzhou morning, back to Hong Kong",plan:[
    ["07:45","Morning tea at Tao Tao Ju (Dishifu Road original) or Panxi Restaurant, Liwan"],
    ["09:45","Shamian Island walk"],
    ["11:00","Back to the hotel, check out"],
    ["12:15","Light lunch; roast goose takeaway for the train"],
    ["13:30","Taxi to Guangzhou East (~15 min); be there 45 min early"],
    ["14:30","High-speed train Guangzhou East → West Kowloon (~1 h 50)"],
    ["16:45","Taxi to the hotel in Tsim Sha Tsui East, check in"],
    ["19:00","Roast goose dinner at Kam's Roast Goose or Joy Hing, Wan Chai"],
    ["20:30","Temple Street night market"]],
   alt:["Instead of Shamian Island: Chen Clan Ancestral Hall (Line 1), or Yuexiu Park and Beijing Road",
    "Want a slower morning: dim sum at Dian Dou De near the hotel, skip Liwan",
    "Tired on arrival: Hong Kong dinner in Tsim Sha Tsui and the harbour lights"]},
  {city:"hk",title:"Last morning and fly home",plan:[
    ["09:00","Check out; in-town check-in at Kowloon Station (check your airline allows it) so you're bag-free"],
    ["10:00","Central: Tai Kwun, PMQ, last shopping"],
    ["11:30","Trolley dim sum at Maxim's Palace, City Hall"],
    ["14:00","Taxi to Sham Tseng for Yue Kee roast goose, on the way to the airport"],
    ["16:00","At the airport, 2½–3 h before the evening flight"]],
   alt:["Short on time: skip Sham Tseng, roast goose at Yat Lok or Joy Hing and Airport Express from Hong Kong Station",
    "Rain: Harbour City and Elements, dim sum in Tsim Sha Tsui",
    "No in-town check-in: leave bags at the hotel and collect them on the way"]}
].map((d,i)=>({...d,n:i+1}));
// Flag copying slips in the data instead of rendering them silently wrong.
for(const d of DAYS){if(!CITIES[d.city])console.warn(`Day ${d.n}: unknown city "${d.city}"`);
  for(const[t]of d.plan)if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(t))console.warn(`Day ${d.n}: time "${t}" isn't HH:MM`)}

// Where to eat: the roast goose and dim sum stops from the day plans. `book`: true = reserve ahead, false = queue (no bookings).
const FOOD=[
  {city:"hk",name:"Yung Kee",area:"Central",what:"Roast goose",book:true,day:1},
  {city:"hk",name:"Spring Moon / T'ang Court",area:"Tsim Sha Tsui",what:"Dim sum",book:true,day:1},
  {city:"hk",name:"Luk Yu Tea House",area:"Central",what:"Dim sum",book:true,day:2},
  {city:"hk",name:"Yat Lok",area:"Central",what:"Roast goose",book:false,day:2},
  {city:"hk",name:"Kam's Roast Goose / Joy Hing",area:"Wan Chai",what:"Roast goose",book:false,day:5},
  {city:"hk",name:"Maxim's Palace",area:"City Hall, Central",what:"Dim sum",book:false,day:6},
  {city:"hk",name:"Yue Kee",area:"Sham Tseng",what:"Roast goose",book:true,day:6},
  {city:"sz",name:"Laurel",area:"Futian",what:"Dim sum and roast goose",book:true,day:2},
  {city:"sz",name:"Tao Tao Ju / Dian Dou De",area:"Futian",what:"Dim sum",book:false,day:3},
  {city:"sz",name:"Fat Kee",area:"Michelin Bib Gourmand",what:"Roast goose",book:true,day:3},
  {city:"sz",name:"The Bay by Chef Fei",area:"Two Michelin stars",what:"Cantonese",book:true,day:3},
  {city:"gz",name:"Guangzhou Restaurant / Lei Garden",area:"Tianhe",what:"Roast goose",book:true,day:4},
  {city:"gz",name:"Cheungloi Cook",area:"Huacheng Avenue",what:"Cantonese",book:true,day:4},
  {city:"gz",name:"Tao Tao Ju / Panxi",area:"Liwan",what:"Morning tea",book:false,day:5}
];
// Before-you-go list. Ticks are saved in this browser only.
const CHECKLIST=[
  "Book the three train legs on 12306 as soon as sales open (about 15 days ahead), with all passports",
  "Confirm each room's bed setup for three in writing",
  "Book the restaurants marked \"Book ahead\"",
  "Link a card in Alipay and WeChat Pay; test a small payment",
  "Install Amap, Didi and 12306; sort out roaming or an eSIM",
  "Check passports have 6+ months left and current entry rules",
  "Check whether in-town check-in at Kowloon Station is available for the flight home",
  "Pack a universal adapter and a light jacket"
];
for(const f of FOOD)if(!CITIES[f.city]||!DAYS.some(d=>d.n===f.day))console.warn(`Food "${f.name}": bad city or day`);
// Plan rows are tagged from their text so trains and meals stand out.
const kind=what=>/(high-speed|intercity) train/i.test(what)?"rail":/dim sum|roast goose|morning tea|lunch|dinner/i.test(what)?"food":"";

const $=s=>document.querySelector(s);
const h=(t,a,...kids)=>{const e=document.createElement(t);for(const[k,v]of Object.entries(a||{})){if(v==null||v===false)continue;if(k.startsWith("on"))e.addEventListener(k.slice(2),v);else if(k==="class")e.className=v;else if(k==="text")e.textContent=v;else e.setAttribute(k,v===true?"":v)}for(const c of kids.flat()){if(c==null||c===false)continue;e.append(c.nodeType?c:document.createTextNode(String(c)))}return e};

// City illustration: a <use> of the matching SVG symbol in index.html, so it follows the light/dark colours.
// Scenes carry extra scenery beyond their viewBox, so "meet" shows the whole skyline at any banner width.
const NS="http://www.w3.org/2000/svg";
const scene=(city,cls)=>{const svg=document.createElementNS(NS,"svg"),use=document.createElementNS(NS,"use");
  svg.setAttribute("viewBox","0 0 600 200");svg.setAttribute("preserveAspectRatio","xMidYMax meet");
  svg.setAttribute("class","scene "+cls);svg.setAttribute("aria-hidden","true");svg.setAttribute("focusable","false");
  use.setAttribute("href","#scene-"+city);svg.append(use);return svg};

let cur=1;
try{const s=+localStorage.getItem("day");if(DAYS.some(d=>d.n===s))cur=s}catch{}
const hashDay=()=>{const t=(location.hash||"").match(/^#day(\d+)$/);return t&&DAYS.some(d=>d.n===+t[1])?+t[1]:null};
cur=hashDay()??cur;

const names=Object.values(CITIES).map(c=>c.en);
$("#sub").textContent=`${DAYS.length} days · ${names.slice(0,-1).join(", ")} and ${names.at(-1)}`;
$("#route").append(...Object.entries(CITIES).flatMap(([k,c],i,all)=>{
  const n=DAYS.filter(d=>d.city===k).length,leg=i&&RAIL.find(r=>r.leg===`${all[i-1][0]}-${k}`);
  return[i?h("div",{class:"leg"},h("i"),leg&&h("span",{text:leg.time+" rail"})):null,
    h("button",{type:"button",class:"stop "+k,"data-city":k,"aria-pressed":"false"},h("span",{class:"zh",text:c.zh}),h("span",{class:"en",text:c.en}),h("span",{class:"n",text:n?`${n} day${n>1?"s":""}`:""}))]}).filter(Boolean));
$("#rail").append(...RAIL.map(r=>h("tr",{},h("td",{text:`${r.from} → ${r.to}`}),h("td",{text:r.time}))));

const pager=$("#days").appendChild(h("div",{class:"pager"},
  h("button",{class:"nav",type:"button","aria-label":"Previous day",onclick:()=>step(-1),text:"‹"}),
  h("div",{class:"pills",role:"group","aria-label":"Choose a day"},DAYS.map(x=>h("button",{type:"button",class:"pill "+x.city,"data-n":x.n,"aria-label":`Day ${x.n}, ${x.title}`,onclick:()=>go(x.n)},h("b",{text:x.n}),h("span",{class:"zh",text:CITIES[x.city].zh})))),
  h("button",{class:"nav",type:"button","aria-label":"Next day",onclick:()=>step(1),text:"›"})));
const page=$("#days").appendChild(h("div"));

function go(n,scroll,focusTitle){cur=n;try{localStorage.setItem("day",String(n))}catch{}history.replaceState(null,"","#day"+n);render();
  const d=DAYS.find(x=>x.n===n);$("#status").textContent=`Day ${d.n} of ${DAYS.length}: ${d.title}`;
  pager.querySelector(".pill[aria-current='step']")?.scrollIntoView({block:"nearest",inline:"center",behavior:"smooth"});
  if(focusTitle)page.querySelector("h2").focus({preventScroll:true});
  if(scroll)$("#days").scrollIntoView({behavior:"smooth",block:"start"})}
function step(k){const i=DAYS.findIndex(d=>d.n===cur);const d=DAYS[i+k];if(d)go(d.n)}
function dayCard(d){const c=CITIES[d.city];
  return h("article",{class:"day "+d.city},
      scene(d.city,"banner"),
      h("div",{class:"when"},h("small",{text:"Day"}),h("b",{text:d.n}),h("small",{text:`of ${DAYS.length}`})),
      h("div",{class:"body"},
        h("span",{class:"chip "+d.city},h("span",{class:"zh",text:c.zh}),c.en),
        h("h2",{tabindex:"-1",text:d.title}),
        h("ul",{class:"plan"},d.plan.map(([t,what])=>h("li",{class:kind(what)||null},h("span",{class:"t",text:t}),h("span",{text:what},kind(what)==="rail"?h("span",{class:"tag",text:"Train"}):null)))),
        d.alt?.length?h("div",{class:"alt"},h("h3",{class:"label",text:"Swap options on the day"}),h("ul",{},d.alt.map(a=>h("li",{text:a})))):null));}
function render(){
  const i=DAYS.findIndex(d=>d.n===cur),d=DAYS[i],prev=DAYS[i-1],next=DAYS[i+1];
  document.querySelectorAll(".stop").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.city===d.city)));
  // Update the pager in place so the pressed button keeps focus; if it just became disabled, hand focus to the other arrow.
  const pb=pager.firstElementChild,nb=pager.lastElementChild,had=document.activeElement;
  pb.disabled=!prev;nb.disabled=!next;
  if(had===pb&&!prev)nb.focus();else if(had===nb&&!next)pb.focus();
  pager.querySelectorAll(".pill").forEach(p=>{if(+p.dataset.n===d.n)p.setAttribute("aria-current","step");else p.removeAttribute("aria-current")});
  page.replaceChildren(
    dayCard(d),
    h("div",{class:"pnav"},
      prev?h("button",{type:"button",onclick:()=>go(prev.n,true,true)},h("span",{"aria-hidden":"true",text:"‹"}),h("span",{class:"t",text:`Day ${prev.n} · ${prev.title}`})):h("span"),
      next?h("button",{type:"button",onclick:()=>go(next.n,true,true)},h("span",{class:"t",text:`Day ${next.n} · ${next.title}`}),h("span",{"aria-hidden":"true",text:"›"})):h("span")));
}
document.querySelectorAll(".stop").forEach(b=>b.addEventListener("click",()=>{const d=DAYS.find(x=>x.city===b.dataset.city);if(d)go(d.n,true)}));
document.addEventListener("keydown",e=>{if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.defaultPrevented)return;if(e.target.closest?.("input,textarea,select,[contenteditable]:not([contenteditable='false'])"))return;if(e.key==="ArrowRight")step(1);else if(e.key==="ArrowLeft")step(-1)});
window.addEventListener("hashchange",()=>{const n=hashDay();if(n!=null&&n!==cur)go(n)});
{let x0=null,y0=0;const el=$("#days");
  el.addEventListener("touchstart",e=>{if(e.touches.length>1||e.target.closest(".pills")){x0=null;return}x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
  el.addEventListener("touchcancel",()=>{x0=null},{passive:true});
  el.addEventListener("touchend",e=>{if(x0==null)return;if(e.touches.length){x0=null;return}const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;if(Math.abs(dx)>60&&Math.abs(dx)>1.5*Math.abs(dy))step(dx<0?1:-1)});}

// Where to eat, grouped by city in route order.
$("#food").append(...Object.entries(CITIES).map(([k,c])=>h("div",{class:"card "+k},
  scene(k,"strip"),
  h("h3",{},h("span",{class:"zh",text:c.zh})," ",c.en),
  h("ul",{class:"food"},FOOD.filter(f=>f.city===k).map(f=>h("li",{},
    h("div",{},h("b",{text:f.name}),h("small",{class:"muted",text:` · ${f.area}`})),
    h("div",{class:"meta"},h("span",{text:f.what}),h("span",{class:f.book?"bk":"q",text:f.book?"Book ahead":"Queue"}),
      h("a",{href:"#day"+f.day,onclick:e=>{e.preventDefault();go(f.day,true,true)},text:"Day "+f.day}))))))));
// Checklist with ticks kept in localStorage (per browser; fine if storage is blocked).
{let done={};try{done=JSON.parse(localStorage.getItem("checks")||"{}")||{}}catch{}
  const count=$("#check-count"),upd=()=>{count.textContent=`${CHECKLIST.filter(t=>done[t]).length} of ${CHECKLIST.length} done`};
  $("#checklist").append(...CHECKLIST.map((t,i)=>h("li",{},h("label",{},
    h("input",{type:"checkbox",id:"chk"+i,checked:!!done[t],onchange:e=>{if(e.target.checked)done[t]=1;else delete done[t];try{localStorage.setItem("checks",JSON.stringify(done))}catch{}upd()}}),
    h("span",{text:t})))));upd()}
// Printing shows every day, not just the current one.
{const all=$("#print-days");
  window.addEventListener("beforeprint",()=>all.replaceChildren(...DAYS.map(dayCard)));
  window.addEventListener("afterprint",()=>all.replaceChildren())}
// Offline copy for patchy connections; harmless where service workers aren't available.
if("serviceWorker"in navigator&&window.isSecureContext)navigator.serviceWorker.register("sw.js").catch(()=>{});
history.replaceState(null,"","#day"+cur);
render();
