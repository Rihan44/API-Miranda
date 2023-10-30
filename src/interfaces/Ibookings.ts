export interface IBookings {
    id?: string | number,
    guest: string,
    phone_number: string,
    order_date: string,
    check_in:string,
    check_out:string,
    special_request: string,
    roomID?: string,
    room_type: string, 
    room_number: number,
    status: string, 
    price: number,
}
