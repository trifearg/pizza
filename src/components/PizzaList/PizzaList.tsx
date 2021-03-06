import { FunctionComponent } from 'react';
import PizzaCard from '../PizzaCard/PizzaCard';
import { PizzaModel } from '../../api/models';

interface IProps {
    pizza: PizzaModel[];
    modalOpen: () => void;
    setBodyPopup: (body: string) => void;
    setProductToPopup: (product: PizzaModel) => void;
}

const PizzaList: FunctionComponent<IProps> = ({ pizza, modalOpen, setBodyPopup, setProductToPopup }) => {
    return (
        <>
            {pizza.map((item) => (
                <PizzaCard
                    key={item.id}
                    {...item}
                    modalOpen={modalOpen}
                    setBodyPopup={setBodyPopup}
                    setProductToPopup={setProductToPopup}
                />
            ))}
        </>
    );
};

export default PizzaList;
