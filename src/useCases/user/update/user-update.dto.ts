import { IUserWithoutPassword } from "@repositories/user/user.dto";

interface IUserUpdateRequestDTO {
    name?: string;
    email: string;
    lastName?: string;
    city?: string;
    state?: string;
    gender?: string;
    height?: string;
    photo?: string;
}

interface IUserUpdateResponseDTO {
    message: string;
    user: IUserWithoutPassword;
}

export { IUserUpdateRequestDTO, IUserUpdateResponseDTO };
