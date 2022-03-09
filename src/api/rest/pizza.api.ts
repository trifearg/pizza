import axios from 'axios'
import { PizzaModel, defaultPizza } from '../models/pizza.model'

class PizzaApi {
    static async getPizza(): Promise<PizzaModel[]> {
        let response = await axios.get('http://localhost:3000/data/pizza.json');
        if (!response.data) {
            response = await axios.put('http://localhost:3000/data/pizza.json', defaultPizza);
        }

        return response.data;
    }
}

export default PizzaApi;