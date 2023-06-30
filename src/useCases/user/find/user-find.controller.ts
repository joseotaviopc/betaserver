import { BaseController, StatusCode } from "@expressots/core";
import {
    controller,
    httpGet,
    requestBody,
    response,
} from "inversify-express-utils";
import { Response } from "express";
import { IUserFindRequestDTO } from "./user-find.dto";
import { UserFindUseCase } from "./user-find.usecase";
import { BadRequestError, ConflictError, NoContentError } from "../user-errors";

@controller("/user/find")
class UserFindController extends BaseController {
    constructor(private userFindUseCase: UserFindUseCase) {
        super("user-find-controller");
    }

    @httpGet("/")
    async execute(
        @requestBody() payload: IUserFindRequestDTO,
        @response() res: Response,
    ): Promise<void> {
        try {
            const { email } = payload;
            const result = await this.userFindUseCase.execute({ email });
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
            } else if (error instanceof NoContentError) {
                res.status(StatusCode.NoContent).json({
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

export { UserFindController };
