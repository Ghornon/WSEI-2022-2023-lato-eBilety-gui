import { useState, useEffect } from "react";
import { getCinemas } from "../../../services/Api";
import { NavLink } from "react-router-dom";

const CinemaAList = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [cinemas, setCinemas] = useState<any[]>([]);
    const onSuccess = ({ data }: { data: any }) => {
        setCinemas(data);
        console.log(data);
    };

    const onError = ({ data }: { data: any }) => {
        console.log("Login error:", data);
    };

    useEffect(() => {
        if (!isLoading) {
            getCinemas(onSuccess, onError);
            setLoading(true);
        }
    }, [cinemas, isLoading]);
    return (
        <div className="container">
            <header className="container__header">
                <NavLink className="button success" to={"/Cinemas/New"}>
                    Dodaj
                </NavLink>
            </header>
            <div className="container__list">
                {isLoading &&
                    cinemas.map((cinema) => (
                        <div key={cinema.id} className="list__item">
                            <div className="item__image">
                                <figure className="image" style={{ backgroundImage: `url("${cinema.logo}")` }}></figure>
                            </div>
                            <div className="item__container">
                                <h4 className="item__tittle">{cinema.name}</h4>
                                <div className="iteam__buttons">
                                    {/* <button className="button">{cinema.price} zł</button> */}
                                    <NavLink className="button" to={`/Cinemas/Get/${cinema.id}`}>
                                        info
                                    </NavLink>
                                    <NavLink className="button" to={`/Cinemas/Edit/${cinema.id}`}>
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

export default CinemaAList;
