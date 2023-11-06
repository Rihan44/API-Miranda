export interface IContact {
    id?: string | number | undefined,
    name: string,
    email: string,
    phone: string,
    email_subject: string,
    email_description: string,
    date: Date, 
    date_time: Date,
    is_archived: boolean
}
