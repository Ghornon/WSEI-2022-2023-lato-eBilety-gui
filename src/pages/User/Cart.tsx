import React, { useEffect, useState } from "react";
import useCartState from "../../hooks/CartContex";
import { useNavigate } from "react-router-dom";
import { postCompleteOrder, postShoppingCart } from "../../services/Api";
interface DataItem {
    id: number;
    imageURL: string;
    name: string;
    price: number;
    description: string;
    producer: string;
    actorsMovies: [];
}

interface DataCart {
    movieId: number;
    amount: number;
}
const Cart = () => {
    let navigate = useNavigate();
    let useGlobalState = useCartState();
    const [isLoading, setLoading] = useState<boolean>(false);

    const [cart, setCart] = useState<DataCart>({ movieId: 0, amount: 1 });
    const [item, setItem] = useState<DataItem>({
        id: 0,
        imageURL: "",
        name: "",
        price: 0,
        description: "",
        producer: "",
        actorsMovies: [],
    });

    const onSuccess = ({ data }: { data: any }) => {
        console.log(data);
        postCompleteOrder(onSuccessOrder, onError);
    };

    const onSuccessOrder = ({ data }: { data: any }) => {
        console.log(data);
        navigate("/");
    };

    const onError = ({ data }: { data: any }) => {
        console.log(data);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(cart);
        const { movieId, amount } = cart;
        postShoppingCart(movieId, amount, onSuccess, onError);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCart((prevValues) => ({
            ...prevValues,
            [name]: Number(value),
        }));
    };
    useEffect(() => {
        console.log(useGlobalState);
        const data = useGlobalState.myCart;
        if (data === null) {
            navigate("/Movies");
        }
        if (!isLoading) {
            setItem(data);
            setLoading(true);
            setCart({
                movieId: data.id,
                amount: 1,
            });
        }
    }, [useGlobalState, isLoading]);

    useEffect(() => {
        console.log(cart);
    }, [cart]);
    return (
        <div className="cart">
            {isLoading ? (
                <div className="cart__container">
                    <div className="container__order">
                        <div className="order__image">
                            <figure className="image" style={{ backgroundImage: `url("${item.imageURL}")` }}></figure>
                        </div>
                        <div className="order__title">
                            <h2>{item.name}</h2>
                        </div>
                        <div className="order__prices">{item.price} zł</div>
                        <div className="order__ammount">
                            <input
                                min={1}
                                max={10}
                                type="number"
                                id="amount"
                                name="amount"
                                onChange={handleChange}
                                value={cart.amount}
                            />
                        </div>
                    </div>
                    <div className="container__containerButtons">
                        <button className="buttons__button" onClick={handleSubmit}>
                            Potwierdzam
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Cart;
