const API='https://api.brawlify.com/v1/'; // API não oficial (Brawlify)
let BR={},BRL=[];
async function j(u,f){const k='c_'+u;try{const r=(await(await fetch(API+u)).json()).list.map(f);try{localStorage[k]=JSON.stringify(r)}catch{}return r}catch{return JSON.parse(localStorage[k]||'[]')}}
async function loadBr(){BRL=await j('brawlers',b=>({id:b.id,name:b.name,imageUrl:b.imageUrl,imageUrl2:b.imageUrl2}));BRL.forEach(b=>BR[b.id]={n:b.name,i:b.imageUrl2||b.imageUrl});return BRL}
// Sem servidor: painel e overlay trocam estado via localStorage + BroadcastChannel (mesma origem)
const CH=new BroadcastChannel('bscast');
function sync(cb){const rd=()=>{try{return JSON.parse(localStorage.bscast_state||'{}')}catch{return{}}};cb(rd());addEventListener('storage',e=>{if(e.key=='bscast_state')cb(rd())});CH.onmessage=m=>cb(m.data)}
const push=s=>{try{localStorage.bscast_state=JSON.stringify(s)}catch{}CH.postMessage(s)};
const OWN=f=>f==0?[0,1,1,0,0,1]:[1,0,0,1,1,0]; // dono de cada pick (1..6)
const cell=(id,c='')=>`<div class="c ${c}">${id&&BR[id]?`<img src="${BR[id].i}">`:'?'}</div>`;
function side(s,t,names){const o=OWN(s.first),pk=[0,1,2,3,4,5].filter(i=>o[i]==t);
 return{pk:pk.map((i,k)=>`<div class=pk>${cell(s.sl['p'+i])}${names?`<span>${s.tm[t].p[k]||''}</span>`:''}</div>`).join(''),
 bn:[0,1,2].map(k=>cell(s.sl[`b${t}_${k}`],'bn')).join(''),
 gb:s.gb?[0,1].map(k=>cell(s.sl[`g${t}_${k}`],'bn gb')).join(''):'',
 lg:`<img class=lg src="${s.tm[t].l||''}">`,nm:s.tm[t].n}}
