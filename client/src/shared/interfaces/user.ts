import type { string } from "yup";

export default interface User {

    id: string;
    token: string;
    role: string;
    email: string;

}