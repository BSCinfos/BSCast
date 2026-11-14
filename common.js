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
// célula de um slot (g=ban global, b=ban, p=pick); mostra contador no pick atual
function cellK(s,k,x=''){const t=k[0]=='p'?OWN(s.first)[+k[1]]:+k[1],id=s.sl[k],cl=(k[0]=='p'?'':'bn ')+(k[0]=='g'?'gb ':'')+(t?'r ':'')+x;
 if(!id&&k==s.ck&&s.tp&&s.ph=='draft')return `<div class="c ${cl}"><span class=cd>${s.tp}</span></div>`;return cell(id,cl)}
function side(s,t,names){const o=OWN(s.first),pk=[0,1,2,3,4,5].filter(i=>o[i]==t);
 return{pk:pk.map((i,k)=>`<div class=pb>${cellK(s,'p'+i)}${names?`<span>${h(s.tm[t].p[k])}</span>`:''}</div>`).join(''),
 bn:[0,1,2].map(k=>cellK(s,`b${t}_${k}`)).join(''),gb:s.gb?[0,1].map(k=>cellK(s,`g${t}_${k}`)).join(''):'',
 lg:`<img class=lg src="${s.tm[t].l||''}" alt="">`,nm:h(s.tm[t].n)}}
setInterval(()=>{const s=window.ST;if(s&&s.tp)document.querySelectorAll('.cd').forEach(e=>e.textContent=Math.max(0,Math.ceil(s.tp-(Date.now()-s.t0)/1000)))},250);
async function resolveIcons(){await Promise.all(Object.keys(ICONS).map(async k=>{for(const c of[].concat(ICONS[k]))if(await new Promise(r=>{const i=new Image();i.onload=()=>r(1);i.onerror=()=>r(0);i.src=c})){ICONS[k]=c;return}ICONS[k]=''}))}
// ===== ações e atalhos (usados pelo painel e pela tela secundária) =====
const KD={ph:'n',sa:'a',sr:'s',ga:'q',gr:'w',ng:'g'},KL={ph:'Alternar Draft/Partida',sa:'+Set Azul',sr:'+Set Vermelho',ga:'Jogo Azul (ajuste)',gr:'Jogo Vermelho (ajuste)',ng:'Próximo jogo (troca mapa e volta ao Draft)'};
const KEYS=()=>({...KD,...JSON.parse(localStorage.bscast_keys||'{}')});
function act(s,a,d=1){
 if(a=='ph'&&s.ph!='setup')s.ph=s.ph=='draft'?'match':'draft';
 if(a=='ga'||a=='gr'){const t=a=='ga'?0:1;s.sc[t]=Math.max(0,s.sc[t]+d)}
 if(a=='sa'||a=='sr'){const t=a=='sa'?0:1,w=s.rd[t];if(d>0&&w>=2)return s;s.rd[t]=Math.max(0,w+d);if(d>0&&w==1)s.sc[t]++;if(d<0&&w==2)s.sc[t]--}
 if(a=='ng'&&d>0){s.cur=Math.min(s.cur+1,s.mp.length-1);s.first=1-s.first;s.sl=Object.fromEntries(Object.entries(s.sl).filter(([x])=>x[0]=='g'));s.rd=[0,0];s.ph='draft';s.ck='';s.t0=Date.now()}
 return s}
function keysUI(el){const k=KEYS();el.innerHTML=Object.keys(KL).map(a=>`<label>${KL[a]} <input class=ky readonly value="${k[a].toUpperCase()}" onkeydown="bind(event,'${a}',this)"></label>`).join('')}
function bind(e,a,i){e.preventDefault();e.stopPropagation();if(e.key.length>1)return;const k=KEYS();k[a]=e.key.toLowerCase();localStorage.bscast_keys=JSON.stringify(k);i.value=e.key.toUpperCase()}
function hot(e,fn){if(/input|select/i.test(e.target.tagName))return;const k=KEYS(),a=Object.keys(k).find(x=>k[x]==e.key.toLowerCase());if(a)fn(a,e.shiftKey?-1:1)}
