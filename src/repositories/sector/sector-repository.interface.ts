import { ISectorDTO } from "./sector.dto";

interface ISectorRepository {
    find(id: string): Promise<ISectorDTO | null>;
    findAll(): Promise<ISectorDTO[] | null>;
    create(sector: ISectorDTO): Promise<ISectorDTO | null>;
    update(id: string, sector: ISectorDTO): Promise<ISectorDTO | null>;
    delete(id: string): Promise<boolean>;
}

export { ISectorRepository };
