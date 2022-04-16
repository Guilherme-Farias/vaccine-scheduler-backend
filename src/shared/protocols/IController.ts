/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHttpResponse } from './IHttp';

export interface IController<T = any> {
  handle(request: T): Promise<IHttpResponse>;
}
