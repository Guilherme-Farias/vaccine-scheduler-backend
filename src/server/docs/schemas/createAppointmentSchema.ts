export const createAppointmentSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'Jane Doe',
    },
    birth_date: {
      type: 'string',
      format: 'date-time',
    },
    appointment_date: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: ['name', 'birth_date', 'appointment_date'],
};
