import { provide } from "inversify-binding-decorators";
import { randomUUID } from "node:crypto";

@provide(Sector)
class Sector {
    private _id: string;
    public name: string;
    public state: string;
    public city: string;
    public neiborhood: string;
    public street: string;
    public coordinates: string;
    public conditions: string;
    public description: string;
    public photos?: string[];
    public videos?: string[];

    constructor(
        id: string,
        name: string,
        state: string,
        city: string,
        neiborhood: string,
        street: string,
        coordinates: string,
        description: string,
        conditions: string,
        photos?: string[],
        videos?: string[],
    ) {
        this._id = id ?? randomUUID();
        this.name = name;
        this.city = city;
        this.state = state;
        this.neiborhood = neiborhood;
        this.street = street;
        this.coordinates = coordinates;
        this.description = description;
        this.conditions = conditions;
        this.photos = photos || [];
        this.videos = videos || [];
    }

    get id(): string {
        return this._id;
    }
}

export { Sector };
