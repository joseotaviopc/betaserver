import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import { IUserFindRequestDTO, IUserFindResponseDTO } from "./user-find.dto";
import {
    BadRequestError,
    ConflictError,
    InternalServerError,
    NoContentError,
} from "../user-errors";

@provide(UserFindUseCase)
class UserFindUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(
        payload: IUserFindRequestDTO,
    ): Promise<IUserFindResponseDTO | null> {
        try {
            const userExists = await this.userRepository.findByEmail(
                payload.email,
            );

            if (!userExists || !userExists.id)
                throw new NoContentError("User not found");

            return {
                message: "user found successfully",
                user: {
                    ...userExists,
                },
            };
        } catch (e) {
            if (e instanceof BadRequestError) {
                throw new BadRequestError("BadRequestError");
            } else if (e instanceof ConflictError) {
                throw new ConflictError(e.message);
            } else if (e instanceof NoContentError) {
                throw new NoContentError(e.message);
            } else {
                throw new InternalServerError("InternalServerError");
            }
        }
    }
}

export { UserFindUseCase };
