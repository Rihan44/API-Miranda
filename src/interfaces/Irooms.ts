export interface IRooms {
    id?: string | number,
    room_photo?: string,
    room_type: string,
    room_number: number | string,
    amenities: string[],
    price: number | string,
    offer_price: boolean,
    discount: number,
    status: string
    description: string,
    image?: string
}