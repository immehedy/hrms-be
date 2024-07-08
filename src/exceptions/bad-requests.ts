import { ErrorCode, HttpException } from "./root";

export class BadRequestsExceptions extends HttpException {
  constructor(message: string, erroCode: ErrorCode) {
    super(message, erroCode, 400, null);
  }
}
