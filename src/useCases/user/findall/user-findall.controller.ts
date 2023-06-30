import { BaseController, StatusCode } from "@expressots/core";
import { controller, httpGet, response } from "inversify-express-utils";
import { Response } from "express";
import { FindAllUserUseCase } from "./user-findall.usecase";
import { BadRequestError, ConflictError, NoContentError } from "../user-errors";

@controller("/users")
class UserFindallController extends BaseController {
    constructor(private findallUserUseCase: FindAllUserUseCase) {
        super("findall-user-controller");
    }

    @httpGet("/")
    async execute(@response() res: Response): Promise<void> {
        try {
            const result = await this.findallUserUseCase.execute();
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

export { UserFindallController };
