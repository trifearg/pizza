import { FunctionComponent } from "react";
import PizzaCard from './PizzaCard/PizzaCard'
import { PizzaModel } from "../../api/models";

interface IProps {
    pizza: PizzaModel[]
}

const PizzaList: FunctionComponent<IProps> = ({ pizza }) => {
    return (
        <>
            {
                pizza.map((item) =>
                    <PizzaCard
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        photo={item.photo}
                        description={item.description}
                        price={item.price}
                    />
                )
            }
        </>
    );
}

export default PizzaList;