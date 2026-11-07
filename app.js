// Trip data. Each fact lives here once; the subtitle, route strip, rail table and day pages are built from it.
// Cities in route order.
// lat/lon (where you stay) drive the weather forecast.
const CITIES={hk:{en:"Hong Kong",zh:"香港",lat:22.30,lon:114.17},sz:{en:"Shenzhen",zh:"深圳",lat:22.54,lon:114.05},gz:{en:"Guangzhou",zh:"广州",lat:23.13,lon:113.32}};
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

// High-speed rail: the three train legs. `samples` are trains seen in recent published timetables, not bookings;
// timetables change (the last national change was 1 July 2026), so the page tells people to confirm on 12306.
const TRAINS=[
  {day:2,city:"sz",from:"hkwk",to:"ft",aim:"14:00",dur:"14–16 min",freq:"Roughly every 20–60 minutes",
   samples:[["G5810","14:32","14:47"]],
   tips:["Be at West Kowloon 45–60 min early: Hong Kong exit and mainland entry are both inside the station.","Ticket gates close about 5–10 minutes before departure."]},
  {day:4,city:"gz",from:"ft",to:"gze",aim:"14:00",dur:"About 1–1.5 h (faster trains skip stops)",freq:"About 36 direct trains a day",
   samples:[["C8016","14:00","14:57"],["D7562","13:58","15:06"]],
   tips:["Pick a C or D train that ends at Guangzhou East, not Guangzhou South.","Be at Futian 30–40 min early for the security and passport check."]},
  {day:5,city:"hk",from:"gze",to:"hkwk",aim:"14:30",dur:"About 1 h 35 – 1 h 55",freq:"About hourly in the afternoon",
   samples:[["G6567","13:47","≈15:30"],["G6557","14:41","≈16:20"],["G6559","15:40","≈17:20"]],
   tips:["Mainland exit is at Guangzhou East; Hong Kong entry is after arrival at West Kowloon.","Be at Guangzhou East 45 min early."]}
];
// Stations, with names to show a taxi driver. Map links open Google Maps (Hong Kong) or Amap (mainland, where Google is blocked).
const STATIONS={
  hkwk:{city:"hk",short:"West Kowloon",en:"Hong Kong West Kowloon",zh:"香港西九龍站",map:"https://www.google.com/maps/search/?api=1&query=Hong+Kong+West+Kowloon+Station",
    metro:"MTR Austin (Tuen Ma line), one stop from East Tsim Sha Tsui; Kowloon station (Airport Express) is a 10-minute walk.",
    tip:"Follow signs for High Speed Rail. Departures and both immigration checks are on the lower floors."},
  ft:{city:"sz",short:"Futian",en:"Shenzhen Futian Station",zh:"福田站",map:"https://uri.amap.com/search?keyword=%E7%A6%8F%E7%94%B0%E7%AB%99",
    metro:"Underground in the Futian CBD, on Metro Lines 2, 3 and 11 (Futian station). Didi to the Four Points (5 Guihua Road) is about 15 minutes.",
    tip:"Not the same as Futian Checkpoint (福田口岸), the land border by Lok Ma Chau."},
  gze:{city:"gz",short:"Guangzhou East",en:"Guangzhou East Station",zh:"广州东站",map:"https://uri.amap.com/search?keyword=%E5%B9%BF%E5%B7%9E%E4%B8%9C%E7%AB%99",
    metro:"Metro Lines 1 and 3 (Guangzhou East Railway Station). Taxi to the Sofitel Guangzhou Sunrich is about 10 minutes.",
    tip:"Not Guangzhou South (广州南站), which is about 40 minutes further out."}
};
// Practical notes for visitors from outside the mainland.
const RAIL_NOTES=[
  ["Your passport is your ticket","Buy each ticket with that person's passport on the 12306 app (English, accepts foreign passports), Trip.com or Klook. Scan the passport at the gates; if it doesn't read, use the staffed gate (人工通道)."],
  ["Book early","Sales open about 15 days ahead and afternoon trains on weekends sell out. Buy all three legs as soon as they open."],
  ["Seats for three together","Second class is laid out A-B-C | D-F. Choose A, B and C to sit in one row; A and F are windows."],
  ["Find your gate","Station screens list trains by number, not destination. Look for your train number and its gate (检票口)."],
  ["Security","Bags are X-rayed at every station. Lighters aren't allowed; power banks and drinks are fine."],
  ["Boarding","Gates open about 15–20 minutes before departure and close a few minutes before. Your car (车厢) and seat are on the e-ticket, and the platform floor shows where each car stops."],
  ["Luggage","Overhead racks take carry-on bags; large suitcases go behind the last row or in the racks at the end of each car."],
  ["On board","No smoking or vaping anywhere (it sets off alarms and brings fines). Hot water is free near the doors."],
  ["Changes","You can change to another train on 12306 before departure; refunds carry a small fee that rises closer to departure."],
  ["Keep your passport handy","You scan it again to leave the station, and you need it for immigration at West Kowloon."]
];
// Flights, hotels and door-to-door transfers (also in the private Family Trip Planner).
// Flight times are the usual schedule; hotel contacts are from each hotel's official listing.
const FLIGHTS=[
  {day:1,date:"Fri 11 Dec",no:"SQ874",from:["SIN","Singapore Changi"],to:["HKG","Hong Kong Intl"],dep:"07:25",arr:"11:20",dur:"About 3 h 55",
   tips:["Be at Changi by about 05:00 (2½ hours before). Check your terminal on the booking.","The Airport Express to Kowloon takes about 21 minutes, then a short taxi to the Mondrian.","Buy Octopus cards at the airport for MTR, buses and 7-Eleven."]},
  {day:6,date:"Wed 16 Dec",no:"SQ895",from:["HKG","Hong Kong Intl"],to:["SIN","Singapore Changi"],dep:"18:50",arr:"≈22:40",dur:"About 3 h 50",
   tips:["Be at the airport by about 16:00 (2½–3 hours before).","In-town check-in at Kowloon Station usually opens 24 hours before and closes 90 minutes before departure. Check SQ allows it on your ticket.","Use up HKD on Octopus cards; refund Octopus deposits at MTR counters."]}
];
const HOTELS=[
  {city:"hk",name:"Mondrian Hong Kong",addr:"8A Hart Avenue, Tsim Sha Tsui",nights:"Fri 11 Dec and Tue 15 Dec",n:"2 nights (not in a row)",
   room:"Family Room. Ask for the family bed setup; if those are sold out, a Premier Twin plus a rollaway bed.",
   phone:"+852 3550 0388",email:"hongkong@mondrianhotels.com",map:"https://www.google.com/maps/search/?api=1&query=Mondrian+Hong+Kong+8A+Hart+Avenue"},
  {city:"sz",name:"Four Points by Sheraton Shenzhen",addr:"5 Guihua Road, Futian",nights:"Sat 12 and Sun 13 Dec",n:"2 nights",
   room:"Two-Bedroom Family Room, about 50 m², sleeps 4.",
   phone:"+86 755 8359 9999",email:null,emailNote:"No public email. Message the hotel in the Marriott Bonvoy app, or call.",map:"https://uri.amap.com/search?keyword=%E6%B7%B1%E5%9C%B3%E7%A6%8F%E7%94%B0%E7%A6%8F%E6%9C%8B%E5%96%9C%E6%9D%A5%E7%99%BB%E9%85%92%E5%BA%97"},
  {city:"gz",name:"Sofitel Guangzhou Sunrich",addr:"988 Guangzhou Da Dao Zhong, Tianhe",nights:"Mon 14 Dec",n:"1 night",
   room:"Superior Room with 2 single beds (48 m², up to 4 guests) plus 1 extra bed.",
   phone:"+86 20 3883 8888",email:"H6318@sofitel.com",map:"https://uri.amap.com/search?keyword=%E5%B9%BF%E5%B7%9E%E9%98%B3%E5%85%89%E5%87%AF%E8%BF%AA%E7%B4%A2%E8%8F%B2%E7%89%B9%E5%A4%A7%E9%85%92%E5%BA%97"}
];
// Each transfer: [city, when, title, best option, alternative, address (English), address to show the driver].
const TRANSFERS=[
  ["hk","Day 1 · Fri 11 Dec · after landing ~11:20","Airport → Mondrian","Taxi from the airport taxi rank (red urban taxi). About 35–45 min, about HK$300–400 including the Lantau Link toll and bags. Easiest with three people and luggage.","Airport Express to Kowloon station (about 21 min, about HK$105 each with Octopus), then a taxi to the hotel (about 10–15 min).","Mondrian Hong Kong, 8A Hart Avenue, Tsim Sha Tsui","尖沙咀赫德道8A號"],
  ["hk","Day 2 · Sat 12 Dec · leave by 13:00","Mondrian → West Kowloon station","Taxi, about 10–15 min, about HK$60–90. Ask for “West Kowloon Station, High Speed Rail”.","MTR from East Tsim Sha Tsui to Austin, one stop on the Tuen Ma line (about 3 min), then follow the signs underground to the High Speed Rail station (about 10 min walk).","West Kowloon Station (High Speed Rail)","香港西九龍站 高鐵"],
  ["sz","Day 2 · Sat 12 Dec · after ~14:15","Futian station → Four Points","Didi (or a taxi from the rank), about 15 min, about ¥20–35. Follow signs for 网约车 (ride-hailing) to the pick-up point.","Metro Line 3 towards Futian Bonded Area (福田保税区); get off at Fubao (福保), exit E1, then a short walk. About 25 min door to door.","Four Points by Sheraton Shenzhen, 5 Guihua Road, Futian Free Trade Zone","深圳福朋喜来登酒店 福田保税区桂花路5号"],
  ["sz","Day 2 · if you cross by MTR instead of the train","Lok Ma Chau → Four Points","Walk, about 10–15 min, after clearing Hong Kong exit and mainland entry at Lok Ma Chau / Futian Checkpoint.","Getting there: MTR from East Tsim Sha Tsui to Hung Hom, change to the East Rail line for Lok Ma Chau (about 50 min in all).","Four Points by Sheraton Shenzhen, 5 Guihua Road","深圳福朋喜来登酒店 福田保税区桂花路5号"],
  ["sz","Day 4 · Mon 14 Dec · leave at 13:15","Four Points → Futian station","Didi from the hotel door, about 15 min, about ¥20–35. Ask the front desk to book it if the app is fiddly.","Metro Line 3 from Fubao (福保) to Futian, then follow signs for 福田站 high-speed rail. About 25 min.","Futian Railway Station (high-speed rail)","福田站 高铁"],
  ["gz","Day 4 · Mon 14 Dec · after ~15:00","Guangzhou East → Sofitel","Taxi from the station rank, about 10–15 min, about ¥15–25. Didi pick-ups are signposted 网约车.","Metro Line 3 to Tiyu Xilu (体育西路), then about 15–20 min on foot. Only worth it with light bags.","Sofitel Guangzhou Sunrich, 988 Guangzhou Da Dao Zhong, Tianhe","广州阳光凯迪索菲特大酒店 天河区广州大道中988号"],
  ["gz","Day 5 · Tue 15 Dec · leave at 13:30","Sofitel → Guangzhou East station","Taxi from the hotel door, about 10–15 min, about ¥15–25. Allow extra time in the early-afternoon traffic.","Metro from Tiyu Xilu, Line 3 to Guangzhou East (about 20 min walk to the metro first).","Guangzhou East Railway Station","广州东站"],
  ["hk","Day 5 · Tue 15 Dec · after ~16:15","West Kowloon → Mondrian","Taxi from the rank outside West Kowloon station, about 10–15 min, about HK$60–90.","MTR from Austin to East Tsim Sha Tsui, one stop on the Tuen Ma line; the hotel is a minute from exit N1/N2.","Mondrian Hong Kong, 8A Hart Avenue, Tsim Sha Tsui","尖沙咀赫德道8A號"],
  ["hk","Day 6 · Wed 16 Dec · flight 18:50","Mondrian → Airport","Morning: taxi to Kowloon station for in-town check-in (if SQ allows it on your ticket), then you are bag-free. Afternoon: Airport Express from Kowloon (about 21 min), or a taxi via Sham Tseng for Yue Kee roast goose (about 25 min from there to the airport).","Taxi straight from the hotel to the airport, about 35–45 min, about HK$300–400. Be at the airport by about 16:00.","Hong Kong International Airport, Terminal 1","香港國際機場 一號客運大樓"]
];
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
for(const t of TRAINS)if(!STATIONS[t.from]||!STATIONS[t.to]||!DAYS.some(d=>d.n===t.day))console.warn(`Train on day ${t.day}: bad station or day`);
for(const f of FOOD)if(!CITIES[f.city]||!DAYS.some(d=>d.n===f.day))console.warn(`Food "${f.name}": bad city or day`);
// Plan rows are tagged from their text so trains and meals stand out.
const kind=what=>/(high-speed|intercity) train/i.test(what)?"rail":/dim sum|roast goose|morning tea|lunch|dinner/i.test(what)?"food":"";

const $=s=>document.querySelector(s);
const h=(t,a,...kids)=>{const e=document.createElement(t);for(const[k,v]of Object.entries(a||{})){if(v==null||v===false)continue;if(k.startsWith("on"))e.addEventListener(k.slice(2),v);else if(k==="class")e.className=v;else if(k==="text")e.textContent=v;else e.setAttribute(k,v===true?"":v)}for(const c of kids.flat()){if(c==null||c===false)continue;e.append(c.nodeType?c:document.createTextNode(String(c)))}return e};

// City photo (self-hosted, credits in the footer). Decorative here: the city is named right next to it.
const PHOTO={hk:{big:"photos/hk.jpg",w:960},sz:{big:"photos/sz.jpg",w:960},gz:{big:"photos/gz.jpg",w:1280}};
const scene=(city,cls)=>h("img",{class:"scene "+cls+" "+city,src:`photos/${city}-sm.jpg`,srcset:`photos/${city}-sm.jpg 640w, ${PHOTO[city].big} ${PHOTO[city].w}w`,
  sizes:cls==="banner"?"(max-width:760px) 100vw, 728px":"(max-width:600px) 100vw, 240px",alt:"",loading:cls==="banner"?"eager":"lazy",decoding:"async"});

// ---- Weather (Open-Meteo: free, no key). Only city coordinates are sent; the trip date stays on this device. ----
const WX_DAYS=16,WX_MAX_AGE=3*3600e3;
const WX_URL="https://api.open-meteo.com/v1/forecast?"+new URLSearchParams({
  latitude:Object.values(CITIES).map(c=>c.lat).join(","),longitude:Object.values(CITIES).map(c=>c.lon).join(","),
  daily:"weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",timezone:"Asia/Hong_Kong",forecast_days:String(WX_DAYS)});
const WMO=c=>c===0?["☀️","Sunny"]:c===1?["🌤️","Mostly sunny"]:c===2?["⛅","Partly cloudy"]:c===3?["☁️","Cloudy"]:c===45||c===48?["🌫️","Fog"]
  :c>=51&&c<=57?["🌦️","Drizzle"]:c>=61&&c<=67?["🌧️","Rain"]:c>=71&&c<=77?["🌨️","Snow"]:c>=80&&c<=82?["🌦️","Showers"]:c>=95?["⛈️","Thunderstorms"]:["🌡️","—"];
let wx=null; // {t: fetched-at ms, city: {"YYYY-MM-DD": {code,max,min,rain}}}
try{wx=JSON.parse(localStorage.getItem("wx")||"null")}catch{}
// The trip starts on TRIP_START; a date typed into the weather box overrides it on that device.
const TRIP_START="2026-12-11";
let tripStart=TRIP_START;try{tripStart=localStorage.getItem("tripStart")||TRIP_START}catch{}
const isoDay=(iso,add)=>{const[y,m,d]=iso.split("-").map(Number);return new Date(Date.UTC(y,m-1,d+add))};
const isoStr=dt=>dt.toISOString().slice(0,10);
const fmtDay=(dt,o)=>dt.toLocaleDateString("en-GB",{timeZone:"UTC",...o});
const todayHK=()=>new Date(Date.now()+8*3600e3).toISOString().slice(0,10);
const dayDate=d=>/^\d{4}-\d{2}-\d{2}$/.test(tripStart)?isoDay(tripStart,d.n-1):null;
function wxLine(d){const dt=dayDate(d);if(!dt)return null;const key=isoStr(dt),f=wx?.[d.city]?.[key];
  if(f){const[i,label]=WMO(f.code);return h("p",{class:"wxline"},h("span",{class:"wxi","aria-hidden":"true",text:i}),`${label} · ${Math.round(f.max)}° / ${Math.round(f.min)}°C`,f.rain!=null?` · rain ${f.rain}%`:"")}
  if(key>todayHK())return h("p",{class:"wxline muted"},`Forecast shows from ${fmtDay(isoDay(key,1-WX_DAYS),{day:"numeric",month:"short"})}`);
  return null}

let cur=1;
try{const s=+localStorage.getItem("day");if(DAYS.some(d=>d.n===s))cur=s}catch{}
const hashDay=()=>{const t=(location.hash||"").match(/^#day(\d+)$/);return t&&DAYS.some(d=>d.n===+t[1])?+t[1]:null};
cur=hashDay()??cur;

const names=Object.values(CITIES).map(c=>c.en);
$("#sub").textContent=`${DAYS.length} days · ${names.length} cities · ${RAIL.filter(r=>r.leg).length+1} train rides · roast goose and dim sum every day`;
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
  const dt=dayDate(d);
  return h("article",{class:"day "+d.city},
      h("div",{class:"cover"},scene(d.city,"banner"),
        h("div",{class:"cover-copy"},
          h("p",{class:"kicker"},h("span",{class:"zh",text:c.zh}),` ${c.en} · Day ${d.n} of ${DAYS.length}`,dt?` · ${fmtDay(dt,{weekday:"short",day:"numeric",month:"short"})}`:""),
          h("h2",{tabindex:"-1",text:d.title}))),
      h("div",{class:"body"},
        wxLine(d),
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

// High-speed rail section: one card per leg, then stations, then notes.
$("#trains").append(...TRAINS.map(t=>{const a=STATIONS[t.from],b=STATIONS[t.to];
  return h("article",{class:"card leg-card "+t.city},
    h("p",{class:"eyebrow"},h("a",{href:"#day"+t.day,onclick:e=>{e.preventDefault();go(t.day,true,true)},text:"Day "+t.day})," · aim for about ",t.aim),
    h("h3",{},a.short," → ",b.short),
    h("p",{class:"legline"},h("span",{class:"zh",text:a.zh})," → ",h("span",{class:"zh",text:b.zh})),
    h("dl",{class:"facts"},h("dt",{text:"Journey"}),h("dd",{text:t.dur}),h("dt",{text:"Frequency"}),h("dd",{text:t.freq})),
    h("table",{class:"samples"},h("caption",{text:"Trains around that time in recent timetables"}),
      h("thead",{},h("tr",{},h("th",{text:"Train"}),h("th",{text:"Departs"}),h("th",{text:"Arrives"}))),
      h("tbody",{},t.samples.map(([n,d,ar])=>h("tr",{},h("td",{text:n}),h("td",{text:d}),h("td",{text:ar}))))),
    h("ul",{class:"legtips"},t.tips.map(x=>h("li",{text:x}))))}));
$("#stations").append(...Object.values(STATIONS).map(st=>h("div",{class:"card station "+st.city},
  h("h3",{text:st.en}),h("p",{class:"zhname"},h("span",{class:"zh",text:st.zh}),h("small",{class:"muted",text:" show this to a taxi driver"})),
  h("p",{text:st.metro}),h("p",{class:"muted",text:st.tip}),
  h("a",{class:"maplink",href:st.map,target:"_blank",rel:"noopener",text:"Open in maps"}))));
$("#railnotes").append(...RAIL_NOTES.map(([t,x])=>h("li",{},h("b",{text:t}),h("span",{text:x}))));
// Flights, hotels and transfers.
const dayLink=n=>h("a",{href:"#day"+n,onclick:e=>{e.preventDefault();go(n,true,true)},text:"Day "+n});
$("#flights").append(...FLIGHTS.map(f=>h("article",{class:"card flight"+(f.day>1?" ret":"")},
  h("p",{class:"eyebrow"},dayLink(f.day)," · "+f.date),
  h("div",{class:"fl-row"},
    h("div",{},h("b",{class:"code",text:f.from[0]}),h("span",{class:"muted",text:f.from[1]}),h("span",{class:"tm",text:f.dep})),
    h("div",{class:"fl-mid"},h("span",{class:"fl-no",text:f.no}),h("i"),h("span",{class:"muted",text:f.dur})),
    h("div",{class:"to"},h("b",{class:"code",text:f.to[0]}),h("span",{class:"muted",text:f.to[1]}),h("span",{class:"tm",text:f.arr}))),
  h("p",{class:"muted fl-air",text:"Singapore Airlines · 3 passengers"}),
  h("ul",{class:"legtips"},f.tips.map(t=>h("li",{text:t}))))));
$("#hotels").append(...HOTELS.map(o=>{const c=CITIES[o.city];return h("article",{class:"card hotel "+o.city},
  h("p",{class:"eyebrow"},h("span",{class:"zh",text:c.zh})," "+c.en+" · "+o.n),
  h("h3",{text:o.name}),h("p",{class:"muted addr",text:o.addr}),
  h("dl",{class:"facts"},h("dt",{text:"Nights"}),h("dd",{text:o.nights}),h("dt",{text:"Room for 3"}),h("dd",{text:o.room}),
    h("dt",{text:"Phone"}),h("dd",{},h("a",{href:"tel:"+o.phone.replace(/\s/g,""),text:o.phone})),
    h("dt",{text:"Email"}),h("dd",{},o.email?h("a",{href:"mailto:"+o.email,text:o.email}):h("span",{class:"muted",text:o.emailNote}))),
  h("a",{class:"maplink",href:o.map,target:"_blank",rel:"noopener",text:"Open in maps"}))}));
$("#xfers").append(...TRANSFERS.map(([city,when,title,best,alt,addr,zh])=>h("article",{class:"card xfer "+city},
  h("p",{class:"eyebrow",text:when}),h("h3",{text:title}),
  h("dl",{class:"facts"},h("dt",{text:"Best"}),h("dd",{text:best}),h("dt",{text:"Or"}),h("dd",{text:alt})),
  h("p",{class:"taxi"},h("span",{class:"muted",text:"For the driver"}),h("span",{class:"zh",text:zh}),h("span",{class:"muted",text:addr})))));
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
// Weather section: next days per city, plus the trip-date box that ties forecasts to day pages.
function renderWx(){
  const from=todayHK();
  $("#wx").replaceChildren(...Object.entries(CITIES).map(([k,c])=>{const days=Object.entries(wx?.[k]||{}).filter(([t])=>t>=from).slice(0,5);
    return h("div",{class:"wxcity "+k},h("h3",{},h("span",{class:"zh",text:c.zh})," ",c.en),
      days.length?h("ul",{},days.map(([t,f])=>{const[i,label]=WMO(f.code);return h("li",{},
        h("span",{class:"wd",text:t===from?"Today":fmtDay(isoDay(t,0),{weekday:"short"})}),h("span",{class:"wxi",title:label,"aria-label":label,text:i}),
        h("span",{class:"tt",text:`${Math.round(f.max)}°/${Math.round(f.min)}°`}),h("span",{class:"rr",text:f.rain!=null?`${f.rain}%`:""}))})):h("p",{class:"muted",text:"No forecast yet."}))}));
  render()}
async function loadWx(){
  const st=$("#wx-status"),stamp=t=>new Date(t).toLocaleString("en-GB",{weekday:"short",hour:"2-digit",minute:"2-digit"});
  if(wx)renderWx();
  if(wx&&Date.now()-wx.t<WX_MAX_AGE){st.textContent=`Updated ${stamp(wx.t)} · Open-Meteo`;return}
  try{const r=await fetch(WX_URL,{signal:AbortSignal.timeout(10000)});if(!r.ok)throw new Error(r.status);
    let j=await r.json();if(!Array.isArray(j))j=[j];const next={t:Date.now()};
    Object.keys(CITIES).forEach((k,i)=>{const dl=j[i]?.daily;next[k]={};dl?.time?.forEach((t,n)=>{next[k][t]={code:dl.weather_code[n],max:dl.temperature_2m_max[n],min:dl.temperature_2m_min[n],rain:dl.precipitation_probability_max?.[n]??null}})});
    wx=next;try{localStorage.setItem("wx",JSON.stringify(wx))}catch{}
    renderWx();st.textContent=`Updated ${stamp(wx.t)} · Open-Meteo`}
  catch{st.textContent=wx?`Offline: showing the forecast from ${stamp(wx.t)}`:"Forecast unavailable right now; it will load when you're online."}}
{const inp=$("#trip-start");inp.value=tripStart;
  inp.addEventListener("change",()=>{tripStart=inp.value;try{if(tripStart)localStorage.setItem("tripStart",tripStart);else localStorage.removeItem("tripStart")}catch{}render()})}
// Printing shows every day, not just the current one.
{const all=$("#print-days");
  window.addEventListener("beforeprint",()=>all.replaceChildren(...DAYS.map(dayCard)));
  window.addEventListener("afterprint",()=>all.replaceChildren())}
// Offline copy for patchy connections; harmless where service workers aren't available.
if("serviceWorker"in navigator&&window.isSecureContext)navigator.serviceWorker.register("sw.js").catch(()=>{});
history.replaceState(null,"","#day"+cur);
render();
renderWx();
loadWx();
