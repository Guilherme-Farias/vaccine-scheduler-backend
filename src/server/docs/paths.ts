import { appointmentPath, appointmentsPath, vaccineAUserPath } from './paths/';

export default {
  '/appointments': appointmentsPath,
  '/appointments/{id}': appointmentPath,
  '/appointments/{id}/vaccine': vaccineAUserPath,
};
