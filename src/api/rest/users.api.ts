import axios from 'axios';
import { UserModel, defaultUsers } from '../models';

export class UsersApi {
    static async getOrCreateUsers(): Promise<UserModel[]> {
        let response = await axios.get('http://localhost:3000/data/users.json');
        if (!response.data) {
            response = await axios.put('http://localhost:3000/data/users.json', defaultUsers);
        }

        return response.data;
    }    

    static async updateUsers(data: UserModel[]): Promise<UserModel[]> {
        const response = await axios.put(`http://localhost:3000/data/users.json`, data);

        return response.data;
    }
}
