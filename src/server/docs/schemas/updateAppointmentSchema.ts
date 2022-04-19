export const updateAppointmentSchema = {
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
    vaccinated: {
      type: 'boolean',
      default: 'false',
    },
  },
  required: ['name', 'birth_date', 'appointment_date', 'vaccinated'],
};
