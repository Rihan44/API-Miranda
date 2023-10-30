export interface IUsers {
    id?: string | number | undefined,
    name: string,
    email: string,
    photo?: string,
    employee_position: string,
    phone_number: string,
    hire_date: string,
    job_description: string,
    status: boolean,
    password_hash: string
}
