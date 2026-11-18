# Acervo Aberto

Catálogo público em React para instituições de ensino divulgarem projetos de extensão, iniciação científica e pesquisa. **[Abrir a demonstração](https://heliastorres.github.io/acervo-aberto/)**.

Projeto de **Helias Torres Oliveira**, desenvolvido para Práticas de Extensão I do Bacharelado em Ciência da Computação do IFPR Câmpus Pinhais. A demonstração contém três projetos fictícios. Os contatos em `example.org` servem para ilustrar a interface.

## 1. Executar no computador

Instale o Node.js 24 LTS com npm. No terminal, dentro da pasta do projeto, execute:

```sh
npm ci
npm run dev
```

Abra o endereço local indicado no terminal. O comando acompanha as alterações nos componentes. Para encerrar, pressione Control + C.

## 2. Montar o catálogo da instituição

1. Use **Use this template** no GitHub para criar sua cópia.
2. Abra [src/acervo.js](src/acervo.js). No objeto `instituicao`, troque o nome, a apresentação e a URL do repositório. Em `destaque`, informe o identificador do projeto que deseja mostrar na capa.
3. Na lista `projetos`, copie uma ficha e atribua um `id` único, como `horta-comunitaria`. Mantenha esse identificador nas atualizações para preservar os links compartilhados. Preencha título, modalidade, área, situação, resumo, descrição, equipe e e-mail institucional.
4. Coloque uma imagem em [public/imagens](public/imagens) e indique o caminho em `imagem`, por exemplo, `imagens/horta.webp`. Em `textoAlternativo`, descreva brevemente o que aparece na imagem. Prefira imagens leves e que sua equipe tenha autorização para publicar.
5. Substitua todos os exemplos e contatos antes de ajustar `demonstracao` para `false`. Adapte a página “Sobre” em [src/main.jsx](src/main.jsx), o título e a descrição de [public/index.html](public/index.html) e a marca em [public/marca.svg](public/marca.svg). Altere a paleta em [src/site.css](src/site.css).

**Como funciona.** As modalidades e situações dos filtros são obtidas da lista de projetos. A busca compara o termo com título, resumo, modalidade, área e equipe, ignorando acentos e maiúsculas. Cada ficha tem um endereço próprio, como `#/projeto/ecosala`. A consulta dispensa login. A atualização dos dados ocorre no repositório.

## 3. Testar e publicar

Execute `npm run build` para gerar a versão estática em `dist/`. Para conferir, sirva essa pasta por HTTP, por exemplo com `python3 -m http.server 4173 --directory dist`, e abra `http://localhost:4173`.

- Verifique se uma busca sem acentos encontra o projeto esperado.
- Combine os filtros, limpe uma busca sem resultados e abra uma ficha.
- Abra o link da ficha em outra aba e confira se o botão de contato usa o mesmo e-mail exibido na tela.
- Percorra os controles com Tab e Enter. Verifique a leitura no celular e no computador.

Para publicar sua cópia no GitHub Pages, entre em **Settings → Pages** e escolha **GitHub Actions** como origem. Envie as alterações para a branch `main` ou execute a ação **Publicar catálogo** na aba **Actions**. O endereço publicado aparece em **Settings → Pages**. A pasta `dist/` também pode ser servida por outra hospedagem estática.

## Licença

O código e as três ilustrações originais estão disponíveis sob a [licença MIT](LICENSE). A fonte DM Sans acompanha sua licença no pacote correspondente.
