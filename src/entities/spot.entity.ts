import { provide } from "inversify-binding-decorators";
import { randomUUID } from "node:crypto";

@provide(Spot)
class Spot {
    private _id: string;
    public name: string;
    public state: string;
    public city: string;
    public neiborhood: string;
    public street: string;
    public coordinates: object;
    public conditions: string;
    public photos?: string[];
    public videos?: string[];

    constructor(
        id: string,
        name: string,
        state: string,
        city: string,
        neiborhood: string,
        street: string,
        coordinates: object,
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
        this.conditions = conditions;
        this.photos = photos || [];
        this.videos = videos || [];
    }

    get id(): string {
        return this._id;
    }
}

export { Spot };
