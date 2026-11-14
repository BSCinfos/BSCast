# BSCast – overlays OBS para Brawl Stars competitivo
Site estático (GitHub Pages): sem servidor, sem instalação.

- `index.html` – painel de controle (configuração, draft por clique, placar).
- `overlay.html` – tela secundária: mostra sozinha o overlay de **draft** (inferior) ou de **partida** (superior) conforme a fase.

## Uso
1. Abra o painel e clique em **Abrir tela secundária**: abre uma janela (fundo verde).
2. No OBS: *Captura de janela* → essa janela → filtro *Chroma Key* (verde). Ou, no OBS, *Doca de navegador* com `index.html` + *Fonte de navegador* 1920x1080 com `overlay.html` (compartilham o mesmo armazenamento).
3. Teclas: `N` draft/partida · `Q/W` jogos · `A/S` sets · `G` próximo jogo · `Shift`+tecla desfaz.

Dados e imagens: API não oficial Brawlify. Painel e overlay precisam estar na mesma origem/navegador.
