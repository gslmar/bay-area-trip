// Trip data. Each fact lives here once; the subtitle, route strip, rail table and day pages are built from it.
// Cities in route order.
const CITIES={hk:{en:"Hong Kong",zh:"香港"},sz:{en:"Shenzhen",zh:"深圳"},gz:{en:"Guangzhou",zh:"广州"}};
// Rail connections for the Essentials table; a `leg` between neighbouring cities is also shown on the route strip.
const RAIL=[
  {from:"HK West Kowloon",to:"Shenzhen Futian",time:"~15 min",leg:"hk-sz"},
  {from:"HK West Kowloon",to:"Guangzhou South",time:"~50 min"},
  {from:"Shenzhen North",to:"Guangzhou South",time:"~30 min",leg:"sz-gz"},
  {from:"MTR East Rail",to:"Lo Wu / Lok Ma Chau",time:"~45 min"}
];
// One entry per day, in order; day numbers come from the position. Plan items are [time, activity].
const DAYS=[
  {city:"hk",title:"Arrive in Hong Kong",plan:[["14:00","Land at HKIA, Airport Express to Kowloon"],["16:00","Check in, rest"],["18:00","Tsim Sha Tsui waterfront and Avenue of Stars"],["20:00","Symphony of Lights from the promenade"],["21:00","Dinner on Canton Road"]]},
  {city:"hk",title:"The Peak and Central",plan:[["08:00","Dim sum breakfast"],["10:00","Peak Tram up to Victoria Peak"],["12:30","Central, Mid-Levels escalator, PMQ"],["16:00","Star Ferry back across the harbour"],["19:30","Temple Street night market"]]},
  {city:"hk",title:"Lantau Island",plan:[["09:00","MTR to Tung Chung"],["09:30","Ngong Ping 360 cable car"],["11:00","Tian Tan Buddha and Po Lin Monastery"],["14:00","Tai O fishing village"],["18:00","Back to the city for dinner"]]},
  {city:"sz",title:"High-speed rail to Shenzhen",plan:[["09:30","Train from West Kowloon to Futian"],["11:00","Drop bags at the hotel"],["13:00","Lianhuashan Park, view over the Civic Center"],["16:00","Shenzhen Bay Park"],["19:00","OCT Harbour for dinner"]]},
  {city:"sz",title:"Shenzhen sights",plan:[["10:00","Window of the World"],["15:00","Huaqiangbei electronics market"],["19:00","Sea World, Shekou"]]},
  {city:"gz",title:"On to Guangzhou",plan:[["10:00","Train from Shenzhen North to Guangzhou South"],["12:00","Check in, Cantonese lunch"],["15:00","Canton Tower"],["19:30","Pearl River night cruise"]]},
  {city:"gz",title:"Old Guangzhou and home",plan:[["08:00","Morning tea (早茶)"],["10:00","Shamian Island"],["12:30","Chen Clan Ancestral Hall"],["15:00","Beijing Road pedestrian street"],["18:00","Train or flight home"]]}
].map((d,i)=>({...d,n:i+1}));
// Flag copying slips in the data instead of rendering them silently wrong.
for(const d of DAYS){if(!CITIES[d.city])console.warn(`Day ${d.n}: unknown city "${d.city}"`);
  for(const[t]of d.plan)if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(t))console.warn(`Day ${d.n}: time "${t}" isn't HH:MM`)}

const $=s=>document.querySelector(s);
const h=(t,a,...kids)=>{const e=document.createElement(t);for(const[k,v]of Object.entries(a||{})){if(v==null||v===false)continue;if(k.startsWith("on"))e.addEventListener(k.slice(2),v);else if(k==="class")e.className=v;else if(k==="text")e.textContent=v;else e.setAttribute(k,v===true?"":v)}for(const c of kids.flat()){if(c==null||c===false)continue;e.append(c.nodeType?c:document.createTextNode(String(c)))}return e};

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
function render(){
  const i=DAYS.findIndex(d=>d.n===cur),d=DAYS[i],prev=DAYS[i-1],next=DAYS[i+1],c=CITIES[d.city];
  document.querySelectorAll(".stop").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.city===d.city)));
  // Update the pager in place so the pressed button keeps focus; if it just became disabled, hand focus to the other arrow.
  const pb=pager.firstElementChild,nb=pager.lastElementChild,had=document.activeElement;
  pb.disabled=!prev;nb.disabled=!next;
  if(had===pb&&!prev)nb.focus();else if(had===nb&&!next)pb.focus();
  pager.querySelectorAll(".pill").forEach(p=>{if(+p.dataset.n===d.n)p.setAttribute("aria-current","step");else p.removeAttribute("aria-current")});
  page.replaceChildren(
    h("article",{class:"day "+d.city},
      h("div",{class:"when"},h("small",{text:"Day"}),h("b",{text:d.n}),h("small",{text:`of ${DAYS.length}`})),
      h("div",{class:"body"},
        h("span",{class:"chip "+d.city},h("span",{class:"zh",text:c.zh}),c.en),
        h("h2",{tabindex:"-1",text:d.title}),
        h("ul",{class:"plan"},d.plan.map(([t,what])=>h("li",{},h("span",{class:"t",text:t}),h("span",{text:what})))))),
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
history.replaceState(null,"","#day"+cur);
render();
