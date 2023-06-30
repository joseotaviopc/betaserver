import { IUserDTO, IUserWithoutPassword } from "./user.dto";

interface IUserRepository {
    find(id: string): Promise<IUserWithoutPassword | null>;
    findByEmail(email: string): Promise<IUserWithoutPassword | null>;
    findAll(): Promise<IUserWithoutPassword[] | null>;
    create(user: IUserDTO): Promise<IUserDTO | null>;
    update(id: string, user: IUserDTO): Promise<IUserWithoutPassword | null>;
    delete(id: string): Promise<boolean>;
}

export { IUserRepository };
