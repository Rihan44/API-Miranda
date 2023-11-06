export interface IBookings {
    id?: string | number,
    guest: string,
    phone_number: string,
    order_date: Date,
    check_in:Date,
    check_out:Date,
    special_request: string,
    room_type: string, 
    room_number: number,
    status: string, 
    price: number,
    room_id?: number,
}
