import { BaseController, StatusCode } from "@expressots/core";
import {
    controller,
    httpPatch,
    requestBody,
    requestParam,
    response,
} from "inversify-express-utils";
import { Response } from "express";
import {
    IUserUpdateRequestDTO,
    IUserUpdateResponseDTO,
} from "./user-update.dto";
import { UserUpdateUseCase } from "./user-update.usecase";
import { BadRequestError, ConflictError, NotFoundError } from "../user-errors";

@controller("/user/update")
class UserUpdateController extends BaseController {
    constructor(private userUpdateUseCase: UserUpdateUseCase) {
        super("user-update-controller");
    }

    @httpPatch("/:email")
    async execute(
        @requestParam("email") email: string,
        @requestBody() payload: IUserUpdateRequestDTO,
        @response() res: Response,
    ): Promise<IUserUpdateResponseDTO | void> {
        try {
            const data = { ...payload, email };

            const result = await this.userUpdateUseCase.execute(data);
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

export { UserUpdateController };
