export interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    role: string; 
    password: string;
}


export interface LoginDto {
    email: string;
    password: string;
}