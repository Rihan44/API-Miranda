export interface IContact {
    id?: string | number | undefined,
    name: string,
    email: string,
    phone: string,
    email_subject: string,
    email_description: string,
    date: string, 
    dateTime: string,
    isArchived: boolean
}
