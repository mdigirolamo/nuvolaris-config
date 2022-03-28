import type APIStatusCode from "../enums/api-status-code";

export default interface ApiResponse<T> {
    data: T,
    error: string,
    status: APIStatusCode 
}