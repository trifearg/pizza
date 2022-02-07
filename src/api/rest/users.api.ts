import { http } from '../http';
import { UserModel, defaultUsers } from '../models';

export class UsersApi {
    static async getOrCreateUsers(): Promise<UserModel[]> {
        let response = await http.get('/users.json');
        if (!response.data) {
            response = await http.put('/users.json', defaultUsers);
        }

        return response.data;
    }

    

    static async updateUsers(data: UserModel[]): Promise<UserModel[]> {
        const response = await http.put(`/users.json`, data);

        return response.data;
    }
}
