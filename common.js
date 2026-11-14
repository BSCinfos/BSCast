// API não oficial: BrawlAPI/Brawlify (o endereço antigo api.brawlify.com/v1 foi desativado)
const API=['https://api.brawlapi.com/v1/','https://api.brawlify.com/v1/'];
let BR={},BRL=[];
const h=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
async function j(u,f){const k='c2_'+u;for(const a of API){try{const r=await fetch(a+u);if(!r.ok)throw r.status;const l=(await r.json()).list.map(f).filter(Boolean);try{localStorage[k]=JSON.stringify(l)}catch{}return l}catch(e){console.warn('API falhou:',a+u,e)}}return JSON.parse(localStorage[k]||'[]')}
async function loadBr(){BRL=(await j('brawlers',b=>({id:b.id,name:b.name,img:b.imageUrl2||b.imageUrl}))).sort((a,b)=>a.name.localeCompare(b.name));BRL.forEach(b=>BR[b.id]={n:b.name,i:b.img});return BRL}
const loadMaps=()=>j('maps',m=>m.gameMode&&{id:m.id,name:m.name,img:m.imageUrl,mode:m.gameMode.name,mimg:m.gameMode.imageUrl,off:m.disabled});
// Sem servidor: painel e overlay trocam estado via localStorage + BroadcastChannel (mesma origem)
const CH=new BroadcastChannel('bscast');
function sync(cb){const rd=()=>{try{return JSON.parse(localStorage.bscast_state||'{}')}catch{return{}}};cb(rd());addEventListener('storage',e=>{if(e.key=='bscast_state')cb(rd())});CH.onmessage=m=>cb(m.data)}
const push=s=>{try{localStorage.bscast_state=JSON.stringify(s)}catch{}CH.postMessage(s)};
const OWN=f=>f==0?[0,1,1,0,0,1]:[1,0,0,1,1,0]; // dono de cada pick (1..6)
const cell=(id,c='')=>`<div class="c ${c}">${id&&BR[id]?`<img src="${BR[id].i}" alt="">`:'?'}</div>`;
function side(s,t,names){const o=OWN(s.first),pk=[0,1,2,3,4,5].filter(i=>o[i]==t);
 return{pk:pk.map((i,k)=>`<div class=pb>${cell(s.sl['p'+i])}${names?`<span>${h(s.tm[t].p[k])}</span>`:''}</div>`).join(''),
 bn:[0,1,2].map(k=>cell(s.sl[`b${t}_${k}`],'bn')).join(''),
 gb:s.gb?[0,1].map(k=>cell(s.sl[`g${t}_${k}`],'bn gb')).join(''):'',
 lg:`<img class=lg src="${s.tm[t].l||''}" alt="">`,nm:h(s.tm[t].n)}}
