import { BaseController, StatusCode } from "@expressots/core";
import {
    controller,
    httpPost,
    requestBody,
    response,
} from "inversify-express-utils";
import { ICreateUserRequestDTO } from "./user-create.dto";
import { CreateUserUseCase } from "./user-create.usecase";
import { Response } from "express";
import {
    BadRequestError,
    ConflictError,
    InternalServerError,
} from "../user-errors";

@controller("/user/create")
class UserCreateController extends BaseController {
    constructor(private createUserUseCase: CreateUserUseCase) {
        super("create-user-controller");
    }

    @httpPost("/")
    async execute(
        @requestBody() payload: ICreateUserRequestDTO,
        @response() res: Response,
    ): Promise<void> {
        try {
            const result = await this.createUserUseCase.execute(payload);
            res.status(StatusCode.Created).json(result);
        } catch (error) {
            if (error instanceof BadRequestError) {
                res.status(StatusCode.BadRequest).json({
                    message: error.message,
                });
            } else if (error instanceof ConflictError) {
                res.status(StatusCode.Conflict).json({
                    message: error.message,
                });
            } else if (error instanceof InternalServerError) {
                res.status(StatusCode.InternalServerError).json({
                    message: error.message,
                });
            } else {
                res.status(StatusCode.InternalServerError).json({
                    message: "An internal server error occurred",
                });
            }
        }
    }
}

export { UserCreateController };
