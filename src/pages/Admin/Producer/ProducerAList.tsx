import { useState, useEffect } from "react";
import { getProducers } from "../../../services/Api";
import { NavLink } from "react-router-dom";

const ProducerAList = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [producers, setProducers] = useState<any[]>([]);
    const onSuccess = ({ data }: { data: any }) => {
        setProducers(data);
        console.log(data);
    };

    const onError = ({ data }: { data: any }) => {
        console.log(data);
    };

    useEffect(() => {
        if (!isLoading) {
            getProducers(onSuccess, onError);
            setLoading(true);
        }
    }, [producers, isLoading]);
    return (
        <div className="container">
            <header className="container__header">
                <NavLink className="button success" to={"/Producers/New"}>
                    Dodaj
                </NavLink>
            </header>
            <div className="container__list">
                {isLoading &&
                    producers.map((producer) => (
                        <div key={producer.id} className="list__item">
                            <div className="item__image">
                                <figure className="image" style={{ backgroundImage: `url("${producer.avatar}")` }}></figure>
                            </div>
                            <div className="item__container">
                                <h4 className="item__tittle">{producer.fullName}</h4>
                                <div className="iteam__buttons">
                                    {/* <button className="button">{producer.price} zł</button> */}
                                    <NavLink className="button" to={`/Producers/Get/${producer.id}`}>
                                        info
                                    </NavLink>
                                    <NavLink className="button" to={`/Producers/Edit/${producer.id}`}>
                                        Edytuj
                                    </NavLink>
                                    <button className="button danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ProducerAList;
