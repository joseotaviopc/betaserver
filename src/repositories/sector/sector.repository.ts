import {
    PrismaClientProvider,
    prismaClient,
} from "@providers/database/prisma/prisma-client.provider";
import { provide } from "inversify-binding-decorators";
import { ISectorRepository } from "./sector-repository.interface";
import { ISectorDTO } from "./sector.dto";

@provide(SectorRepository)
class SectorRepository implements ISectorRepository {
    constructor(private prismaProvider: PrismaClientProvider) {}

    async find(id: string): Promise<ISectorDTO | null> {
        const sector = await prismaClient.sector.findUnique({
            where: { id },
        });

        return sector || null;
    }

    async findAll(): Promise<ISectorDTO[] | null> {
        const sectors = await prismaClient.sector.findMany();

        return sectors;
    }

    async create(sector: ISectorDTO): Promise<ISectorDTO | null> {
        const createdSector = await prismaClient.sector.create({
            data: sector,
        });

        return createdSector || null;
    }

    async update(id: string, sector: ISectorDTO): Promise<ISectorDTO | null> {
        const updatedSector = await prismaClient.sector.update({
            where: { id },
            data: sector,
        });

        return updatedSector || null;
    }

    async delete(id: string): Promise<boolean> {
        await prismaClient.sector.delete({ where: { id } });
        return true;
    }
}

export { SectorRepository };
