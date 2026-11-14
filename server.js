// Servidor sem dependências: serve /public e sincroniza estado via SSE.
const http=require('http'),fs=require('fs'),path=require('path');
const P=path.join(__dirname,'public'),SF=path.join(__dirname,'state.json');
let state='{}';try{state=fs.readFileSync(SF,'utf8')}catch{}
const cl=new Set(),T={'.html':'text/html;charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png'};
http.createServer((q,r)=>{
 if(q.url=='/events'){r.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache'});r.write('data:'+state+'\n\n');cl.add(r);q.on('close',()=>cl.delete(r));return}
 if(q.url=='/state'&&q.method=='POST'){let b='';q.on('data',d=>b+=d);q.on('end',()=>{state=b;fs.writeFile(SF,b,()=>{});cl.forEach(c=>c.write('data:'+b+'\n\n'));r.end('ok')});return}
 const u=q.url.split('?')[0],f=path.join(P,u=='/'?'control.html':u);
 if(!f.startsWith(P))return r.end();
 fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});r.end(d)});
}).listen(3000,()=>console.log('Painel: http://localhost:3000'));
