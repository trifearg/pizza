import { UserRole } from "../enums";

export interface UserModel {
    id: number;
    login: string;
    password: string;
    name: string;
    role: UserRole;
} 

export const defaultUsers: UserModel[] = [
    {   
        id: 1,
        login: "pasha",
        password: "qwerty",
        role: 0,
        name: ""
    },
    {   
        id: 2,
        login: "masha",
        password: "1111",
        role: 1,
        name: "Masha"
    },
    {   
        id: 3,
        login: "misha",
        password: "1111qwerty",
        role: 2,
        name: ""
    },
    {   
        id: 4,
        login: "kostya",
        password: "1234",
        role: 0,
        name: ""
    },
    {   
        id: 5,
        login: "anton",
        password: "1234",
        role: 0,
        name: ""
    }
]
