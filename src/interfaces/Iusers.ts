export interface IUsers {
    id?: string | number | undefined,
    name: string,
    email: string,
    photo?: string,
    employee_position: string,
    phone_number: string,
    hire_date: Date,
    job_description: string,
    status: boolean,
    password_hash: string
}
