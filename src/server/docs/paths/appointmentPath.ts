export const appointmentPath = {
  get: {
    tags: ['Agendamentos'],
    summary: 'API para buscar um agendamento por id',
    description:
      'Para esta rota da API basta enviar como parâmetro de rota o **id** do agendamento.',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'ID do agendamento a ser buscado',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Encontrado',
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
  put: {
    tags: ['Agendamentos'],
    summary: 'API para atualizar um agendamento',
    description:
      'Para esta rota da API deve ser enviado um \n- **name**; \n- **birth_date** (deve ser menor que a data atual);\n- **appointment_date** (deve ser maior que a data atual);\n- **vaccinated**.\n\nO agendamento será idêntificado pelo **id** enviado como parâmetro de rota',
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
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateAppointment',
          },
        },
      },
    },
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
      400: {
        $ref: '#/components/badRequest',
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
