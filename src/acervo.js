// Personalize a instituição, o repositório e os projetos neste arquivo.
// Os endereços example.org identificam contatos fictícios da demonstração.
export const instituicao = {
  nome: 'Acervo Aberto',
  demonstracao: true,
  repositorio: 'https://github.com/heliastorres/acervo-aberto',
  destaque: 'herbario-de-bairro',
  apresentacao: 'Conheça projetos de extensão, iniciação científica e pesquisa e encontre as equipes responsáveis.'
};

export const projetos = [
  {
    id: 'ecosala',
    titulo: 'EcoSala',
    modalidade: 'Extensão',
    area: 'Tecnologia e sustentabilidade',
    situacao: 'Em andamento',
    resumo: 'Monitoramento do consumo de energia em laboratórios de informática.',
    descricao: [
      'O EcoSala ilustra como uma equipe pode investigar o consumo de energia dos computadores de um laboratório. A proposta é observar como a demanda varia entre horários de aula e períodos de ociosidade.',
      'Os registros servem como ponto de partida para conversar com estudantes e equipes locais sobre hábitos de uso dos equipamentos. Uma instituição que adotar o modelo pode publicar aqui sua metodologia e as formas de participação.'
    ],
    responsavel: 'Equipe EcoSala',
    email: 'ecosala@example.org',
    imagem: 'imagens/ecosala.webp',
    textoAlternativo: 'Ilustração de uma placa de circuito com um sinal elétrico ao centro.'
  },
  {
    id: 'herbario-de-bairro',
    titulo: 'Herbário de bairro',
    modalidade: 'Iniciação científica',
    area: 'Botânica',
    situacao: 'Em andamento',
    resumo: 'Um inventário ilustrado das plantas encontradas no entorno da instituição.',
    descricao: [
      'Neste exemplo, estudantes registram as plantas observadas em praças e jardins do bairro. Cada ficha reúne uma ilustração, o local de observação e características que ajudam a reconhecer a planta.',
      'O acervo aproxima o estudo de botânica das espécies que a comunidade encontra no caminho de casa. A equipe local pode usar esta página para explicar como os moradores podem contribuir com novas observações.'
    ],
    responsavel: 'Equipe do herbário',
    email: 'herbario@example.org',
    imagem: 'imagens/herbario.webp',
    textoAlternativo: 'Prancha botânica com frondes de samambaia sobre uma grade verde.'
  },
  {
    id: 'rios-do-entorno',
    titulo: 'Rios do entorno',
    modalidade: 'Pesquisa',
    area: 'Geografia e meio ambiente',
    situacao: 'Concluído',
    resumo: 'Cartografia dos cursos de água que atravessam os bairros próximos ao campus.',
    descricao: [
      'O projeto exemplifica um levantamento de pequenos rios urbanos. A proposta combina leitura de mapas com observações de campo para identificar por onde a água passa e quais trechos são visíveis à comunidade.',
      'A ficha de um projeto concluído pode reunir uma síntese do percurso e o contato da equipe. Quem tiver interesse em retomar o levantamento poderá localizar essas informações mesmo após o encerramento das atividades.'
    ],
    responsavel: 'Equipe de cartografia',
    email: 'rios@example.org',
    imagem: 'imagens/rios.webp',
    textoAlternativo: 'Mapa ilustrativo com um rio sinuoso entre curvas de nível.'
  }
];
