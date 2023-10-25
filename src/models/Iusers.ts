export interface IUsers {
    id?: string | number,
    name: string,
    email: string,
    photo?: string,
    employee_position: string,
    phone_number: string | number,
    hire_date: Date | string,
    job_description: string,
    status: boolean,
    password_hash: string
}
