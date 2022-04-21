export const vaccineAUserPath = {
  patch: {
    tags: ['Agendamentos'],
    summary: 'API para vacinar/remover vacinação do usuário de um agendamento.',
    description:
      'Para esta rota da API basta enviar como parâmetro de rota o **id** do agendamento.',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'ID do agendamento a ser atualizado',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Atualizado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/appointment',
            },
          },
        },
      },
      404: {
        description: 'Agendamento não encontrado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/error',
            },
          },
        },
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
