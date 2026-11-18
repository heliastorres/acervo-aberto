import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { instituicao, projetos } from './acervo.js';
import './site.css';

const catalogo = '#/acervo';
const urlProjeto = id => '#/projeto/' + encodeURIComponent(id);
const normalizar = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
const modalidades = [...new Set(projetos.map(p => p.modalidade))];
const situacoes = [...new Set(projetos.map(p => p.situacao))];
const destaque = projetos.find(p => p.id === instituicao.destaque) ?? projetos[0];

function Seta({ direcao = 'direita' }) {
  return <span aria-hidden="true" className="seta">{{ direita: '→', baixo: '↓', volta: '←', externa: '↗' }[direcao]}</span>;
}

function Cabecalho({ sobre }) {
  return <header id="/" className="topo">
    <div className="limite cabecalho">
      <a className="marca" href="#/" aria-label={instituicao.nome + ', início'}><img src="./marca.svg" width="36" height="36" alt="" />{instituicao.nome}</a>
      <nav aria-label="Principal">
        <a className={'nav-link ' + (sobre ? '' : 'atual')} href={catalogo} aria-current={sobre ? undefined : 'location'}>Projetos</a>
        <a className={'nav-link ' + (sobre ? 'atual' : '')} href="#/sobre" aria-current={sobre ? 'page' : undefined}>Sobre</a>
        <a className="botao-modelo" href={instituicao.repositorio}>Usar o modelo <Seta direcao="externa" /></a>
      </nav>
    </div>
  </header>;
}

function Capa() {
  return <section className="capa" aria-labelledby="titulo">
    <div className="capa-texto">
      <span className="rotulo capa-rotulo"><i aria-hidden="true" /> Acervo acadêmico</span>
      <h1 id="titulo">Catálogo de<br /><em>projetos.</em></h1>
      <p>{instituicao.apresentacao}</p>
      <a className="botao-claro" href={catalogo}>Explorar acervo <Seta direcao="baixo" /></a>
    </div>
    {destaque && <a className="capa-arte" href={urlProjeto(destaque.id)} aria-label={'Projeto em destaque: ' + destaque.titulo}>
      <img src={destaque.imagem} alt={destaque.textoAlternativo} fetchPriority="high" />
      <div className="legenda-arte"><div><span className="rotulo">Projeto em destaque</span><strong>{destaque.titulo}</strong></div><span className="circulo"><Seta /></span></div>
    </a>}
  </section>;
}

function Status({ valor }) {
  return <span className={'status ' + (valor === 'Concluído' ? 'concluido' : '')}><i aria-hidden="true" />{valor}</span>;
}

function Cartao({ projeto: p }) {
  return <article>
    <a className="cartao" href={urlProjeto(p.id)}>
      <div className="miniatura"><img loading="lazy" width="1200" height="730" src={p.imagem} alt={p.textoAlternativo} /><Status valor={p.situacao} /></div>
      <div className="ficha-resumo">
        <span className="rotulo modalidade">{p.modalidade}</span>
        <div className="linha-titulo"><h3>{p.titulo}</h3><Seta /></div>
        <p>{p.resumo}</p>
      </div>
    </a>
  </article>;
}

function Catalogo({ filtros, definir }) {
  const { busca, modalidade, situacao } = filtros;
  const lista = projetos.filter(p =>
    (!modalidade || p.modalidade === modalidade) && (!situacao || p.situacao === situacao) &&
    normalizar([p.titulo, p.resumo, p.modalidade, p.area, p.responsavel].join(' ')).includes(normalizar(busca)));
  const limpar = () => definir({ busca: '', modalidade: '', situacao: '' });
  return <section id="/acervo" className="catalogo" aria-labelledby="acervo-titulo">
    <div className="linha-catalogo">
      <h2 id="acervo-titulo" tabIndex="-1">Explore o acervo</h2>
      <label className="busca"><span className="lupa" aria-hidden="true" /><span className="sr">Buscar projeto, área ou equipe</span><input type="search" placeholder="Buscar projeto, área ou equipe" value={busca} onChange={e => definir({ ...filtros, busca: e.target.value })} /></label>
    </div>
    <div className="filtros">
      <div className="modalidades" role="group" aria-label="Filtrar por modalidade">
        {['', ...modalidades].map(m => <button type="button" key={m} aria-pressed={modalidade === m} onClick={() => definir({ ...filtros, modalidade: m })}>{m || 'Todos'}</button>)}
      </div>
      <label className="situacao"><span className="sr">Filtrar por situação</span><select value={situacao} onChange={e => definir({ ...filtros, situacao: e.target.value })}><option value="">Todas as situações</option>{situacoes.map(s => <option key={s}>{s}</option>)}</select></label>
    </div>
    <p className="contagem" role="status">{lista.length} {lista.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}</p>
    {lista.length ? <div className="grade">{lista.map(p => <Cartao key={p.id} projeto={p} />)}</div> : <div className="vazio"><h3>Nenhum projeto encontrado</h3><p>Tente outro termo ou ajuste os filtros.</p><button onClick={limpar} className="botao">Limpar filtros</button></div>}
  </section>;
}

function Detalhe({ p }) {
  const [mensagem, setMensagem] = useState('');
  async function copiar() {
    try {
      await navigator.clipboard.writeText(p.email);
      setMensagem('E-mail copiado.');
    } catch {
      setMensagem('Selecione e copie o endereço exibido acima.');
    }
  }
  return <div className="interna">
    <a className="voltar" href={catalogo}><Seta direcao="volta" /> Voltar ao acervo</a>
    <div className="detalhe-titulo"><span className="rotulo modalidade">{p.modalidade}</span><h1>{p.titulo}</h1><p>{p.resumo}</p></div>
    <div className="detalhe-grade"><article><img className="imagem-detalhe" src={p.imagem} alt={p.textoAlternativo} width="1200" height="730" /><h2>Sobre o projeto</h2>{p.descricao.map(t => <p key={t}>{t}</p>)}</article>
      <aside className="painel"><h2>Ficha do projeto</h2><dl><dt>Situação</dt><dd><Status valor={p.situacao} /></dd><dt>Área de atuação</dt><dd>{p.area}</dd><dt>Equipe responsável</dt><dd>{p.responsavel}</dd><dt>E-mail de contato</dt><dd><a href={'mailto:' + p.email}>{p.email}</a></dd></dl>
        <a className="botao" href={'mailto:' + p.email}>Entrar em contato <Seta direcao="externa" /></a><button className="copiar" onClick={copiar}>Copiar e-mail</button><div aria-live="polite" className="retorno">{mensagem}</div>
        {instituicao.demonstracao && <small>Projeto e contato fictícios para demonstração do modelo.</small>}
      </aside>
    </div>
  </div>;
}

function Sobre() {
  return <article className="interna sobre"><a className="voltar" href={catalogo}><Seta direcao="volta" /> Voltar ao acervo</a><span className="rotulo modalidade">Sobre o modelo</span><h1>Um acervo para sua instituição.</h1>
    <p className="introducao">Este modelo em React permite que uma faculdade, um campus ou uma escola organize uma página pública para os seus projetos.</p>
    <h2>Como surgiu</h2><p>O trabalho foi desenvolvido por Helias Torres Oliveira para a disciplina de Práticas de Extensão I, do Bacharelado em Ciência da Computação do IFPR Câmpus Pinhais. A proposta começou com uma página no WordPress institucional e passou a atender equipes de outras instituições que desejam criar o próprio catálogo.</p>
    <h2>Como adotar</h2><ol><li>Crie uma cópia do repositório na conta da sua instituição.</li><li>Troque o nome do acervo, as imagens e os dados de exemplo pelos projetos e contatos da equipe local.</li><li>Siga as instruções do README para testar e publicar o catálogo.</li></ol>
    <a className="botao" href={instituicao.repositorio}>Abrir repositório no GitHub <Seta direcao="externa" /></a></article>;
}

function App() {
  const [rota, setRota] = useState(window.location.hash || '#/');
  const [filtros, definir] = useState({ busca: '', modalidade: '', situacao: '' });
  const main = useRef(null);
  const primeira = useRef(true);
  useEffect(() => {
    const mudar = () => setRota(window.location.hash || '#/');
    window.addEventListener('hashchange', mudar);
    return () => window.removeEventListener('hashchange', mudar);
  }, []);
  const inicio = rota === '#/' || rota === catalogo;
  const sobre = rota === '#/sobre';
  const projeto = projetos.find(p => urlProjeto(p.id) === rota);
  useEffect(() => {
    document.title = (projeto?.titulo ?? (sobre ? 'Sobre o modelo' : inicio ? 'Catálogo de projetos' : 'Página não encontrada')) + ' | ' + instituicao.nome;
    if (rota === catalogo) {
      const alvo = document.getElementById('acervo-titulo');
      if (alvo) {
        alvo.focus({ preventScroll: true });
        window.scrollTo(0, window.scrollY + alvo.getBoundingClientRect().top - 24);
      }
    } else if (!primeira.current) {
      window.scrollTo(0, 0);
      main.current?.focus({ preventScroll: true });
    }
    primeira.current = false;
  }, [rota, projeto, sobre, inicio]);
  return <><a className="pular" href="#principal" onClick={e => { e.preventDefault(); main.current?.focus(); }}>Pular para o conteúdo</a><Cabecalho sobre={sobre} />
    <main id="principal" ref={main} tabIndex="-1" className="limite">
      {inicio ? <><Capa /><Catalogo filtros={filtros} definir={definir} /></> : projeto ? <Detalhe key={projeto.id} p={projeto} /> : sobre ? <Sobre /> : <div className="interna"><h1>Página não encontrada</h1><a className="botao" href={catalogo}>Voltar ao acervo</a></div>}
    </main>
    <footer><div className="limite rodape"><div><strong>{instituicao.nome}</strong><p>{instituicao.demonstracao ? 'Catálogo demonstrativo com projetos fictícios.' : 'Catálogo público de projetos acadêmicos.'}</p></div><a href="#/sobre">Sobre o modelo <Seta /></a></div></footer></>;
}

createRoot(document.getElementById('root')).render(<App />);
