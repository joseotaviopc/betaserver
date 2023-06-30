interface ICreateUserRequestDTO {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

interface ICreateUserResponseDTO {
    id?: string;
    name?: string;
    lastName?: string;
    email?: string;
    message: string;
    status: number;
}

interface ICreateUserErroDTO {
    status: number;
    message: string;
}

export { ICreateUserRequestDTO, ICreateUserResponseDTO, ICreateUserErroDTO };
