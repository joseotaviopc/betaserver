import { User } from "@entities/user.entity";
import { UserRepository } from "@repositories/user/user.repository";
import { provide } from "inversify-binding-decorators";
import { ICreateUserRequestDTO } from "./user-create.dto";
import {
    BadRequestError,
    ConflictError,
    InternalServerError,
} from "../user-errors";
import { randomUUID } from "node:crypto";

@provide(CreateUserUseCase)
class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(payload: ICreateUserRequestDTO) {
        try {
            const { name, email, password, lastName } = payload;
            console.log("payload ", JSON.stringify(payload, null, 4));

            if (!name) {
                throw new BadRequestError("name is required");
            }
            if (!email) {
                throw new BadRequestError("email is required");
            }
            if (!password) {
                throw new BadRequestError("password is required");
            }
            if (!lastName) {
                throw new BadRequestError("lastName is required");
            }

            // Check if user exists
            const userExists = await this.userRepository.findByEmail(email);
            console.log("userExists ", JSON.stringify(userExists, null, 4));
            if (userExists) {
                // console.log("Deu erro no userExists");
                throw new ConflictError("User already exists");
            }

            // Create user
            // const newId = randomUUID();
            const newUserData = {
                name: name,
                email: email,
                password: password,
                lastName: lastName,
                id: randomUUID(),
            };
            console.log("newUserData ", JSON.stringify(newUserData, null, 4));

            const newUser = await this.userRepository.create(newUserData);
            console.log("newUser ", JSON.stringify(newUser, null, 4));
            return {
                ...newUser,
                message: "User created",
                status: 201,
            };
        } catch (e) {
            if (e instanceof BadRequestError) {
                throw new BadRequestError(e.message);
            } else if (e instanceof ConflictError) {
                throw new ConflictError(e.message);
            } else if (e instanceof InternalServerError) {
                throw new InternalServerError("Erro 1 500 no create usecase");
            } else {
                throw new InternalServerError(
                    "Erro generico no create usecase",
                );
            }
        }
    }
}

export { CreateUserUseCase };
