interface ISpotDTO {
    id?: string;
    name: string;
    state: string;
    city: string;
    neiborhood: string;
    street: string;
    coordinates: string[];
    conditions: string;
    photo?: string;
}

interface ICreateSpot {
    password: string;
    email: string;
    name: string;
}

interface ISpotError {
    message: string;
    error: any;
}

export { ISpotDTO, ICreateSpot, ISpotError };
