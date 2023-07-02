import {
    PrismaClientProvider,
    prismaClient,
} from "@providers/database/prisma/prisma-client.provider";
import { provide } from "inversify-binding-decorators";
import { ISpotRepository } from "./spot-repository.interface";
import { ISpotDTO } from "./spot.dto";

@provide(SpotRepository)
class SpotRepository implements ISpotRepository {
    constructor(private prismaProvider: PrismaClientProvider) {}

    async find(id: string): Promise<ISpotDTO | null> {
        const spot = await prismaClient.spot.findUnique({
            where: { id },
        });

        return spot || null;
    }

    async findAll(): Promise<ISpotDTO[] | null> {
        const spots = await prismaClient.spot.findMany();

        return spots;
    }

    async create(spot: ISpotDTO): Promise<ISpotDTO | null> {
        const createdSpot = await prismaClient.spot.create({
            data: spot,
        });

        return createdSpot || null;
    }

    async update(id: string, spot: ISpotDTO): Promise<ISpotDTO | null> {
        const updatedSpot = await prismaClient.spot.update({
            where: { id },
            data: spot,
        });

        return updatedSpot || null;
    }

    async delete(id: string): Promise<boolean> {
        await prismaClient.spot.delete({ where: { id } });
        return true;
    }
}

export { SpotRepository };
