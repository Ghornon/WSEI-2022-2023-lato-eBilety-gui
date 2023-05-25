import { useState, useEffect } from "react";
import { getMovies } from "../../../services/Api";
import { NavLink } from "react-router-dom";

const MovieList = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<any[]>([]);
    const onSuccess = ({ data }: { data: any }) => {
        setMovies(data);
        console.log(data);
    };

    const onError = ({ data }: { data: any }) => {
        console.log("Login error:", data);
    };

    useEffect(() => {
        if (!isLoading) {
            getMovies(onSuccess, onError);
            setLoading(true);
        }
    }, [movies, isLoading]);

    return (
        <div className="container">
            <header className="container__header">
                <NavLink className="button success" to={"/Movies/New"}>
                    Dodaj
                </NavLink>
            </header>
            <div className="container__list">
                {isLoading &&
                    movies.map((movie) => (
                        <div key={movie?.id} className="list__item">
                            <div className="item__image">
                                <figure
                                    className="image"
                                    style={{ backgroundImage: `url("${movie?.imageURL}")` }}
                                ></figure>
                            </div>
                            <div className="item__container">
                                <h4 className="item__tittle">{movie?.name}</h4>
                                <div className="iteam__buttons">
                                    <NavLink className="button" to={`/Movies/Get/${movie?.id}`}>
                                        info
                                    </NavLink>
                                    <NavLink className="button" to={`/Movies/Edit/${movie?.id}`}>
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

export default MovieList;
