import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import {
    IUserDeleteRequestDTO,
    IUserDeleteResponseDTO,
} from "./user-delete.dto";
import {
    BadRequestError,
    ConflictError,
    InternalServerError,
    NotFoundError,
} from "../user-errors";

@provide(UserDeleteUseCase)
class UserDeleteUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(
        payload: IUserDeleteRequestDTO,
    ): Promise<IUserDeleteResponseDTO | void> {
        try {
            const userExists = await this.userRepository.find(payload.id);

            if (!userExists) throw new NotFoundError("User not found");
            if (userExists) {
                this.userRepository.delete(payload.id);
                return {
                    name: userExists.name,
                    email: userExists.email,
                    message: "user deleted successfully",
                };
            }
        } catch (e) {
            if (e instanceof BadRequestError) {
                throw new BadRequestError("BadRequestError");
            } else if (e instanceof ConflictError) {
                throw new ConflictError(e.message);
            } else if (e instanceof NotFoundError) {
                throw new NotFoundError(e.message);
            } else {
                throw new InternalServerError("InternalServerError");
            }
        }
    }
}

export { UserDeleteUseCase };
