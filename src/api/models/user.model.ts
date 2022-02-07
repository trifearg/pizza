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
        login: 'manager',
        password: '1234',
        role: UserRole.Manager,
        name: '',
    },
    {   
        id: 2,
        login: 'developer1',
        password: '1111',
        role: UserRole.Developer,
        name: 'Mike',
    },
    {   
        id: 3,
        login: 'tester',
        password: 'tst123',
        role: UserRole.Tester,
        name: '',
    },
    {   
        id: 4,
        login: 'manager1',
        password: '1234',
        role: UserRole.Manager,
        name: '',
    },
    {   
        id: 5,
        login: 'manager2',
        password: '1234',
        role: UserRole.Manager,
        name: '',
    },
];
