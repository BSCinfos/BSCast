# BSC Broadcast – overlays OBS para Brawl Stars competitivo
Painel + 2 overlays (draft inferior e partida superior). Sem dependências além do Node 18+.

## Uso
1. `npm start` → abra http://localhost:3000 (painel).
2. No OBS, adicione 2 *Fontes de navegador* 1920x1080: `http://localhost:3000/overlay-draft.html` e `.../overlay-match.html` (cada uma só aparece na sua fase).
3. Opcional: adicione o painel como *Doca de navegador* do OBS.
4. Configure, vá ao draft, clique slot → brawler. `N` alterna draft/partida; `Q/W` jogos; `A/S` sets; `G` próximo jogo (troca quem começa e limpa picks/bans; bans globais permanecem e ficam bloqueados).

Dados e imagens: API não oficial Brawlify (`api.brawlify.com/v1`), com cache em localStorage. Logos padrão em `public/assets`.
