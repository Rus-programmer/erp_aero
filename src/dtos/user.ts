import {User} from "../types/user";

export class UserDTO {
    id;
    login;
    passwordChangedAt;
    createdAt;

    constructor(data: User) {
        this.id = data.id;
        this.login = data.login;
        this.passwordChangedAt = data.password_changed_at;
        this.createdAt = data.created_at;
    }
}

