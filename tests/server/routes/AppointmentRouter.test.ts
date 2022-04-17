/**
 * @jest-environment ./src/infra/prisma/prisma-test-environment
 */

import { Express } from 'express';
import request from 'supertest';

import { prisma } from '@/infra/prisma';
import { setupApp } from '@/server/config/app';
import {
  makeCreateAppointmentControllerRequest,
  makeCreateAppointmentControllerRequestList,
} from '@/tests/mocks';

describe('AppointmentRouter', () => {
  let app: Express;
  const path = '/api/appointments';

  beforeAll(async () => {
    app = await setupApp();
  });

  beforeEach(async () => {
    await prisma.appointment.deleteMany({});
  });

  describe('GET /appointments', () => {
    it('should return 204 if return has no data', async () => {
      await request(app).get(path).expect(204);
    });

    it('should return 200 with data on success', async () => {
      await request(app)
        .post(path)
        .send(makeCreateAppointmentControllerRequest())
        .expect(201);

      const response = await request(app).get(path).expect(200);
      expect(response.body.length).toBe(1);
    });

    it('should return 403 if the given date has a appointments number greater than or equal to 20', async () => {
      const { httpRequest, httpRequests } =
        makeCreateAppointmentControllerRequestList({
          quantity: 20,
        });

      await Promise.all(
        httpRequests.map(async req => {
          await request(app).post(path).send(req);
        }),
      );

      await request(app).post(path).send(httpRequest).expect(403);
    });

    it('should return 403 if the given time has a number of appointments greater than or equal to 2', async () => {
      const httpRequest = makeCreateAppointmentControllerRequest();

      await Promise.all(
        [...Array(2).keys()].map(async () => {
          await request(app).post(path).send(httpRequest);
        }),
      );

      await request(app).post(path).send(httpRequest).expect(403);
    });
  });

  describe('POST /appointments', () => {
    it('should return 201 on create appointment', async () => {
      const response = await request(app)
        .post(path)
        .send(makeCreateAppointmentControllerRequest())
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.vaccinated).toBe(false);
    });

    it('should return 400 if an invalid data is provided', async () => {
      const invalidData = {};
      await request(app).post(path).send(invalidData).expect(400);
    });

    it('should return 403 if the given date has a appointments number greater than or equal to 20', async () => {
      const { httpRequest, httpRequests } =
        makeCreateAppointmentControllerRequestList({
          quantity: 20,
        });

      await Promise.all(
        httpRequests.map(async req => {
          await request(app).post(path).send(req);
        }),
      );

      await request(app).post(path).send(httpRequest).expect(403);
    });

    it('should return 403 if the given time has a number of appointments greater than or equal to 2', async () => {
      const httpRequest = makeCreateAppointmentControllerRequest();

      await Promise.all(
        [...Array(2).keys()].map(async () => {
          await request(app).post(path).send(httpRequest);
        }),
      );

      await request(app).post(path).send(httpRequest).expect(403);
    });
  });
});
