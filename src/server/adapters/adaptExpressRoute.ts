import { Request, Response } from 'express';
import { IController } from '@/shared/protocols';

export const adaptExpressRoute =
  (controller: IController) => async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
    };
    const { statusCode, body } = await controller.handle(request);
    res.status(statusCode).json(body);
  };
