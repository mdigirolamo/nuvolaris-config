import type UserRole from '../../enums/user-roles';

export default interface UserProfile {
    role: keyof typeof UserRole,
    name: string,
    surname: string,
    address: string,
    phone: string,
    email: string,
    password: string,
    confirmPassword?: string,
    namespace: string
}