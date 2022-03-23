import type UserRole from '../enums/user-roles';

export default interface UserProfile {
    role: string,
    name: string,
    surname: string,
    address: string,
    phone: string,
    email: string,
    password: string,
    namespace: string
}