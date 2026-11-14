# BSCinfos Broadcast — Brawl Stars

Sistema local de transmissão competitiva com duas saídas transparentes para OBS:

- **Tela 1 — Draft inferior:** barra de draft na parte inferior, com campeonato, modo/mapa, bans, picks e placar da série.
- **Tela 2 — Partida superior:** overlay compacto no topo com logos, picks, bans, placar da série e sets da partida atual.
- **Controle:** painel separado para configurar torneio/scrim, fazer bans/picks e atualizar os placares. O painel de controle não precisa ser capturado no OBS.

## Como iniciar

1. Extraia o ZIP.
2. No Windows, dê dois cliques em `iniciar.bat`. (É necessário ter Python 3 instalado.)
3. Abra `http://localhost:8000/controle.html` no navegador.
4. No OBS, adicione **Fonte > Navegador** e use:
   - Draft inferior: `http://localhost:8000/overlay.html?tela=draft`
   - Partida superior: `http://localhost:8000/overlay.html?tela=partida`
5. Configure a resolução/tamanho da fonte de navegador no OBS. As páginas de overlay têm fundo transparente.

As duas páginas do OBS leem o mesmo estado salvo pelo painel de controle. Mantenha painel e OBS no mesmo computador e no mesmo endereço `localhost:8000`.

## Fluxo básico

- Escolha **Torneio** ou **Scrim**.
- Em torneio, escolha MD3/MD5/MD7, sequência de modos/mapas, campeonato, times, jogadores e mapa inicial.
- Selecione quem começa o draft. Com azul iniciando, a ordem é Azul, Vermelho, Vermelho, Azul, Azul, Vermelho.
- Ative bans globais se necessário. Cada time pode marcar dois; eles ficam bloqueados nos picks de todas as partidas da série.
- Faça três bans da partida e seis picks.
- No painel, use os controles de placar para atualizar série e sets. O estado é refletido nas duas saídas do OBS.

## Dados do jogo

O sistema carrega brawlers, modos e mapas da BrawlAPI (`https://api.brawlapi.com`), uma API comunitária não oficial, sem chave. Os campos de imagem retornados pela API são usados diretamente. A lista de mapas pode conter mapas antigos/desativados; o seletor prioriza mapas ativos e permite pesquisar.

A BrawlAPI é uma fonte externa: se estiver fora do ar ou mudar o formato, a seleção pode ficar sem imagens/dados até a API voltar. O painel mostra um aviso e permite recarregar os dados.

## Observações

- O estado é salvo no `localStorage` do navegador. Faça backup/exportação se precisar guardar uma configuração: use o botão **Exportar JSON** no painel.
- Para usar em outro computador, copie a pasta e abra o painel/overlays nesse computador.
- Este projeto é uma base inicial editável, pronta para versionar no GitHub. Não é afiliado à Supercell. Brawl Stars e seus assets pertencem aos respectivos titulares.
