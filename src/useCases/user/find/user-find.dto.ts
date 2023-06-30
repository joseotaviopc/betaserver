import { IUserWithoutPassword } from "@repositories/user/user.dto";

interface IUserFindRequestDTO {
    email: string;
}

interface IUserFindResponseDTO {
    user: IUserWithoutPassword;
    message?: string;
}

export { IUserFindRequestDTO, IUserFindResponseDTO };
