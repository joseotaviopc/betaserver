import { provide } from "inversify-binding-decorators";
import { UserRepository } from "@repositories/user/user.repository";
import { NoContentError } from "../user-errors";
import { IUserWithoutPassword } from "@repositories/user/user.dto";

@provide(FindAllUserUseCase)
class FindAllUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<IUserWithoutPassword[]> {
        const users = await this.userRepository.findAll();
        if (!users) {
            throw new NoContentError("No users found");
        }
        return users;
    }
}

export { FindAllUserUseCase };
