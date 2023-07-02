import {
    PrismaClientProvider,
    prismaClient,
} from "@providers/database/prisma/prisma-client.provider";
import { provide } from "inversify-binding-decorators";
import { IRouteRepository } from "./route-repository.interface";
import { IRouteDTO } from "./route.dto";

@provide(RouteRepository)
class RouteRepository implements IRouteRepository {
    constructor(private prismaProvider: PrismaClientProvider) {}

    async find(id: string): Promise<IRouteDTO | null> {
        const route = await prismaClient.route.findUnique({
            where: { id },
        });

        return route || null;
    }

    async findAll(): Promise<IRouteDTO[] | null> {
        const routes = await prismaClient.route.findMany();

        return routes;
    }

    async create(route: IRouteDTO): Promise<IRouteDTO | null> {
        const createdRoute = await prismaClient.route.create({
            data: route,
        });

        return createdRoute || null;
    }

    async update(id: string, route: IRouteDTO): Promise<IRouteDTO | null> {
        const updatedRoute = await prismaClient.route.update({
            where: { id },
            data: route,
        });

        return updatedRoute || null;
    }

    async delete(id: string): Promise<boolean> {
        await prismaClient.route.delete({ where: { id } });
        return true;
    }
}

export { RouteRepository };
