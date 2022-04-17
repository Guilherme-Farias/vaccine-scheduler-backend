export const badRequest = {
  description: 'Requisição inválida',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
          },
          params: {
            $ref: '#/schemas/paramError',
          },
        },
        required: ['error'],
      },
    },
  },
};
