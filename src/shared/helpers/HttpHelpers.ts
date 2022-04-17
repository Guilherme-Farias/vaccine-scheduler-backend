/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHttpResponse, IParamErrors } from '../protocols';

type ErrorProps = {
  errorMsg: string;
};

export const created = (data: any): IHttpResponse => ({
  statusCode: 201,
  body: data,
});

type BadRequestProps = {
  params?: IParamErrors;
} & ErrorProps;
export const badRequest = (
  { errorMsg, params }: BadRequestProps = {
    errorMsg: 'Bad Request',
  },
): IHttpResponse => ({
  statusCode: 400,
  body: {
    error: errorMsg,
    ...(params ? { params } : {}),
  },
});

type ForbiddenProps = ErrorProps;
export const forbidden = (
  { errorMsg }: ForbiddenProps = {
    errorMsg: 'Forbidden',
  },
): IHttpResponse => ({
  statusCode: 403,
  body: { error: errorMsg },
});

type ServerErrorProps = ErrorProps;
export const serverError = (
  { errorMsg }: ServerErrorProps = {
    errorMsg: 'Internal Server Error',
  },
): IHttpResponse => ({
  statusCode: 500,
  body: { error: errorMsg },
});
