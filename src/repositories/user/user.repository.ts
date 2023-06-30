import { User } from "@entities/user.entity";
import {
    PrismaClientProvider,
    prismaClient,
} from "@providers/database/prisma/prisma-client.provider";
import { provide } from "inversify-binding-decorators";
import { IUserRepository } from "./user-repository.interface";
import { ICreateUser, IUserDTO, IUserWithoutPassword } from "./user.dto";
import bcrypt from "bcrypt";
import { randomUUID } from "node:crypto";

@provide(UserRepository)
class UserRepository implements IUserRepository {
    constructor(private prismaProvider: PrismaClientProvider) {}

    async find(id: string): Promise<IUserWithoutPassword | null> {
        const user = await prismaClient.user.findUnique({
            where: { id },
        });

        return user ? this.mapToDTOWithoutPassword(user) : null;
    }

    async findByEmail(email: string): Promise<IUserWithoutPassword | null> {
        const user = await prismaClient.user.findUnique({
            where: { email },
        });
        return user ? this.mapToDTOWithoutPassword(user) : null;
    }

    async findAll(): Promise<IUserWithoutPassword[] | null> {
        const users = await prismaClient.user.findMany();

        return users.map((user) => this.mapToDTOWithoutPassword(user));
    }

    async create(user: ICreateUser): Promise<User | null> {
        const password = await bcrypt.hash(user.password, 10);
        console.log("password ", password);
        console.log("user ", user);

        const createdUser = await prismaClient.user.create({
            data: this.prismaProvider.mapToPrisma<ICreateUser, User>({
                ...user,
                password: password,
            }),
        });
        console.log("createdUser in repository ", createdUser);

        return this.mapToDTO(createdUser) || null;
    }

    async update(
        id: string,
        user: IUserWithoutPassword,
    ): Promise<IUserWithoutPassword | null> {
        const updatedUser = await prismaClient.user.update({
            where: { id },
            data: user,
        });

        return this.mapToDTOWithoutPassword(updatedUser);
    }

    async delete(id: string): Promise<boolean> {
        await prismaClient.user.delete({ where: { id } });
        return true;
    }

    private mapToDTO(user: IUserDTO): User {
        const newUser = new User(
            user.name,
            user.lastName,
            user.email,
            user.password,
            user.id || randomUUID(),
        );
        return newUser;
    }

    private mapToDTOWithoutPassword(user: IUserDTO): IUserWithoutPassword {
        const {
            id,
            email,
            name,
            lastName,
            city,
            height,
            photo,
            state,
            gender,
            // skills,
        } = user;
        return {
            name,
            email,
            id,
            lastName,
            photo,
            city,
            state,
            height,
            gender,
            // skills,
        };
    }
}

export { UserRepository };
