interface IRouteDTO {
    id?: string;
    name: string;
    description: string;
    betas: string[];
    photos: string[];
    videos: string[];
}

interface ICreateRoute {
    password: string;
    email: string;
    name: string;
}

interface IRouteError {
    message: string;
    error: any;
}

export { IRouteDTO, ICreateRoute, IRouteError };
