import { useState, useEffect } from "react";
import { getActors } from "../../../services/Api";
import { NavLink } from "react-router-dom";

const ActorList = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [actors, setActors] = useState<any[]>([]);
    const onSuccess = ({ data }: { data: any }) => {
        setActors(data);
        console.log(data);
    };

    const onError = ({ data }: { data: any }) => {
        console.log("Login error:", data);
    };

    useEffect(() => {
        if (!isLoading) {
            getActors(onSuccess, onError);
            setLoading(true);
        }
    }, [actors, isLoading]);

    return (
        <div className="container">
            <header className="container__header">
                <NavLink className="button success" to={"/Actors/New"}>
                    Dodaj
                </NavLink>
            </header>
            <div className="container__list">
                {isLoading &&
                    actors.map((actor) => (
                        <div key={actor.id} className="list__item">
                            <div className="item__image">
                                <figure
                                    className="image"
                                    style={{ backgroundImage: `url("${actor.profilePictureURL}")` }}
                                ></figure>
                            </div>
                            <div className="item__container">
                                <h4 className="item__tittle">{actor.fullName}</h4>
                                <div className="iteam__buttons">
                                    {/* <button className="button">{actor.price} zł</button> */}
                                    <NavLink className="button" to={`/Actors/${actor.id}`}>
                                        info
                                    </NavLink>
                                    <NavLink className="button" to={"/Actors/Edit"}>
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

export default ActorList;
