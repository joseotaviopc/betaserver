import { BaseController, StatusCode } from "@expressots/core";
import {
    controller,
    httpDelete,
    requestParam,
    response,
} from "inversify-express-utils";
import { Response } from "express";
import { IUserDeleteRequestDTO } from "./user-delete.dto";
import { UserDeleteUseCase } from "./user-delete.usecase";
import { BadRequestError, ConflictError, NotFoundError } from "../user-errors";

@controller("/user/delete")
class UserDeleteController extends BaseController {
    constructor(private userDeleteUseCase: UserDeleteUseCase) {
        super("user-delete-controller");
    }

    @httpDelete("/:id")
    async execute(
        @requestParam() payload: IUserDeleteRequestDTO,
        @response() res: Response,
    ): Promise<void> {
        try {
            const result = await this.userDeleteUseCase.execute(payload);
            res.status(StatusCode.OK).json(result);
        } catch (error) {
            if (error instanceof BadRequestError) {
                res.status(StatusCode.BadRequest).json({
                    message: error.message,
                });
            } else if (error instanceof ConflictError) {
                res.status(StatusCode.Conflict).json({
                    message: error.message,
                });
            } else if (error instanceof NotFoundError) {
                res.status(StatusCode.NotFound).json({
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

export { UserDeleteController };
