export interface IRooms {
    id?: string | number | undefined,
    room_photo?: string,
    room_type: string,
    room_number: string,
    amenities: string[],
    price: string,
    offer_price: boolean,
    discount: number,
    status: string
    description: string,
    image?: string
}