import { useState, useEffect } from "react";
import { getOrders } from "../../../services/Api";

interface Data {
    id: number;
    orderItems: Array<{
        amount: number;
        id: number;
        movie: object;
        movieId: number;
        order: any;
        orderId: number;
        price: number;
    }>;
    userId: string;
}

const OrderList = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [orders, setOrders] = useState<Data[]>([]);
    const onSuccess = ({ data }: { data: any }) => {
        setOrders(data);
        console.log(data);
    };

    const onError = ({ data }: { data: any }) => {
        console.log(data);
    };

    useEffect(() => {
        if (!isLoading) {
            getOrders(onSuccess, onError);
            setLoading(true);
        }
    }, [orders, isLoading]);
    return (
        <div className="container">
            <div className="container__listStack">
                {isLoading &&
                    orders.map((order) => (
                        <div key={order.id} className="listStack__item">
                            <div className="item__tittle">ID: {order.userId}</div>
                            <ul className="item__list">
                                {order.orderItems.map((orderItem) => (
                                    <li key={orderItem.id} className="list__orderItem">
                                        <div className="orderItem__name">{orderItem.movie?.name}</div>
                                        <div className="orderItem__amount">Ilość: {orderItem.amount}</div>
                                        <div className="orderItem__price">{orderItem.price} zł</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default OrderList;
