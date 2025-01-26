export interface AlphaBankRegisterResponse {
    formUrl: string;
    orderId: string;
    errorCode?: string;
    errorMessage?: string;
}

export interface IOrderStatus {
    OrderStatus?: number
}