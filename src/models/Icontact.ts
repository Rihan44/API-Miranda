export interface IContact {
    id?: string | number,
    name: string,
    email: string,
    phone: string | number,
    email_subject: string,
    email_description: string,
    date: Date | string, 
    dateTime: string,
    isArchived: boolean
}
