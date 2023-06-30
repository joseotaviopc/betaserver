class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BadRequestError";
    }
}

class ConflictError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ConflictError";
    }
}

class InternalServerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InternalServerError";
    }
}

class NoContentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NoContentError";
    }
}

class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError";
    }
}

export {
    BadRequestError,
    ConflictError,
    InternalServerError,
    NoContentError,
    NotFoundError,
};
