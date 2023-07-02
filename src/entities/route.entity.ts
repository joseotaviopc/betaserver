import { provide } from "inversify-binding-decorators";
import { randomUUID } from "node:crypto";

@provide(Route)
class Route {
    private _id: string;
    public name: string;
    public grade: string;
    public description: string;
    public betas?: string[];
    public photos?: string[];
    public videos?: string[];

    constructor(
        id: string,
        name: string,
        grade: string,
        description: string,
        betas?: string[],
        photos?: string[],
        videos?: string[],
    ) {
        this._id = id ?? randomUUID();
        this.name = name;
        this.grade = grade;
        this.description = description;
        this.betas = betas || [];
        this.photos = photos || [];
        this.videos = videos || [];
    }

    get id(): string {
        return this._id;
    }
}

export { Route };
