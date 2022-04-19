import {
  errorSchema,
  appointmentSchema,
  createAppointmentSchema,
  updateAppointmentSchema,
  paramErrorSchema,
} from './schemas/';

export default {
  appointment: appointmentSchema,
  createAppointment: createAppointmentSchema,
  updateAppointment: updateAppointmentSchema,
  error: errorSchema,
  paramError: paramErrorSchema,
};
