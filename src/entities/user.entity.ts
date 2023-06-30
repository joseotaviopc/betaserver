import { provide } from "inversify-binding-decorators";
import { randomUUID } from "node:crypto";

@provide(User)
class User {
    private _id: string;
    private _password: string;
    public name: string;
    public email: string;
    public lastName: string;
    public photo: string;
    public city: string;
    public state: string;
    public height: string;
    public gender: string;
    // public skills: string[];

    constructor(
        name: string,
        email: string,
        password: string,
        lastName: string,
        id: string,
        photo?: string,
        city?: string,
        state?: string,
        height?: string,
        gender?: string,
        skills?: string[],
    ) {
        this._id = id ?? randomUUID();
        this._password = password;
        this.name = name;
        this.email = email;
        this.lastName = lastName;
        this.photo = photo || "";
        this.city = city || "";
        this.state = state || "";
        this.height = height || "";
        this.gender = gender || "";
        // this.skills = skills || [];
    }

    get id(): string {
        return this._id;
    }

    get password(): string {
        return this._password;
    }
}

export { User };
