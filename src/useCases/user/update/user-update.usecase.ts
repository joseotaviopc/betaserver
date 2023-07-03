import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import {
    IUserUpdateRequestDTO,
    IUserUpdateResponseDTO,
} from "./user-update.dto";
import {
    BadRequestError,
    ConflictError,
    InternalServerError,
    NotFoundError,
} from "../user-errors";

@provide(UserUpdateUseCase)
class UserUpdateUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(
        payload: IUserUpdateRequestDTO,
    ): Promise<IUserUpdateResponseDTO | null> {
        try {
            const userExists = await this.userRepository.findByEmail(
                payload.email,
            );

            if (!userExists || !userExists.id)
                throw new NotFoundError("User not found");

            const { id, name, lastName } = userExists;

            const updatedUser = await this.userRepository.update(id, {
                name: payload.name || name,
                email: payload.email,
                lastName: payload.lastName || lastName,
                city: payload.city || undefined,
                state: payload.state || undefined,
                gender: payload.gender || undefined,
                height: payload.height || undefined,
                photo: payload.photo || undefined,
                skills: payload.skills || [],
            });

            if (!updatedUser)
                throw new InternalServerError("Error updating user");

            return {
                message: "user updated successfully",
                user: {
                    ...updatedUser,
                },
            };
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

export { UserUpdateUseCase };
