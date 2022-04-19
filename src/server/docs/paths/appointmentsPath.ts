export const appointmentsPath = {
  post: {
    tags: ['Agendamentos'],
    summary: 'API para criar um agendamento',
    description:
      'Para esta rota da API deve ser enviado \n- **name**; \n- **birth_date** (deve ser menor que a data atual);\n- **appointment_date** (deve ser maior que a data atual).',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createAppointment',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Criado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/appointment',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  get: {
    tags: ['Agendamentos'],
    summary: 'API para listar agendamentos',
    description: 'Sem descrição',
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/schemas/appointment',
              },
            },
          },
        },
      },
      204: {
        description: 'Sucesso, mas sem dados para exibir',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
