const API='https://api.brawlify.com/v1/'; // API não oficial (Brawlify)
let BR={},BRL=[];
async function j(u){const k='c_'+u;try{const r=await(await fetch(API+u)).json();localStorage[k]=JSON.stringify(r);return r}catch{return JSON.parse(localStorage[k]||'{"list":[]}')}}
async function loadBr(){BRL=(await j('brawlers')).list;BRL.forEach(b=>BR[b.id]={n:b.name,i:b.imageUrl2||b.imageUrl});return BRL}
function sync(cb){new EventSource('/events').onmessage=m=>cb(JSON.parse(m.data))}
const push=s=>fetch('/state',{method:'POST',body:JSON.stringify(s)});
const OWN=f=>f==0?[0,1,1,0,0,1]:[1,0,0,1,1,0]; // dono de cada pick (1..6)
const cell=(id,c='')=>`<div class="c ${c}">${id&&BR[id]?`<img src="${BR[id].i}">`:'?'}</div>`;
function side(s,t,names){const o=OWN(s.first),pk=[0,1,2,3,4,5].filter(i=>o[i]==t);
 return{pk:pk.map((i,k)=>`<div class=pk>${cell(s.sl['p'+i])}${names?`<span>${s.tm[t].p[k]||''}</span>`:''}</div>`).join(''),
 bn:[0,1,2].map(k=>cell(s.sl[`b${t}_${k}`],'bn')).join(''),
 gb:s.gb?[0,1].map(k=>cell(s.sl[`g${t}_${k}`],'bn gb')).join(''):'',
 lg:`<img class=lg src="${s.tm[t].l||''}">`,nm:s.tm[t].n}}
