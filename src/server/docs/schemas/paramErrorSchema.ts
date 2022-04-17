export const paramErrorSchema = {
  type: 'object',
  properties: {
    field: {
      type: 'string',
    },
  },
  required: ['error'],
};
