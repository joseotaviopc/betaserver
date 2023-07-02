interface ISectorDTO {
    id?: string;
    name: string;
    state: string;
    city: string;
    neiborhood: string;
    street: string;
    coordinates: string[];
    description: string;
    conditions: string;
    photo?: string;
}

interface ICreateSector {
    password: string;
    email: string;
    name: string;
}

interface ISectorError {
    message: string;
    error: any;
}

export { ISectorDTO, ICreateSector, ISectorError };
