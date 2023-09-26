

export interface IResponse {
    _id: string;
    message: string;
    success: boolean;
    data?: {
        [key: string]: any;
    };
}