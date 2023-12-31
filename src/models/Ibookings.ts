export interface IBookings {
    id?: string | number | undefined,
    guest: string,
    phone_number: string,
    order_date: Date | string,
    check_in: Date | string,
    check_out: Date | string,
    special_request: string,
    room_type: string, 
    room_number: number | string,
    status: string, 
    price: number | string
}
