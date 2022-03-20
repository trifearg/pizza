import { PizzaModel, defaultPizza } from '../models/pizza.model'

class PizzaApi {
    static async getPizza(): Promise<PizzaModel[]> {
        let response = await Promise.resolve(defaultPizza);
        return response;
    }
}

export default PizzaApi;