export interface User {
    id: string;
    login: string;
    password_changed_at: string;
    hashed_password: string;
    created_at: string;
}

export interface UserPayload {
    id: string;
}