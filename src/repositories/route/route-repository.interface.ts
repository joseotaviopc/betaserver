import { IRouteDTO } from "./route.dto";

interface IRouteRepository {
    find(id: string): Promise<IRouteDTO | null>;
    findAll(): Promise<IRouteDTO[] | null>;
    create(route: IRouteDTO): Promise<IRouteDTO | null>;
    update(id: string, route: IRouteDTO): Promise<IRouteDTO | null>;
    delete(id: string): Promise<boolean>;
}

export { IRouteRepository };
