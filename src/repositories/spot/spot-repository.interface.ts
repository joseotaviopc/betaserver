import { ISpotDTO } from "./spot.dto";

interface ISpotRepository {
    find(id: string): Promise<ISpotDTO | null>;
    findAll(): Promise<ISpotDTO[] | null>;
    create(spot: ISpotDTO): Promise<ISpotDTO | null>;
    update(id: string, spot: ISpotDTO): Promise<ISpotDTO | null>;
    delete(id: string): Promise<boolean>;
}

export { ISpotRepository };
