export interface User {
    id: number;
    name: string;
    last_name: string;
    age: number;
    sex: string;
    city: string;
    state: string;
    neighborhood: string;
    type_user: string;
    isDonor: boolean;
    photoUrl: string;
    phone: number;
    email: string;
    password: string;
    isActive: boolean;
    createdDate: Date;
}