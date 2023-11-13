export interface IRooms {
    id?: string | number | undefined,
    room_photo?: string,
    room_type: string,
    room_number: number,
    amenities: string[],
    price: number,
    discount: number,
    status: string
    description: string,
    image?: string
}