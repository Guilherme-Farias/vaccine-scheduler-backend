/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IParamErrors {
  [param: string]: string;
}
export interface IValidation<T = any> {
  validate(params: T): IParamErrors;
}
