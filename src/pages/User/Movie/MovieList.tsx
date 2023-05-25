import { useState, useEffect } from "react";
import { getMovies } from "../../../services/Api";
import { NavLink, useNavigate } from "react-router-dom";
import useCartState from "../../../hooks/CartContex";

const MovieList = () => {
    const globalCart = useCartState();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<any[]>([]);
    const onSuccess = ({ data }: { data: any }) => {
        setMovies(data);
        console.log(data);
    };
    let navigate = useNavigate();

    const onError = ({ data }: { data: any }) => {
        console.log("Login error:", data);
    };
    const addToCart = (data: any) => {
        console.log(data);
        globalCart.setMyCart(data);
        navigate("/Cart");
    };
    useEffect(() => {
        if (!isLoading) {
            getMovies(onSuccess, onError);
            setLoading(true);
        }
    }, [movies, isLoading]);

    return (
        <div className="list">
            {isLoading &&
                movies.map((movie) => (
                    <div key={movie.id} className="list__item">
                        <div className="item__image">
                            <figure className="image" style={{ backgroundImage: `url("${movie.imageURL}")` }}></figure>
                        </div>
                        <div className="item__container">
                            <h4 className="item__tittle">{movie.name}</h4>
                            <div className="iteam__buttons">
                                <button
                                    className="button"
                                    onClick={() => {
                                        addToCart(movie);
                                    }}
                                >
                                    {movie.price} zł
                                </button>
                                <NavLink className="button" to={`/Movies/${movie.id}`}>
                                    info
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default MovieList;
