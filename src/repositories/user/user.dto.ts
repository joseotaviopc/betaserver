interface IUserDTO {
    id?: string;
    password: string;
    email: string;
    name: string;
    lastName: string;
    photo?: string;
    city?: string;
    state?: string;
    height?: string;
    gender?: string;
    // skills?: string[];
}

interface ICreateUser {
    password: string;
    email: string;
    name: string;
    lastName: string;
}

type IUserWithoutPassword = Omit<IUserDTO, "password">;

interface IUserError {
    message: string;
    error: any;
}

export { IUserDTO, ICreateUser, IUserWithoutPassword, IUserError };
