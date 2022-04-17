import {
  errorSchema,
  appointmentSchema,
  createAppointmentSchema,
  paramErrorSchema,
} from './schemas/';

export default {
  appointment: appointmentSchema,
  createAppointment: createAppointmentSchema,
  error: errorSchema,
  paramError: paramErrorSchema,
};
