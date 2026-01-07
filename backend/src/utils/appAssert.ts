import assert from "node:assert"
import AppError from "./AppError"
import { HttpStatusCode } from "../constants/http";
import AppErrorCode from "../constants/appErrorCode";

// asserts a condition and throws an AppError if the condition is falsy.

type AppAssert = (
    condition: any,
    httpStatusCode: HttpStatusCode,
    message: string,
    appErrorCode?: AppErrorCode
) => asserts condition;

const appAssert: AppAssert= (
    condition,
    HttpStatusCode,
    message,
    appErrorCode
) =>assert(condition, new AppError(HttpStatusCode, message, appErrorCode));

export default appAssert;