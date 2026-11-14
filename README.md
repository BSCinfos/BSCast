# BSCast – overlays OBS para Brawl Stars competitivo
Site estático (GitHub Pages), sem servidor.
- `index.html` – painel em etapas (tipo → campeonato → times → mapas → regras → draft/transmissão).
- `overlay.html` – tela secundária: mostra o overlay de **draft** (inferior) ou de **partida** (superior) conforme a fase. `?bg=green` = fundo chroma key; `?only=draft|match` = só uma fase.

## OBS
Botão **Abrir tela secundária** → *Captura de janela* + filtro *Chroma Key* verde. Ou doca de navegador (`index.html`) + fonte de navegador 1920x1080 (`overlay.html`).
Teclas (etapa final): `N` draft/partida · `A/S` sets · `G` próximo jogo · `Q/W` ajuste de jogo · `Shift` desfaz.
Dados/imagens: BrawlAPI (api.brawlapi.com, não oficial, CORS livre).
