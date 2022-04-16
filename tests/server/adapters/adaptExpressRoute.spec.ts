import { Request, RequestHandler, Response, NextFunction } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { mock, MockProxy } from 'jest-mock-extended';

import { adaptExpressRoute } from '@/server/adapters';
import { IController } from '@/shared/protocols';
import { serverError } from '@/shared/helpers';

describe('ExpressRouter', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let controller: MockProxy<IController>;
  let sut: RequestHandler;

  beforeAll(() => {
    req = getMockReq({ body: { any: 'any' } });
    res = getMockRes().res;
    next = getMockRes().next;
    controller = mock();
    controller.handle.mockResolvedValue({
      statusCode: 200,
      body: { data: 'any_data' },
    });
  });

  beforeEach(() => {
    sut = adaptExpressRoute(controller);
  });

  it('should call handle with correct request', async () => {
    await sut(req, res, next);

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' });
    expect(controller.handle).toHaveBeenCalledTimes(1);
  });

  it('should call handle with empty request', async () => {
    const req = getMockReq();

    await sut(req, res, next);

    expect(controller.handle).toHaveBeenCalledWith({});
    expect(controller.handle).toHaveBeenCalledTimes(1);
  });

  it('should respond with 200 and valid data', async () => {
    await sut(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ data: 'any_data' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it('should respond with 500 and valid error', async () => {
    controller.handle.mockResolvedValueOnce(serverError());

    await sut(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
