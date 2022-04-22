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
  makeUpdateAppointmentControllerRequest,
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

  describe('GET /appointments/:id', () => {
    it('should return 200 with data on success', async () => {
      const postResponse = await request(app)
        .post(path)
        .send(makeCreateAppointmentControllerRequest())
        .expect(201);

      const getResponse = await request(app)
        .get(`${path}/${postResponse.body.id}`)
        .expect(200);

      expect(getResponse.body).toEqual(postResponse.body);
    });

    it('should return 404 if not find the appointment', async () => {
      await request(app).get(`${path}/invalid_id`).expect(404);
    });
  });

  describe('PUT /appointments/:id', () => {
    it('should return 200 on update appointment', async () => {
      const { body } = await request(app)
        .post(path)
        .send(makeCreateAppointmentControllerRequest())
        .expect(201);

      const response = await request(app)
        .put(`${path}/${body.id}`)
        .send(
          makeUpdateAppointmentControllerRequest({
            vaccinated: true,
          }),
        )
        .expect(200);

      expect(response.body.vaccinated).toBe(true);
    });

    it('should return 404 if not find the appointment', async () => {
      await request(app)
        .put(`${path}/invalid_id`)
        .send(
          makeUpdateAppointmentControllerRequest({
            vaccinated: true,
          }),
        )
        .expect(404);
    });

    it('should return 400 if an invalid data is provided', async () => {
      const invalidData = {};
      const { body } = await request(app)
        .post(path)
        .send(makeCreateAppointmentControllerRequest())
        .expect(201);

      await request(app)
        .put(`${path}/${body.id}`)
        .send(invalidData)
        .expect(400);
    });
  });

  describe('PATCH /appointments/:id/vaccine', () => {
    it('should return 200 on update appointment', async () => {
      const { body } = await request(app)
        .post(path)
        .send(makeCreateAppointmentControllerRequest())
        .expect(201);

      const response = await request(app)
        .patch(`${path}/${body.id}/vaccine`)
        .expect(200);

      expect(response.body.vaccinated).toBe(!body.vaccinated);
    });

    it('should return 404 if not find the appointment', async () => {
      await request(app).patch(`${path}/invalid_id/vaccine`).expect(404);
    });
  });
});
