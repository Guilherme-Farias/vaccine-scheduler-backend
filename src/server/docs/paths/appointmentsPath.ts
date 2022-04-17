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
};
