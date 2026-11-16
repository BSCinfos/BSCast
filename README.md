# BSCast – overlays OBS para Brawl Stars competitivo
Site estático (GitHub Pages), sem servidor.
- `index.html` – painel em etapas (tipo → campeonato → times → mapas → regras → draft/transmissão).
- `overlay.html` – tela secundária: mostra o overlay de **draft** (inferior) ou de **partida** (superior) conforme a fase. `?bg=green` = fundo chroma key; `?only=draft|match` = só uma fase.

## OBS
Fundo transparente: no OBS use Docas > Docas de navegador personalizadas (painel) + Fonte de navegador 1920x1080 com `overlay.html` (botão "Copiar link p/ OBS"). A janela de prévia tem fundo xadrez porque janelas do navegador não podem ser transparentes. Fontes: Lilita One (Google Fonts) e Extenda30 (coloque o arquivo em `assets/fonts/Extenda30.otf`, .ttf ou .woff2).
Atalhos editáveis no painel e na tela secundária (F2). Configure mapas sugeridos e nomes dos ícones em `config.js`.
Dados/imagens: BrawlAPI (api.brawlapi.com, não oficial, CORS livre).
