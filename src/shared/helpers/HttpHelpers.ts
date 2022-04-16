/* eslint-disable @typescript-eslint/no-explicit-any */
import { IHttpResponse, IParamErrors } from '../protocols';

type ErrorProps = {
  errorMsg?: string;
};

export const created = (data: any): IHttpResponse => ({
  statusCode: 201,
  body: data,
});

type BadRequestProps = {
  params?: IParamErrors;
} & ErrorProps;
export const badRequest = ({
  errorMsg = 'Bad Request',
  params,
}: BadRequestProps): IHttpResponse => ({
  statusCode: 400,
  body: {
    error: errorMsg,
    ...(params ? { params } : {}),
  },
});

type ForbiddenProps = ErrorProps;
export const forbidden = ({
  errorMsg = 'Forbidden',
}: ForbiddenProps): IHttpResponse => ({
  statusCode: 403,
  body: { error: errorMsg },
});

type ServerErrorProps = ErrorProps;
export const serverError = ({
  errorMsg = 'Erro no servidor',
}: ServerErrorProps): IHttpResponse => ({
  statusCode: 500,
  body: { error: errorMsg },
});
