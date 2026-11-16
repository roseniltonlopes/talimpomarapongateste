# Talimpo Maraponga · site do Alvejante Premium

Next.js 16 + TypeScript + GSAP (ScrollTrigger, SplitText) + Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Publicar no GitHub Pages

O build estático vai para o branch `gh-pages` (Settings > Pages > Branch `gh-pages`, pasta `/`).

```bash
# Git Bash: MSYS_NO_PATHCONV evita que /talimpomarapongateste vire caminho do Windows
MSYS_NO_PATHCONV=1 MSYS2_ENV_CONV_EXCL='*' PAGES_BASE_PATH=/talimpomarapongateste npm run build
touch out/.nojekyll
cd out && git init -q -b gh-pages && git add -A && git commit -qm "deploy"   && git push -f https://github.com/roseniltonlopes/talimpomarapongateste.git gh-pages
```

## Estrutura

- `src/components/HeroFlight.tsx`: hero e palco do produto. O frasco mora no palco e é deslocado até o encaixe da hero; a rolagem o leva de volta (lógica do thunder-buns).
- `src/data/site.ts`: contatos, preços e textos. **Preços consultados em 16/11/2026** na loja online; atualize antes de publicar.
- `src/app/globals.css`: tokens e estilos. Breakpoint único em 900px.
- Sem JS ou com "reduzir movimento", o site fica estático e completo.

## Origem das imagens

- Logo, mascote Tatá e fotos dos produtos: loja.talimpomarapongaoficial.com.br (fundo removido com rembg).
- Fotos da loja e da equipe: Instagram @talimpomarapongaoficial (resolução baixa, 480 a 640 px; peça os originais ao cliente).
- Cenas: Unsplash, licença Unsplash (uso comercial livre, sem atribuição obrigatória). Origem `images.unsplash.com/photo-<id>`:
  seda `1620763049765-27475b5ff3fb` · cesto `1582735689369-4fe89db7114c` · lavanderia `1626806787461-102c1bfaaea1` · varal `1686381798186-1143568fa656` · cama `1601276174812-63280a55656e` · cozinha `1556911220-bff31c812dba` · banheiro `1552321554-5fefe8c9ef14` · balde `1749214317455-efbdd57df844` · carro `1633014041037-f5446fb4ce99` · roupas `1562157873-818bc0726f68` · toalhas `1684248655527-46bee8e79029` · chao `1758273238415-01ec03d9ef27`

## Pendências

- Confirmar com o cliente o uso das fotos do Instagram e do mascote.
- Pedir as instruções de uso exatas do rótulo para detalhar a seção "Como usar".
