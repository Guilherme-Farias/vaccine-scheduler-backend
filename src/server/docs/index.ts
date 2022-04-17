import paths from './paths';
import components from './components';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Minha vacina API',
    description:
      'Documentação feita por Guilherme Carneiro de Farias. API feita em Node, express, typescript utilizando prisma como ORM.',
    version: '1.0.0',
    contact: {
      name: 'Guilherme Carneiro de Farias',
      email: 'guicfarias11@gmail.com',
      url: 'https://www.linkedin.com/in/guilherme-farias-dev/',
    },
  },
  externalDocs: {
    description: 'Link para o github do projeto',
    url: 'https://github.com/Guilherme-Farias/vaccine-scheduler-backend',
  },
  servers: [
    {
      url: '/api',
      description: 'Servidor Principal',
    },
  ],
  tags: [
    {
      name: 'Agendamentos',
      description: 'APIs relacionadas ao agendamento das vacinas',
    },
  ],
  paths,
  schemas,
  components,
};
