import { UserRole } from "../types/user.type";

export const  userRole : UserRole = {
    Admin : 'admin',
    User : 'user',
    Guest : 'guest',
}

export const SALT_ROUNDS = 10