# BSCast – overlays OBS para Brawl Stars competitivo
Site estático (GitHub Pages), sem servidor.
- `index.html` – painel em etapas (tipo → campeonato → times → mapas → regras → draft/transmissão).
- `overlay.html` – tela secundária: mostra o overlay de **draft** (inferior) ou de **partida** (superior) conforme a fase. `?bg=green` = fundo chroma key; `?only=draft|match` = só uma fase.

## OBS
Botão **Abrir tela secundária** → *Captura de janela* + filtro *Chroma Key* verde. Ou doca de navegador (`index.html`) + fonte de navegador 1920x1080 (`overlay.html`).
Atalhos editáveis no painel e na tela secundária (F2). Configure mapas sugeridos e nomes dos ícones em `config.js`.
Dados/imagens: BrawlAPI (api.brawlapi.com, não oficial, CORS livre).
